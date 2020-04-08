import React from 'react';
import ReactStreetview from 'react-streetview';
import {GoogleApiWrapper} from 'google-maps-react';
import './Streetview.css'
class Streetview extends React.Component {

    render() {
        // see https://developers.google.com/maps/documentation/javascript
       // const googleMapsApiKey = 'YOUR_API_KEY';

        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
        const streetViewPanoramaOptions = {
            position: {lat: this.props.lat, lng: this.props.long},
            pov: {heading: 100, pitch: 0},
            zoom: 1
        };

        return (
            <div className='Street-view'>
                <ReactStreetview
                    //apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBSj2R1P_tKLeEdi20cIbDennlOzuF9XNQ")
})(Streetview)
