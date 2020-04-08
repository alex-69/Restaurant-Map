import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Layout.css';
import Map from'../components/Map/Map';
import Restaurant from'../components/Restaurant/Restaurant';
import * as restaurantsActions from '../components/store/actions/index'
import axios from '../axios-restaurants'
import 'antd/dist/antd.css';

class Layout extends Component{

  componentDidMount() {

    this.props.onInitRestaurants();
  }
  render(){

   return(
      <div className="Layout">
         <Restaurant 
        restaurant= {this.props.rest}
        reviewAdded = {this.props.onAddedReview}/>
        <Map
        restaurantAdded={this.props.onAddedRestaurant}
        position={this.props.rest}
        />
    </div>
      )
  }
    
    }

  const mapStateToProps = state => {
    return {
      rest: state.restaurants,
      error: state.error
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onAddedReview: (name, star, review, index) => dispatch(restaurantsActions.addReview(name, star, review, index)),
      onAddedRestaurant: (id, name, address, lat, long, rating) => dispatch(restaurantsActions.addRestaurant(id, name, address, lat, long, rating)),
      onInitRestaurants: () => dispatch(restaurantsActions.initRestaurants())
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(Layout, axios);
