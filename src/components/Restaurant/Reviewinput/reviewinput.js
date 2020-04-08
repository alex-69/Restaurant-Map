import React, {Component} from 'react'
import { Button, Input} from 'antd';

class Reviewinput extends Component {
    state = {
        name: '',
        star:'',
        review: ''
    }

    nameChangedHandler = (event) => {
        this.setState({name: event.target.value});
    }

    reviewChangedHandler = (event) => {
        this.setState({review: event.target.value});
    }

    starChangeHandler = (event) => {
        this.setState({star: event.target.value})
    }
    render () {

        
        return (
            <div className="Addreview">
                <p>Ajouter un avis:</p>
                <Input
                    className="col-4 mr-2"
                    type="text" 
                    placeholder="Nom" 
                    onChange={this.nameChangedHandler}
                    value={this.state.name} />
                
                <select name="stars" onChange={this.starChangeHandler}>
                    <option>--Votre note:-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                
                <Input
                    className="col-4 mr-2"
                    type="text" 
                    placeholder="Commentaire"
                    onChange={this.reviewChangedHandler}
                    value={this.state.review} />
                <Button type="primary" size="large" onClick={() => this.props.reviewAdded(this.state.name,this.state.star, this.state.review, this.props.index)}>Ajouter</Button>
            </div>
        );
    }
}

export default Reviewinput
