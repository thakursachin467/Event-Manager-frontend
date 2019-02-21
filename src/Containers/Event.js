import React, {Component} from 'react';
import { Button, Form, Input, TextArea, Modal } from 'semantic-ui-react'
import './Events.css';
class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            price:0.00,
            description:""
        }
    }
    submitHandler=(e)=>{
        e.preventDefault();
        const title=this.state.title;
        const price=Number(this.state.price);
        const description= this.state.description;
    };
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    render() {
        return (
            <div className="Events">
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
                                    placeholder='Price For Event'
                                />
                            </Form.Group>
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
            </div>
        );
    }
}

export default Event;