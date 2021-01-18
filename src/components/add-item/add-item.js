import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();//чтобы браузер не перезагружал страницу
        this.props.onItemAdded(this.state.label);
        this.setState({
            label:''
        });
    };

    render(){
        return (
            <form className="item-add-form d-flex"
                onSubmit={ this.onSubmit }>
                <input type="text"
                        className="form-control new-todo-label"
                        onChange={ this.onLabelChange }
                        placeholder="What needs to be done?" 
                        value={ this.state.label }/>
                <button type="submit"
                    className="btn btn-outline-secondary">
                    Add item
                </button>
            </form>
        );
    }
}