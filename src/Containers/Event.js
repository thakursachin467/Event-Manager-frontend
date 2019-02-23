import React, {Component} from 'react';
import { Button ,Loader,Card} from 'semantic-ui-react'
import './Events.css';
import _ from 'lodash';
import AuthContext from "../Context/Auth";
import Modal from '../Components/Modal/Modal';
import EventForm from '../Components/Forms/EventForm';
import EventList from '../Components/Events/EventList';
class Event extends Component {
    static  contextType= AuthContext;
    constructor(props){
        super(props);
        this.state={
            title:"",
            price:0.00,
            description:"",
            date:"",
            events:[],
            event:null,
            open:false,
            isLoading:false,
            showDetails:false
        };
        this.isActive=true
    }

    componentWillUnmount() {
        this.isActive=false;
    }

    componentDidMount() {
        this.fetchEvents();
    }

    controlModal=()=>{
        this.setState(prevState=>{
            return {open:!prevState.open, event:null,showDetails:false}
        })
    };

    detailsOpen=(eventId)=>{
        const selectedEvent= this.state.events.find(event=>event._id===eventId);
        this.setState((prevState)=>{
            return {showDetails:!prevState.showDetails,event:selectedEvent}
        })
    };

    bookEvent=()=>{
        if(!this.context.token){
            this.setState({showDetails:false,event:null});
            this.props.history.push(`/auth`)
        }
        const requestBody={
            query:`
           mutation{
  bookEvent(eventId:"${this.state.event._id}"){
    _id
    createdAt
    updatedAt
     event{
      title
      description
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
            if(res.status!==200 ){
                console.log(res);
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                    this.setState(prevStage=>{
                        return {showDetails:!prevStage.showDetails,event:null}
                    });
                    this.props.history.push(`/bookings`);
                })
        }).catch((err)=>console.log(err));
    };

    submitHandler=(e)=>{
        e.preventDefault();
        const title=this.state.title;
        const price=Number(this.state.price);
        const description= this.state.description;
        if(_.isEmpty(title)||price<=0||_.isEmpty(description)||_.isEmpty(this.state.date)){
            return;
        }
        const date=new Date(this.state.date).toISOString();
        const requestBody={
            query:`
            mutation{
  createEvent(eventInput:{title:"${title}",description:"${description}",price:${price},date:"${date}"}){
    description
    _id
    title
    date
    price
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
            if(res.status!==200 ){
                console.log(res);
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                   this.setState(prevStage=>{
                       let updatedEvents=[...prevStage.events];
                       updatedEvents.push({...data.data.createEvent,creator:{_id:this.context.userId}});
                       return {events:updatedEvents,open:!prevStage.open}
                   })
                })
        }).catch((err)=>console.log(err));
    };
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };

    fetchEvents=()=>{
        this.setState(prevState=>{
           return {isLoading: !prevState.isLoading}
        });
        const requestBody={
            query:`
            query{
  events{
  _id
    title
    description
    date
    price
    creator{
    _id
      email
    }
  }
}`};
        fetch('http://localhost:5001/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
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
                   const events= data.data.events;
                   if(this.isActive){
                       this.setState({events:events});
                   }

                })
        }).catch((err)=>{
            if(this.isActive){
                this.setState(prevState=>{
                    return {isLoading: !prevState.isLoading}
                });
            }

            console.log(err)
        });
    };
    render() {
        return (
            <React.Fragment>
                {
                    this.state.showDetails?( <Modal
                        open={this.state.showDetails}
                        controlModal={this.detailsOpen}
                        header=""
                        basic={true}
                        size="mini"
                    >
                        <Card>
                            <Card.Content>
                                <Card.Header>{this.state.event.title}</Card.Header>
                                <Card.Meta>{new Date(this.state.event.date).toDateString()}</Card.Meta>
                                <Card.Meta>&#8377;{this.state.event.price}</Card.Meta>
                                <Card.Description>
                                    {this.state.event.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' onClick={this.bookEvent}>
                                        {this.context.token?"Book":"Login to book"}
                                    </Button>
                                    <Button basic color='red' onClick={this.detailsOpen}>
                                        Cancel
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Modal>):null
                }
                {
                    this.context.token? <div className="Events">
                        <Button style={{margin:"1.5rem 1rem", background:"orange", borderRadius:"3px "}} onClick={this.controlModal}>Create Event</Button>
                        <Modal
                            open={this.state.open}
                            controlModal={this.controlModal}
                            header="Enter Event Details"
                            size="large"
                            basic={false}
                        >
                            <EventForm
                                title={this.state.title}
                                date={this.state.date}
                                description={this.state.description}
                                price={this.state.price}
                                submitHandler={this.submitHandler}
                                changeHandler={this.changeHandler}
                            />
                        </Modal>

                    </div>:null
                }

                {this.state.isLoading?(
                    <Loader
                        style={{marginTop:"5rem"}}
                        active
                        size='big'
                        inline='centered' >
                        Loading
                    </Loader>
                    ):(
                        <EventList
                            detailsOpen={this.detailsOpen}
                            events={this.state.events}
                            authUserId={this.context.userId}/>)}

            </React.Fragment>

        );
    }
}

export default Event;