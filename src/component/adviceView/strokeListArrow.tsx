import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotate, faRulerVertical, faCrosshairs, faAngleDown} from "@fortawesome/free-solid-svg-icons";

export default function StrokeListArrow(){
    return(
        <div className={'stroke-list-arrow'}>
            <FontAwesomeIcon className={'icon'} icon={faAngleDown} />
        </div>
    )
}