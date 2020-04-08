import React from 'react';


const streetview = (props) => (

<img src={`https://maps.googleapis.com/maps/api/streetview?size=300x150&location=${props.lat},${props.long}&fov=80&heading=70&pitch=0&key=AIzaSyCnD9ZLoLXzZkLuFcDXoIYV1eewaJjTL0c`}/>

)

export default streetview