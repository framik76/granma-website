import {promisify} from "bluebird";
import browserSync from "browser-sync";
import {execSync} from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import mkdirp from "mkdirp";
import path from "path";
import proGulp from "pro-gulp";
import {assoc, filter, fromPairs, map, pipe, toPairs} from "ramda";
import webpack from "webpack";

dotenv.load();

const gp = gulpLoadPlugins();



/*
*   Utils
*/

function getClientProcessEnv () {
    return pipe(
        toPairs,
        filter(([key]) => /^__CONFIG__/.test(key)),
        map(([key, value]) => [
            `process.env.${key.slice("__CONFIG__".length)}`,
            JSON.stringify(value)
        ]),
        fromPairs,
        assoc("process.env.NODE_ENV", JSON.stringify(NODE_ENV))
    )(process.env);
}



/*
*   Constants
*/

const {
    NODE_ENV = "development",
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_ACCESS_KEY,
    AZURE_STORAGE_CONTAINER_NAME,
    AZURE_STORAGE_FOLDER
} = process.env;
const GIT_BRANCH = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
const deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
const baseDir = `builds/${NODE_ENV}`;



/*
*   Builders
*/

proGulp.task("buildMainHtml", function () {
    return gulp.src("./app/main.html")
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest(`${baseDir}/`));
});

proGulp.task("buildAppScripts", (function () {
    mkdirp.sync(`${baseDir}/_assets/js`);
    var compiler = webpack({
        entry: {
            app: "./app/main.jsx",
            vendor: deps.js
        },
        devtool: "source-map",
        output: {
            filename: `${baseDir}/_assets/js/app.js`
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel"
                },
                {
                    test: /\.json$/,
                    loader: "json"
                }
            ]
        },
        resolve: {
            root: path.join(__dirname, "app/"),
            extensions: ["", ".js", ".jsx"]
        },
        plugins: [
            new webpack.DefinePlugin(getClientProcessEnv()),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.CommonsChunkPlugin(
                "vendor",
                `${baseDir}/_assets/js/vendor.js`
            )
        ]
    });
    return promisify(compiler.run, compiler);
})());

proGulp.task("buildAppAssets", function () {
    return gulp.src("app/assets/**/*")
        .pipe(gulp.dest(`${baseDir}/_assets/`));
});

proGulp.task("buildAppVersion", function () {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    mkdirp(baseDir);
    fs.writeFileSync(`${baseDir}/VERSION`, pkg.version);
});

proGulp.task("buildVendorStyles", function () {
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gulp.dest(`${baseDir}/_assets/css/`));
});

proGulp.task("buildVendorFonts", function () {
    return gulp.src(deps.fonts)
        .pipe(gulp.dest(`${baseDir}/_assets/fonts/`));
});

proGulp.task("build", proGulp.parallel([
    "buildMainHtml",
    "buildAppScripts",
    "buildAppAssets",
    "buildAppVersion",
    "buildVendorStyles",
    "buildVendorFonts"
]));

gulp.task("build", proGulp.task("build"));



/*
*   Linter
*/

gulp.task("lint", function () {
    return gulp.src(["app/**/*.js", "app/**/*.jsx", "!app/assets/**/*"])
        .pipe(gp.eslint())
        .pipe(gp.eslint.format())
        .pipe(gp.eslint.failAfterError());
});



/*
*   Testers
*/

proGulp.task("test", function () {
    return gulp.src("./test/unit/**/*.js")
        .pipe(gp.spawnMocha({
            compilers: "jsx:babel/register",
            env: {
                NODE_PATH: "app:test"
            }
        }))
        .on("error", function () {
            // Swallow errors
            this.emit("end");
        });
});

gulp.task("test", proGulp.task("test"));



/*
*   Tasks to deploy
*/

proGulp.task("deploy", proGulp.task("build"), function () {
    if (!AZURE_STORAGE_ACCOUNT) {
        throw new Error("Missing configuration key AZURE_STORAGE_ACCOUNT");
    }
    if (!AZURE_STORAGE_ACCESS_KEY) {
        throw new Error("Missing configuration key AZURE_STORAGE_ACCESS_KEY");
    }
    if (!AZURE_STORAGE_CONTAINER_NAME) {
        throw new Error("Missing configuration key AZURE_STORAGE_CONTAINER_NAME");
    }
    if (!AZURE_STORAGE_FOLDER) {
        throw new Error("Missing configuration key AZURE_STORAGE_FOLDER");
    }
    return gulp.src(`${baseDir}/**/*`, {base: `${baseDir}/`})
        .pipe(gp.deployAzureCdn({
            containerName: AZURE_STORAGE_CONTAINER_NAME,
            containerOptions: {
                publicAccessLevel: "blob"
            },
            folder: `${AZURE_STORAGE_FOLDER}/${GIT_BRANCH}`,
            zip: true,
            deleteExistingBlobs: true
        }));
});

gulp.task("deploy", proGulp.task("deploy"));



/*
*   Tasks to setup the development environment
*/

proGulp.task("setupDevServer", function () {
    browserSync({
        server: {
            baseDir: `${baseDir}/`
        },
        files: "./builds/**/*",
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false,
        open: false,
        reloadDebounce: 1000
    });
});

proGulp.task("setupWatchers", function () {
    gulp.watch(
        "app/main.html",
        proGulp.task("buildMainHtml")
    );
    gulp.watch(
        ["app/**/*.jsx", "app/**/*.js"],
        proGulp.parallel(["buildAppScripts", "test"])
    );
    gulp.watch(
        "app/assets/**/*",
        proGulp.task("buildAppAssets")
    );
    gulp.watch(
        ["test/unit/**/*.jsx", "test/unit/**/*.js"],
        proGulp.task("test")
    );
});

gulp.task("dev", proGulp.sequence([
    "build",
    "test",
    "setupDevServer",
    "setupWatchers"
]));



/*
*   Default task, used for command line documentation
*/

gulp.task("default", function () {
    gp.util.log("");
    gp.util.log("Usage: " + gp.util.colors.blue("gulp [TASK]"));
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log("  " + gp.util.colors.green("deploy") + "                       deploy the application to an azure blob store");
    gp.util.log("  " + gp.util.colors.green("dev") + "                          set up dev environment with auto-recompiling");
    gp.util.log("  " + gp.util.colors.green("lint") + "                         lints application source code");
    gp.util.log("  " + gp.util.colors.green("test") + "                         runs tests");
    gp.util.log("");
    gp.util.log("Environment variables for configuration:");
    gp.util.log("  " + gp.util.colors.cyan("__CONFIG__*"));
    gp.util.log("  " + gp.util.colors.cyan("NODE_ENV") + "                     (defaults to `development`)");
    gp.util.log("  " + gp.util.colors.cyan("AZURE_STORAGE_ACCOUNT"));
    gp.util.log("  " + gp.util.colors.cyan("AZURE_STORAGE_ACCESS_KEY"));
    gp.util.log("  " + gp.util.colors.cyan("AZURE_STORAGE_CONTAINER_NAME"));
    gp.util.log("  " + gp.util.colors.cyan("AZURE_STORAGE_FOLDER"));
    gp.util.log("");
});
