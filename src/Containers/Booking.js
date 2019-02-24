import React, {Component} from 'react';
import AuthContext from "../Context/Auth";
import {Loader, Card, Icon, Button} from "semantic-ui-react";

class Booking extends Component {
    static contextType= AuthContext;
    constructor(props){
        super(props);
        this.state={
            bookings:[],
            isLoading:false
        }
    }
    componentDidMount() {
        this.fetchBookings();
    }

    cancelBooking=(bookingId)=>{
        console.log(bookingId);
        this.setState(prevState=>{
            return {isLoading: !prevState.isLoading}
        });
        const requestBody={
            query:`
           mutation{
  cancelBooking(bookingId:"${bookingId}"){
    title
  }
}`};
        fetch('http://localhost:5001/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`token ${this.context.token}`
            }
        }).then((res)=>{
            this.setState(prevState=>{
                return {isLoading: !prevState.isLoading}
            });
            if(res.status!==200 ){
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                    console.log(data);
                    this.fetchBookings();
                })
        }).catch((err)=>{
            this.setState(prevState=>{
                return {isLoading: !prevState.isLoading}
            });
            console.log(err)
        });
    };

    fetchBookings=()=>{
        this.setState(prevState=>{
            return {isLoading: !prevState.isLoading}
        });
        const requestBody={
            query:`
            query{
  bookings{
  _id
  cancel
    event{
      description
      title
      date
      price
    }
  }
}`};
        fetch('http://localhost:5001/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`token ${this.context.token}`
            }
        }).then((res)=>{
            this.setState(prevState=>{
                return {isLoading: !prevState.isLoading}
            });
            if(res.status!==200 ){
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                    console.log(data);
                    const bookings= data.data.bookings;
                    this.setState({bookings:bookings});
                })
        }).catch((err)=>{
            this.setState(prevState=>{
                return {isLoading: !prevState.isLoading}
            });
            console.log(err)
        });
    };

    render() {

        return (
            <div>
                {
                    this.state.isLoading?( <Loader
                        style={{marginTop:"5rem"}}
                        active
                        size='big'
                        inline='centered' >
                        Loading
                    </Loader>):(
                        <div className="booking">
                        <Card.Group>
                            {
                                this.state.bookings.map((booking)=>{
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
                                                onClick={this.cancelBooking.bind(this,booking._id)}>
                                                Cancel Booking
                                            </Button>)}
                                       />
                                    ):null
                                })
                            }
                        </Card.Group>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Booking;