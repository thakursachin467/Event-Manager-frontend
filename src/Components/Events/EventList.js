import React from 'react';
import {List} from "semantic-ui-react";
import './EventList.css';
import EventItem from './EventItem/EventItem';

const EventList =(props)=> {
const events= props.events.map(event=>{
    const date= new Date(event.date).toDateString();
    return <EventItem key={event._id} eventId={event._id} creator={event.creator._id} eventTitle={event.title} eventDate={date} price={event.price} userId={props.authUserId}/>
});
   return(
       <div className="List">
    <List  verticalAlign='middle' >
        {events}
    </List>
</div>
)
}


export default EventList;