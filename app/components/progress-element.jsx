import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {pushState} from "redux-router";

const styles = {
    progress: {
        top: "50px",
        position: "absolute",
        left: "40px",
        color: "#FFF"
    },
    progressPieChart: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255, 0.5)",
        position: "relative"
    },
    ppcProgress: {
        content: "",
        position: "absolute",
        borderRadius: "50%",
        left: "-20px",
        top: "-20px",
        width: "100px",
        height: "100px",
        clip: "rect(0, 50px, 100px, 0)"
    },
    ppcProgressFill: {
        content: "",
        position: "absolute",
        borderRadius: "50%",
        left: "20px",
        top: "20px",
        width: "100px",
        height: "100px",
        clip: "rect(0, 100px, 100px, 50px)",
        background: "#FFF",
        transition: "all 1s ease",
        WebkitTransition: "all 1s ease",
        WebkitTransform: "rotate(270deg)",
        WsTransform: "rotate(270deg)",
        transform: "rotate(270deg)"
    },
    ppcPercents: {
        content: "",
        position: "absolute",
        borderRadius: "50%",
        left: "11px",
        top: "11px",
        width: "80px",
        height: "80px",
        background: "#139588",
        textAlign: "center",
        display: "table"
    },
    ppcPercentsLight: {
        content: "",
        position: "absolute",
        borderRadius: "50%",
        left: "11px",
        top: "11px",
        width: "80px",
        height: "80px",
        background: "#8AC24A",
        textAlign: "center",
        display: "table"
    },
    ppcPercentSpan: {
        display: "block",
        fontSize: "2em",
        fontWeight: "bold",
        color: "#FFF"
    },
    pccPercentsWrapper: {
        display: "table-cell",
        verticalAlign: "middle"
    }

};

function mapDispatchToProps (dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch)
    };
}

@connect(null, mapDispatchToProps)
export default class ProgressElement extends Component {

    static propTypes = {
        color: PropTypes.object.isRequired,
        percent: PropTypes.object.isRequired,
        pushState: PropTypes.func.isRequired
    }

    render () {
        var percent = Math.floor(this.props.percent);
        var styleColor = this.props.color == "green" ? styles.ppcPercents : styles.ppcPercentsLight;

        return (
            <div style={styles.progress}>
                <div style={styles.progressPieChart}>
                    <div style={styles.ppcProgress}>
                        <div ref="progress" style={styles.ppcProgressFill}></div>
                    </div>
                    <div style={styleColor}>
                        <div style={styles.pccPercentsWrapper}>
                            <span style={styles.ppcPercentSpan} >{percent + "%"}</span>
                        </div>
                    </div>
                </div>
            </div>
            );
    }

}
