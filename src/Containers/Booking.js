import React, {Component} from 'react';
import AuthContext from "../Context/Auth";
import { Tab } from 'semantic-ui-react'
import Loader from '../Components/Utils/Loader';
import Cards from '../Components/Utils/Card';
import Chart from '../Components/Utils/Chart';
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
        const panes = [
            { menuItem: 'All Bookings', render: () =>
                    this.state.isLoading?( <Loader/>):(
                        <Cards bookings={this.state.bookings} cancelBooking={this.cancelBooking} />
                    )
                 },
            { menuItem: 'Charts', render: () => <Chart booking={this.state.bookings}/> },
            //{ menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        ];

        return (
            <div>
                <Tab panes={panes} />

            </div>
        );
    }
}

export default Booking;