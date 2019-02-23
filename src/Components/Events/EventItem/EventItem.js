import React from 'react';
import {List,Button} from "semantic-ui-react";
import './EventItem.css';


const EventItem =(props)=> {
    return (
        <List.Item key={props.eventId} className="EventsList">
            <List.Content floated='right'>
                {
                    props.userId===props.creator?(<p
                            style={{margin:"1.5rem 1rem", borderRadius:"3px "}}>
                            You own this event
                    </p>):
                        (<Button
                            style={{margin:"1.5rem 1rem", background:"orange", borderRadius:"3px "}}
                            onClick={props.detailsOpen.bind(this,props.eventId)}>
                            View Details
                        </Button>)
                }
            </List.Content>
            <List.Content className="EventsListContent">
                <List.Header as='a'> {props.eventTitle}</List.Header>
                <List.Description style={{marginTop:"0.5rem"}}>
                    <h3>&#8377;{props.price}- {props.eventDate}  </h3>
                </List.Description>
            </List.Content>
        </List.Item>
    )};


export default EventItem;