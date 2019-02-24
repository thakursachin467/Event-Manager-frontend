import React from 'react';
import {Loader} from "semantic-ui-react";

const Loading =()=>(<Loader
    style={{marginTop:"5rem"}}
    active
    size='big'
    inline='centered' >
    Loading
</Loader>)

export default Loading;