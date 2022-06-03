import React, {useEffect, useRef, useState} from "react";
import * as ROSLIB from 'roslib'
import jpeg from 'jpeg-js'

export default function ImageView(){

    const [img, setImg] = useState()

    const imgElement = useRef<HTMLImageElement>()

    const ros = useRef(new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    }))

    const listener = useRef(new ROSLIB.Topic({
        ros : ros.current,
        name : '/golf_img',
        messageType : 'sensor_msgs/Image'
    }))

    useEffect(()=>{
        listener.current.subscribe(function(message) {
            // @ts-ignore
            setImg(rgb8ImageToBase64Jpeg(message))
        })
    }, [])

    function publishPoint(point:any){
        var cmdVel = new ROSLIB.Topic({
            ros : ros.current,
            name : '/golf_point',
            messageType : 'geometry_msgs/Point'
        });

        var twist = new ROSLIB.Message(point);
        cmdVel.publish(twist);
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
        return jpeg.encode(rawImageData, 100).data.toString('base64')
    }

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
            <img ref={imgElement} src={"data:image/jpeg;base64," + img} onClick={(e)=>{onImgClick(e)}}/>
        </div>
    )
}