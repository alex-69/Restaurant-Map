import React, {Component} from 'react'
//import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import './Map.css'
import Modal from '../../components/UI/Modal/Modal'
import InputText from  '../../components/UI/InputText/InputText'
import logoResaurant from '../../assets/images/marker-logo-restaurant.png'
import MapAutoComplete from './MapAutoComplete/MapAutoComplete';
import MapMarker from './MapMarker/MapMarker';
import ConstraintSlider from './ConstraintSlider/ConstraintSlider';
import { Button, Input, Divider, message } from 'antd';

const PARIS_COOR = { lat: 48.856782, lng: 2.352551 };
class Maps extends Component {
    
  state = { 
    userLocation: { lat: 32, lng: 32 }, 
    loading: true,
    locations: [],
    newRestaurant:'',
    restaurantName:'',
    restaurantAddress:'',
    showModal:false,
    parisLatLng:{},
    zoom: 11,
    constraints: [{ name: '', time: 0 }],
    searchResults: [],
    mapsLoaded: false,
    map: {},
    mapsApi: {},
    autoCompleteService: {},
    placesService: {},
    geoCoderService: {},
    directionService:{},
    markers:{lat: PARIS_COOR.lat, lng:PARIS_COOR.lng},
    }

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

    //when you click on the map, a pop-up displays for adding a new restaurant
    handleMapClick = (lat) => {
      this.setState({newRestaurant:lat}) 
      this.setState({showModal:true})
    }

    //cancel the pop-up
    cancelAddResaurant = () =>{
      this.setState({showModal:false})
    }
    
    //add a new for the new restaurant added
    namChangehandler= (event) =>{
      this.setState({restaurantName: event.target.value})
    }
    //add an address for the new restaurant added
    AddressChangehandler= (event)=>{
      this.setState({restaurantAddress:event.target.value})
    }
    //add the new the new to the store
    OnClickWrapper = () =>{
      this.props.restaurantAdded(this.state.restaurantName,
      this.state.restaurantAddress, this.state.newRestaurant.lat, this.state.newRestaurant.lng);
      this.setState({showModal:false})
    }

    
  // Updates distance (in KM) for constraint with index == key
  updateConstraintTime = ((value) => { 
    this.setState({ constraints:{time:value} });
  });


  // Adds a Marker to the GoogleMaps component
  addMarker = ((lat, lng, name) => {
    this.setState({ markers:{lat: lat, lng:lng}});
  });


  apiHasLoaded = ((map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      parisLatLng: new mapsApi.LatLng(PARIS_COOR.lat, PARIS_COOR.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService(),
      });
    });
  
 // With the constraints, find some restaurants
 handleSearch = (() => {
  const { markers,constraints, placesService, directionService, mapsApi } = this.state;
  if (markers.length === 0) {
    message.warn('Add a constraint and try again!');
    return;
  }
  const marker = markers;
  //const position = newPosition[0];
  const timeLimit = constraints.time;
  
  const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);
  const placesRequest = {
    location: markerLatLng,
    // radius: '30000', // Cannot be used with rankBy. Pick your poison!
    type: ['restaurant', 'cafe'], // List of types: https://developers.google.com/places/supported_types
    query: 'restaurant',
    rankBy: mapsApi.places.RankBy.DISTANCE, // Cannot be used with radius.
  };
  
  // First, search for restaurant.
  placesService.textSearch(placesRequest, ((response) => {
    
   // Only look at the nearest top 5.
   const responseLimit = Math.min(50, response.length);
   for (let i = 0; i < responseLimit; i++) {
     const restaurantPlace = response[i];
     const { rating, name } = restaurantPlace;
     const idRestaurant = restaurantPlace.id
     const address = restaurantPlace.formatted_address; // e.g 80 mandai Lake Rd,
    // const priceLevel = restaurantPlace.price_level; // 1, 2, 3...
      const locationLat = restaurantPlace.geometry.location.lat()
      const locationLng = restaurantPlace.geometry.location.lng()
      let photoUrl = '';
      let openNow = false;
     if (restaurantPlace.opening_hours) {
       openNow = restaurantPlace.opening_hours.open_now; // e.g true/false
     }
     if (restaurantPlace.photos && restaurantPlace.photos.length > 0) {
       photoUrl = restaurantPlace.photos[0].getUrl();
      }

      // Second, For each restaurantPlace, check if it is within acceptable travelling distance
      const directionRequest = {
        origin: markerLatLng,
        destination: address, // Address of restaurant place
        travelMode: 'DRIVING',
      }
      directionService.route(directionRequest, ((result, status) => {
        if (status !== 'OK') { return }
        const travellingRoute = result.routes[0].legs[0]; // { duration: { text: 1mins, value: 600 } }
        const travellingTimeInMinutes = travellingRoute.duration.value / 60;
        if (travellingTimeInMinutes < timeLimit) {
          const distanceText = travellingRoute.distance.text; // 6.4km
          const timeText = travellingRoute.duration.text; // 11 mins
          this.props.restaurantAdded(idRestaurant, name, address, locationLat, locationLng, rating)
        }
        ;
        
      }));
    }
  }));
});
 
    render(){
        const { loading} = this.state;
        if (loading) {
            return null;
          }
          const modal = <Modal show={this.state.showModal}>
            <p>Informations du Restaurant: </p>
            <p>Nom: </p>
                <InputText type={'text'} placeholder={'Nom'} changed={this.namChangehandler} value={this.state.restaurantName}/>
            <p>Adresse:</p>
            <InputText type={'text'} placeholder={'Adresse'} changed={this.AddressChangehandler} value={this.state.restaurantAddress}/><br/>
            <Button type="primary" size="large" onClick={this.OnClickWrapper}>Ajouter</Button>
            <Button onClick={this.cancelAddResaurant}>Annuler</Button>
            </Modal>

            const AnyReactComponent = ({ text }) => <div>{text}<img src={logoResaurant} width="20" height="20"/></div>;
            
            const positionRestaurant = this.props.position.map((data,index) => {
              return <AnyReactComponent
              key={index}
              lat={data.lat}
              lng={data.long}
              image={logoResaurant}
            />
            })

            const {mapsLoaded, parisLatLng, markers, constraints} = this.state;
            const { autoCompleteService, geoCoderService } = this.state; // Google Maps Services
            
          return(
             <div className='Map-bloc'>
              <div style={{ height: '100vh', width: '100%' }}>
                <section className="col-4">
                  {mapsLoaded ?
                    <div>
                      <div className="mb-4">
                        <MapAutoComplete
                        autoCompleteService={autoCompleteService}
                        geoCoderService={geoCoderService}
                        parisLatLng={parisLatLng}
                        //markerName={name}
                        addMarker={this.addMarker}
                        />
                       <ConstraintSlider
                        iconType="car"
                        value={constraints.time}
                        onChange={(value) => this.updateConstraintTime(value)}
                        text="Minutes away by car"
                        />
                    <Divider />
                      </div>
                    </div>
                    :null
                  }
                    <Button className="mt-4 fw-md" type="primary" size="large" onClick={this.handleSearch}>Search!</Button>
                </section>
                <GoogleMapReact
                  bootstrapURLKeys={{ 
                  key:'AIzaSyD9VQ7cIPYL7S5w_hoBA-oveN6L91SfTPo',
                  libraries: ['places', 'directions']
                  }}
                  //defaultCenter={{ lat:PARIS_COOR.lat, lng:PARIS_COOR.lng}}
                  center={{lat:markers.lat,lng:markers.lng}}
                  defaultZoom={this.state.zoom}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
                  onClick={this.handleMapClick}
                  > 
                  {positionRestaurant}
                <MapMarker name={markers.name} lat={markers.lat} lng={markers.lng} />
               </GoogleMapReact>
              {modal}   
            </div>
          </div>      
          )
        }
      }
      
export default Maps

