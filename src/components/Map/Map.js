import React, {Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.css'
class Maps extends Component {
    state = { userLocation: { lat: 32, lng: 32 }, loading: true };

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
  
          this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false
          });
        },
        () => {
          this.setState({ loading: false });
        }
      );
    }
   
    
    

    render(){

        const { loading, userLocation } = this.state;

        if (loading) {
            return null;
          }
       
        const positionRestaurant = this.props.position.map((data,index) => {
            return  <Marker
            key={index}
            onClick={this.onMarkerClick}
            position={{
            lat:data.lat,
            lng:data.long 
          }}
             />
          })
          const { google } = this.props;
        return(
             <Map className='Map-bloc'
            google={google}
            
            initialCenter={userLocation}
            zoom={5}
            onClick={this.onMapClicked}>
            <Marker 
            onClick={this.onMarkerClick}
            name={'Current location'} />
            
            {positionRestaurant}
            
            </Map>   
           
        )
        
        
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCnD9ZLoLXzZkLuFcDXoIYV1eewaJjTL0c")
  })(Maps)