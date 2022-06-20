import React, { Component} from "react";
import PresentationImage from "./assets/PresentationPage.png"

export class PresentationPage extends Component {
    render() {
        return(
            <div 
            className="presentation-page"
            style={{maxWidth : '100%', maxHeight:'100%'}}>
                <img src={PresentationImage}
                style={{maxWidth : '100%', maxHeight:'100%'}}/>
            </div>
        )   
    }
}