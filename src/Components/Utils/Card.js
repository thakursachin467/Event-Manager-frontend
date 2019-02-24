import React from 'react';
import {Button, Card} from "semantic-ui-react";

const Cards =(props)=>{
    const {bookings,cancelBooking}=props;
    return (<div className="booking">
        <Card.Group>
            {
                bookings.map((booking)=>{
                    return  !booking.cancel? (
                        <Card
                            fluid
                            color='red'
                            header={booking.event.title}
                            meta={new Date(booking.event.date).toLocaleString()}
                            description={booking.event.description}
                            extra= {(<Button
                                basic
                                color='red'
                                onClick={cancelBooking.bind(this,booking._id)}>
                                Cancel Booking
                            </Button>)}
                        />
                    ):null
                })
            }
        </Card.Group>
    </div>)
}

export default Cards;