import React, {Component, Fragment} from 'react'
const Store = require('electron-store');
import '../../style/flexlayout.scss'
import * as FlexLayout from "flexlayout-react";
import {IJsonModel, Layout} from "flexlayout-react";
import './app.scss'
import TwistPublisher from "../twistPublisher/twistPublisher";
import TopicView from "../topicView/topicView";
import ClubView from "../clubView/clubView";
import PointPublisher from "../pointPublisher/pointPublisher";
import ImageView from "../imageView/imageView";

interface Props{

}

interface State{
    model:FlexLayout.Model
}

export default class App extends Component {

    private layout: IJsonModel = {
        global: {
            tabEnableClose: false,
            tabEnableFloat: true,
            splitterSize: 1,
            splitterExtra: 8,
            tabSetTabStripHeight: 24
        },
        borders: [
            {
                type: "border",
                location: "bottom",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        name: "point pub",
                        component: "PointPublisher",
                    }
                ]
            },
            {
                type: "border",
                location: "left",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        name: "topic view",
                        component: "TopicView",
                    }
                ]
            },
            {
                type: "border",
                location: "right",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        name: "club view",
                        component: "ClubView",
                    }
                ]
            },
        ],
        layout: {
            type: "row",
            weight: 100,
            children: [
                {
                    type: "tabset",
                    id:'PLOT',
                    weight: 30,
                    children: [
                        {
                            type: "tab",
                            name: "image view",
                            component: "ImageView",
                        }
                    ]
                },
            ]
        }
    };

    state:State={
        model:undefined
    }
    private layoutRef: React.RefObject<Layout>;

    public constructor(props : Props) {
        super(props);
        this.state = {model: FlexLayout.Model.fromJson(this.layout)}
        this.layoutRef = React.createRef();
    }

    private factory(node : any) {
        const component = node.getComponent();
        if (component === "PointPublisher") {
            return (<PointPublisher/>);
        }
        if (component === "TopicView") {
            return (<TopicView/>);
        }
        if (component === "ClubView") {
            return (<ClubView/>);
        }
        if (component === "ImageView") {
            return (<ImageView/>);
        }
    }

    public addPlot(id:number){
        this.layoutRef.current.addTabToTabSet( "PLOT", {type:"tab", component:'Plot '+id.toString(), name:'new plot'});
    }

    public render() {
        return (
            <div className={'app'}>
                <FlexLayout.Layout
                    ref={this.layoutRef}
                    model={this.state.model}
                    factory={this.factory.bind(this)}/>
            </div>
        );
    }
}