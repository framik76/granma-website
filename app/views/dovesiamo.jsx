import {Paper} from "material-ui";
import React, {Component} from "react";


export default class Dovesiamo extends Component {

    render () {
        return (
            <div style={{margin: "30px"}}>
                <Paper style={{margin: "30px", padding: "30px"}}>
                    <h2>{"Dove siamo"}</h2>
                    <p>{"Siamo a Piazzatorre (BG), in via dei tigli 16"}</p>
                    <div>
                        <iframe
                            frameborder="0"
                            height="350" 
                            marginheight="0"
                            marginwidth="0"
                            scrolling="no"
                            src="http://maps.google.it/maps?f=q&amp;source=s_q&amp;hl=it&amp;geocode=&amp;q=piazzatorre,+via+dei+tigli+16&amp;aq=&amp;sll=41.442726,12.392578&amp;sspn=20.492251,22.5&amp;vpsrc=0&amp;ie=UTF8&amp;hq=&amp;hnear=Viale+dei+Tigli,+16,+24010+Piazzatorre+Bergamo,+Lombardia&amp;z=14&amp;ll=45.992441,9.691175&amp;output=embed"
                            width="425"
                        ></iframe>
                    </div>
                </Paper>
            </div>

        );
    }

}
