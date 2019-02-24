import React from 'react';
import {Bar as BarChart } from 'react-chartjs';

const buckets={
    'Cheap':{
        min:0,
        max:1000
    },
    'Normal':{
        min:1001,
        max:2500
    },
    'Expensive':{
        min:2501,
        max:25000000
    }
}
const Charts =(props)=>{
    const chartData={labels:[],datasets:[] };
    let Values=[];
    for(const bucket in buckets){
        const filterBooking= props.booking.reduce((prevValue,currentValue)=>{
            if(!currentValue.cancel && currentValue.event.price<= buckets[bucket].max && currentValue.event.price>buckets[bucket].min ){
                return prevValue+1
            }else{
                return prevValue;
            }

        },0);
        Values.push(filterBooking);
        chartData.labels.push(bucket);
        chartData.datasets.push({
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data:Values
        });
        Values=[...Values];
        Values[Values.length-1]=0;

    }
    return (
        <div style={{textAlign:"center", marginTop:"3rem"}}>
            <BarChart data={chartData} width="600" height="250"/>
        </div>

    )
};
export default Charts;