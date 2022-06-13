import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {publishPoint, publishString} from "../../rosNode";
import './imageView.scss'

const mapNames:string[] = ['sejong', 'hwangak', 'yeogang']

export default function DebugView(){
    const imgElement = useRef<HTMLImageElement>()

    useEffect(()=>{
    }, [])

    const [selectedMap, setSelectedMap] = useState('')

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
        <div className={'debug-view'}>
            <h2>Map </h2>
            <select onChange={(e)=>{
                setSelectedMap(e.target.value)
                publishString('/golf_map_name',e.target.value)
            }} value={selectedMap}
            >
                {mapNames.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                ))}
            </select>

            <div><img ref={imgElement} src={useSelector((state: RootState) => state.ros.image)} onClick={(e)=>{onImgClick(e)}}/></div>
        </div>
    )
}