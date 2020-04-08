import React, {Component} from 'react'
import './Restaurant.css'
import Reviewinput from './Reviewinput/reviewinput'
import Streeview from './StreetviewPicture/streetViewPicture'
import SelecOption from './SelectOption/SelectOption'
import { Button} from 'antd';
class Restaurant extends Component {
    
   state ={
       StarsFilterFrom:'',
       StarsFilterTo:'',
       filter:true,
   }

   
   filterMinimumHandler = (event) => {
       this.setState({StarsFilterFrom:event.target.value})
       
   }

   filterMaximumHandler = (event) => {
    this.setState({StarsFilterTo:event.target.value})
   
    }
    onClickValidateFilter = (event) =>{
    this.setState({filter:true})
    }
    render(){
      
    const restaurantInfo = 
    this.props.restaurant.map((restaurant, index) =>{
    console.log(restaurant)
    const stars = restaurant.ratings.map((rating) => rating.stars)
    
    
    const reducer1 = (accumulator, currentValue) => (accumulator);
    const reducer2 = (accumulator, currentValue) => (currentValue);
    const starsfilter1 = stars.reduce(reducer1)
    const starsfilter2 = stars.reduce(reducer2)
    
    if(this.state.filter && (starsfilter1, starsfilter2) >= this.state.StarsFilterFrom && (starsfilter1, starsfilter2) < this.state.StarsFilterTo || !this.state.StarsFilterFrom || !this.state.StarsFilterTo){
             //streetview photo google maps
    
    const streetview = <Streeview lat={restaurant.lat} long={restaurant.long}/>
    
    //Restaurants stars average
    const reducer = (accumulator, currentValue) => (accumulator + currentValue)/2;
    const starsAverage = stars.reduce(reducer)
    
    //restaurants address and Name
    const nameAddress = <React.Fragment>
    <p className='Restaurant-name'>{restaurant.restaurantName}</p>
    <p>{starsAverage} étoiles</p>
    <p>{restaurant.address}</p> </React.Fragment>


    //restaurants stars and comments
     const rating = restaurant.ratings.map((rating, index) =>{ 
            return <React.Fragment key={index}>
            <p>{rating.name}</p>
            <p>{rating.stars} étoiles</p>
            <p>{rating.review}</p>
        </React.Fragment>
        })
    //Add a review input
    const reviewinput = <Reviewinput index={index} reviewAdded={this.props.reviewAdded}/>
    
        return (<div key={index}>  
            {streetview}        
            {nameAddress}
            <div className='Restaurant-ratings'>
            {rating}
            {reviewinput}
            </div>
        </div>)
            
         }
       
          
    })

    //Restaurant Stars filter
    const restaurantFilter = <div>
        <SelecOption name={'restaurant-filter'} text={'Nombre d\'étoiles minimum'} changed={this.filterMinimumHandler}/><SelecOption name={'restaurant-filter'} text={'Nombre d\'étoiles maximum'} changed={this.filterMaximumHandler}/>
        <Button type="primary" size="large" onClick ={this.onClickValidateFilter}> Valider</Button>
    </div>
    

        return <div className='Restaurant-bloc'>
                {restaurantFilter}
               {restaurantInfo}
               
            </div>      
    }  
    
}


export default Restaurant