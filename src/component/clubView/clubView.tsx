import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'

export default function ClubView(){

    interface GolfAdvice{
        stroke_angles: number[]
        club_indexes: number[]
        club_names: String[]
    }
    const ros = useRef(new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    }))

    const listener = useRef(new ROSLIB.Topic({
        ros : ros.current,
        name : '/golf_advice',
        messageType : 'golf_strategy/GolfAdvice'
    }))

    const [msg, setMsg] = useState({} as GolfAdvice)

    useEffect(()=>{
        listener.current.subscribe(function(message:GolfAdvice) {
            console.log('Received message on ' + listener.current.name + ': ' + message.club_names)
            setMsg(message)
        })
    }, [])

    return(
        <div>
            <b>Club view</b>
            {msg.club_names && msg.club_names.map((club_name, i) => <li key={i}>{club_name} {msg.stroke_angles[i]}</li>)}
        </div>
    )
}