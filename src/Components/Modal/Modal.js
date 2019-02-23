import React from 'react';
import {Button, Input, TextArea,Form,Modal} from "semantic-ui-react";

const Modals =(props)=>{
        return(
            <Modal trigger={
                <Button style={{margin:"1.5rem 1rem", background:"orange", borderRadius:"3px "}}>Create Event</Button>

            }>
                <Modal.Header>Enter Event Details</Modal.Header>
                <Modal.Content>
                    {props.children}
                </Modal.Content>
            </Modal>
        )
};

export default Modals;