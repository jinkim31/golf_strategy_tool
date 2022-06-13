import React from "react";
import './adviceView.scss'
import StrokeListArrow from "./strokeListArrow";

interface Props {
    clubName:string
    angle:number
    attachArrow:boolean
    highlight:boolean
}

export default function StrokeView(props:Props){

    return(
        <div>
            <div className={'stroke-view'} style={props.highlight ? {background: '#FFE040'} : {}}>
                <label className={'club-label'}>{props.clubName}</label>
                <div> 300m</div>
                <div> {props.angle} </div>
            </div>
            {props.attachArrow ? <StrokeListArrow/> : null}
        </div>
    )
}