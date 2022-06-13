import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'
import jpeg from 'jpeg-js'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {publishPoint} from "../../rosNode";

export default function ImageView(){
    const imgElement = useRef<HTMLImageElement>()

    useEffect(()=>{
    }, [])

    function onImgClick(e: React.MouseEvent<HTMLImageElement>){
        var x = e.clientX - imgElement.current.getBoundingClientRect().x
        var y = 500-(e.clientY - imgElement.current.getBoundingClientRect().y)
        publishPoint({
            x:x,
            y:y,
            z:0.0}
        )
    }

    return(
        <div>
            <img ref={imgElement} src={useSelector((state: RootState) => state.ros.image)} onClick={(e)=>{onImgClick(e)}}/>
        </div>
    )
}