import * as ROSLIB from "roslib";
import jpeg from "jpeg-js";
import {store} from "./store/store";
import {useDispatch} from "react-redux";
import {adviceCallback, imageCallback} from "./store/rosSlice";
import {useRef, useState} from "react";

console.log('imported rosNode')

interface GolfAdvice{
    stroke_angles: number[]
    club_indexes: number[]
    club_names: string[]
}
const ros =new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})

new ROSLIB.Topic({
    ros : ros,
    name : '/golf_advice',
    messageType : 'golf_strategy/GolfAdvice'
}).subscribe((msg)=>
{
    const payload = {
            // @ts-ignore
            stroke_angles: msg.stroke_angles,
            // @ts-ignore
            club_indexes: msg.club_indexes,
            // @ts-ignore
            club_names: msg.club_names
        }as GolfAdvice
    store.dispatch(adviceCallback(payload))
})

new ROSLIB.Topic({
    ros : ros,
    name : '/golf_img',
    messageType : 'sensor_msgs/Image'
}).subscribe((msg)=>{
    store.dispatch(imageCallback(rgb8ImageToBase64Jpeg(msg)))
})

function publishPoint(point:any){
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/golf_point',
        messageType : 'geometry_msgs/Point'
    });

    var twist = new ROSLIB.Message(point);
    cmdVel.publish(twist);
}

function publishString(topic:string, data:string){
    console.log('name')
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : topic,
        messageType : 'std_msgs/String'
    });

    var msg = new ROSLIB.Message({data:data});
    cmdVel.publish(msg);
}

function rgb8ImageToBase64Jpeg (msg:any) {
    var raw = atob(msg.data)
    var array = new Uint8Array(new ArrayBuffer(raw.length))
    for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i)
    }

    var frameData = Buffer.alloc(msg.width * msg.height * 4)
    for (let i = 0; i < msg.width * msg.height; i++) {
        frameData[4 * i + 0] = array[3 * i + 0]
        frameData[4 * i + 1] = array[3 * i + 1]
        frameData[4 * i + 2] = array[3 * i + 2]
        frameData[4 * i + 3] = 0
    }
    var rawImageData = {
        data: frameData,
        width: msg.width,
        height: msg.height
    }

    const data = 'data:image/jpeg;base64,' + jpeg.encode(rawImageData, 100).data.toString('base64')
    // console.log(data)
    return data
}

export {GolfAdvice, publishPoint, publishString}