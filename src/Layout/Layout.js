import React, {Component} from 'react';
import './Layout.css';
import Map from'../components/Map/Map'
import Restaurant from'../components/Restaurant/Restaurant'
import axios from 'axios'

class Layout extends Component{
  
  state= {
    restaurant:[],
  }
  componentDidMount() {
    
    axios.get('http://localhost:3001/restaurants').then(response =>{
      
      const data = response.data
      this.setState({restaurant: data})
      }).catch(error=> {
      console.log(error)
    })
  
  }
  render(){
   
    
   return(
      <div className="Layout">
         <Restaurant 
        restaurant= {this.state.restaurant}/>
        <Map
        position={this.state.restaurant}/>
    </div>
      )
  }
    
    }

export default Layout;
