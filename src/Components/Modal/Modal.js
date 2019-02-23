import React from 'react';
import {Button, Input, TextArea,Form,Modal} from "semantic-ui-react";

const Modals =(props)=>{
    const {open,controlModal}=props;
        return(
            <Modal
                open={open}
                onOpen={controlModal}
                onClose={controlModal}
                size={props.size}
                basic={props.basic}
            >
                <Modal.Header>{props.header}</Modal.Header>
                <Modal.Content>
                    {props.children}
                </Modal.Content>
            </Modal>
        )
};

export default Modals;