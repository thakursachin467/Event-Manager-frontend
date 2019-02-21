import React, {Component} from 'react';
import { Button, Form, Input, TextArea, Modal,List } from 'semantic-ui-react'
import './Events.css';
import _ from 'lodash';
import AuthContext from "../Context/Auth";
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
                'Content-Type':'application/json',
                'Authorization':`token ${this.context.token}`
            }
        }).then((res)=>{
            if(res.status!==200 ){
                throw new  Error('Something went wrong');
            }
            return res.json()
                .then(()=>{
                   this.fetchEvents();
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
    creator{
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
        const events= this.state.events.map(event=>{
            return (
                <List divided relaxed key={event._id} className="EventsList">
                    <List.Item>
                        <List.Icon name='universal access' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{event.title}</List.Header>
                            <List.Description as='a'>{event.description}</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            )
        });
        console.log(events);
        return (
            <React.Fragment>
                {
                    this.context.token? <div className="Events">
                        <Modal trigger={
                           <Button className="btn">Create Event</Button>

                        }>
                            <Modal.Header>Enter Event Details</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit={this.submitHandler}>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            id='form-input-control-first-name'
                                            control={Input}
                                            label='Title'
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.changeHandler}
                                            placeholder='Event Name'
                                        />
                                        <Form.Field
                                            id='form-input-control-last-name'
                                            control={Input}
                                            name="price"
                                            value={this.state.price}
                                            onChange={this.changeHandler}
                                            label='Price'
                                            type="Number"
                                            placeholder='Price For Event'
                                        />
                                    </Form.Group>
                                    <Form.Field
                                        id='form-input-control-last-name'
                                        control={Input}
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.changeHandler}
                                        label='Date'
                                        type="date"
                                    />
                                    <Form.Field
                                        id='form-textarea-control-opinion'
                                        control={TextArea}
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.changeHandler}
                                        label='Description'
                                        placeholder='What is this Event About?'
                                    />
                                    <Form.Field
                                        id='form-button-control-public'
                                        control={Button}
                                        content='Add Event'
                                    />
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </div>:null
                }
                <div className="List">
                    {events}
                </div>

            </React.Fragment>

        );
    }
}

export default Event;