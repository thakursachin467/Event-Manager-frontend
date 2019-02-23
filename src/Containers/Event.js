import React, {Component} from 'react';
import { Button, Form, Input, TextArea,List } from 'semantic-ui-react'
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
            events:[]
        }
    }

    componentDidMount() {
        this.fetchEvents();
    }

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
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                   this.setState(prevStage=>{
                       let updatedEvents=[...prevStage.events];
                       updatedEvents.push({...data.data.createEvent,creator:{_id:this.context.userId}});
                       return {events:updatedEvents}
                   })
                })
        }).catch((err)=>console.log(err));
    };
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };

    fetchEvents=()=>{
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
            if(res.status!==200 ){
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then((data)=>{
                   const events= data.data.events;
                   this.setState({events:events});
                })
        }).catch((err)=>console.log(err));
    };
    render() {
        return (
            <React.Fragment>
                {
                    this.context.token? <div className="Events">
                        <Modal>
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
               <EventList events={this.state.events} authUserId={this.context.userId}/>

            </React.Fragment>

        );
    }
}

export default Event;