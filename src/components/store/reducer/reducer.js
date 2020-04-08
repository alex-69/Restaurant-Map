import  * as actionTypes from '../actions/actionsTypes'

const initialState = {
    restaurants:[],
    error: false
   
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_REVIEW:
    
        const newReview = {
                id: Math.random(),
                name: action.name,
                stars: action.star,
                review: action.review,
            }

        let newArray = [...state.restaurants]

            newArray.map((rating, index)=>{
                const review = rating.ratings
                if(action.index === index){
                    return review.splice(0, 0, newReview)
                }
                return review
            })
            return {
            restaurants: newArray
            }

        case actionTypes.ADD_RESTAURANT:

        const newRestaurantArray = [...state.restaurants]

        
            const newRestaurant = {
                id: action.id ? action.id:Math.random(),
                restaurantName: action.name ,
                address: action.address,
                lat: action.lat,
                long: action.long,
                ratings:[{
                    stars: action.rating,
                    review:null,
                }]
                }

                console.log(newRestaurant)

            return {...state,
                restaurants: newRestaurantArray.concat(newRestaurant)
                    }
      
                    
        case actionTypes.SET_RESTAURANTS:

        const restaurant = action.restaurants
            return {
                ...state,
                restaurants:state.restaurants.concat(restaurant),
                error: false
                    
                };
                
        case actionTypes.FETCH_RESTAURANTS_FAILED:
            return {
                ...state,
                    error: true
                };
        default:
            return state;
          
    }
   
}

export default reducer