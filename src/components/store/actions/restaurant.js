import * as actionTypes from './actionsTypes';
import axios from '../../../axios-restaurants'

export const setRestaurants = (restaurants) => {
    return {
        type: actionTypes.SET_RESTAURANTS,
        restaurants: restaurants
    };
};

export const addReview = (name, star, review, index) =>{
    return {
        type: actionTypes.ADD_REVIEW,
        name: name,
        star: star,
        review: review,
        index:index
    }
}

export const addRestaurant = (id, name, address, lat, long, rating) =>{
    return {
        type: actionTypes.ADD_RESTAURANT,
        id:id,
        name: name,
        address: address,
        lat: lat,
        long:long,
        rating: rating
    }
}

export const fetchRestaurantsFailed = () => {
    return {
        type: actionTypes.FETCH_RESTAURANTS_FAILED
    };
};

export const initRestaurants = () => {
    return dispatch => {
        axios.get( 'http://localhost:3001/restaurants' )
            .then( response => {
               dispatch(setRestaurants(response.data));
            } )
            .catch( error => {
                dispatch(fetchRestaurantsFailed());
            } );
    };
};