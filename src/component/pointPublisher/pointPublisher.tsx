import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'

export default function PointPublisher(){

    const ros = useRef(new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    }))

    const [msg, setMsg] = useState({
        x : 0.0,
        y : 0.0,
        z : 0.0
    })

    useEffect(()=>{
        console.log('refreshing')

        ros.current.on('connection', function() {
            console.log('Connected to websocket server.');
        });

        ros.current.on('error', function(error:any) {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.current.on('close', function() {
            console.log('Connection to websocket server closed.');
        });

        // Publishing a Topic
        // ------------------
    }, [])

    function publishTwist(){
        var cmdVel = new ROSLIB.Topic({
            ros : ros.current,
            name : '/golf_point',
            messageType : 'geometry_msgs/Point'
        });

        var twist = new ROSLIB.Message(msg);
        cmdVel.publish(twist);
    }
    return(
        <div>
            <b>RosView</b>
        <br/>
        Linear<br/>
        X <input value={msg.x} onChange={(e)=> {
        setMsg(prevState => {return {...prevState, x: +e.target.value}})
        }}/>
        Y <input value={msg.y} onChange={(e)=> {
        setMsg(prevState => {return {...prevState, y: +e.target.value}})
        }}/>
        Z <input value={msg.z} onChange={(e)=> {
            setMsg(prevState => {return {...prevState, z: +e.target.value}})
        }}/>

    <button onClick={publishTwist}>Publish</button>
        </div>
)
}