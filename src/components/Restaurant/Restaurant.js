import React, {Component} from 'react'
import './Restaurant.css'

class Restaurant extends Component {
    
   
    render(){

    
    const restaurantInfo = 
    this.props.restaurant.map((restaurant, index) =>{
        
     const rating = restaurant.ratings.map((rating, index) =>{ 
            return <React.Fragment key={index}>
            <p>{rating.stars}</p>
            <p>{rating.comment}</p>
        </React.Fragment>
        })
        return <React.Fragment key={index}>
            <p className='Restaurant-name'>{restaurant.restaurantName}</p>
            <p>{restaurant.address}</p>
            <div className='Restaurant-ratings'>
                {rating}
            </div>
        </React.Fragment>
              
    })
        
        return <div className='Restaurant-bloc'>
               {restaurantInfo}
              
           
            </div>      
    }  
    
}


export default Restaurant