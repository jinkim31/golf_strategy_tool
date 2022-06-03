import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'

export default function TopicView(){

    const ros = useRef(new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    }))

    const [topics, setTopics] = useState({topics:[], types:[]})

    useEffect(()=>{
        getTopics()
    }, [])

    function getTopics(){
        ros.current.getTopics(topics => setTopics(topics))
    }

    return(
        <div>
            <b>Topic view</b>
            <button onClick={getTopics}>refresh</button>
            {topics.topics.map((topic, i) => <li key={i}>{topics.types[i]}{topic}</li>)}
        </div>
)
}