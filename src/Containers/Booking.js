import React, {Component} from 'react';
import AuthContext from "../Context/Auth";
import {Loader} from "semantic-ui-react";

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

    fetchBookings=()=>{
        this.setState(prevState=>{
            return {isLoading: !prevState.isLoading}
        });
        const requestBody={
            query:`
            query{
  bookings{
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
                    console.log(data.bookings);
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
                    </Loader>):null
                }
            </div>
        );
    }
}

export default Booking;