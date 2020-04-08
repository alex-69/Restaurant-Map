import React from 'react';


const inputtext = (props) => (
    <input 
    type={props.type} 
    placeholder={props.placeholder}
    onChange={props.changed}
    value={props.value} />
);

export default inputtext;