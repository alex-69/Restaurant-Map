import React from 'react';
import './SelectOption.css'

const selecOption = (props) => (

<select name={props.name} onChange={props.changed}>
<option value=''>--{props.text}--</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
);

export default selecOption;


