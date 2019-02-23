import React, {Component} from 'react';
import {Button, Form, Input, TextArea} from "semantic-ui-react";

const EventForm =(props)=>{
  return (
      <Form onSubmit={props.submitHandler}>
          <Form.Group widths='equal'>
              <Form.Input
                  id='form-input-control-first-name'
                  control={Input}
                  label='Title'
                  name="title"
                  value={props.title}
                  onChange={props.changeHandler}
                  placeholder='Event Name'
              />
              <Form.Field
                  id='form-input-control-last-name'
                  control={Input}
                  name="price"
                  value={props.price}
                  onChange={props.changeHandler}
                  label='Price'
                  type="Number"
                  placeholder='Price For Event'
              />
          </Form.Group>
          <Form.Field
              id='form-input-control-last-name'
              control={Input}
              name="date"
              value={props.date}
              onChange={props.changeHandler}
              label='Date'
              type="date"
          />
          <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              name="description"
              value={props.description}
              onChange={props.changeHandler}
              label='Description'
              placeholder='What is this Event About?'
          />
          <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Add Event'
          />
      </Form>
  )
};

export default EventForm;