import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'
import jpeg from "jpeg-js";
import './adviceView.scss'
import StrokeView from "./strokeView";
import StrokeListArrow from "./strokeListArrow";
import {RootState, store} from "../../store/store";
import {useSelector} from "react-redux";
import '../../rosNode'
import {publishPoint} from "../../rosNode";

export default function AdviceView(){

    const imgElement = useRef<HTMLImageElement>()

    function onImgClick(e: React.MouseEvent<HTMLImageElement>){

        const actual_size = Math.min(imgElement.current.getBoundingClientRect().width, imgElement.current.getBoundingClientRect().height)

        var x = e.clientX - imgElement.current.getBoundingClientRect().x - (imgElement.current.getBoundingClientRect().width - actual_size)/2
        var y = imgElement.current.getBoundingClientRect().height-(e.clientY - imgElement.current.getBoundingClientRect().y) - (imgElement.current.getBoundingClientRect().height - actual_size)/2

        const ratio = 500.0 / actual_size

        publishPoint({
            x:x*ratio,
            y:y*ratio,
            z:0.0}
        )
    }

    useEffect(()=>{
    }, [])

    const msg = useSelector((state: RootState) => state.ros.advice)

    return(
        <div className={'advice-view'}>
            <div className={'image-view'}>
                <img className={'image'} ref={imgElement} src={useSelector((state: RootState) => state.ros.image)} onClick={(e)=>{onImgClick(e)}}/>
            </div>
            <div className={'list-view'}>
                {msg.club_names && msg.club_names.map((club_name, i) =>
                    <StrokeView
                        key={i}
                        clubName={club_name}
                        angle={msg.stroke_angles[i]}
                        attachArrow={i!=msg.club_names.length-1}
                        highlight={i==0}
                    />
                )}
            </div>
        </div>
    )
}