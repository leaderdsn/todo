import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import './app.css'
import AddItem from '../add-item';

export default class App extends Component {

    maxId = 100;

    state = {
            todoData: [
                    this.createTodoItem('Drink Coffee'),
                    this.createTodoItem('Make Awesome App'),
                    this.createTodoItem('Have a lunch'),
                ],
            term: '',
            filter: 'all' //active, all, done
        };


    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);
            // [a, b, c, d, e]
            // [a, b, index d, e]
            const before = todoData.slice(0, index); // [a, b]
            const after = todoData.slice(index + 1); // [d, e]
            const newArray = [ 
                ... before, 
                ... after
            ]; //[a, b, d, e]

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        //add element in array
        this.setState(({todoData}) => {
            const newArr = [
                ... todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    }


    onSearchItem(items, term){
        if (term.length === 0){
            return items;
        }
        return items.filter((item) => {
            return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
        })
    }

    filter(items, filter){
        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }
    

    toggleProperty(arr, id, propName){
        const index = arr.findIndex((el) => el.id === id);

            const oldItem = arr[index];
            const newItem = { ... oldItem, 
                [propName]: !oldItem[propName]};

            return [
                ... arr.slice(0, index), 
                newItem,
                ... arr.slice(index + 1)
            ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty( todoData, id, 'important')
            };
        });

    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty( todoData, id, 'done')
            };
        });
    };

    render(){
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.onSearchItem(todoData, term), filter);
        const doneCount = todoData.filter((el)=>el.done).length;
        const todoCount = todoData.length-doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoCount } done={ doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={ this.onSearchChange }/>
                    <ItemStatusFilter filter={ filter }
                        onFilterChange={ this.onFilterChange } />
                </div>
                <TodoList todos={ visibleItems } 
                    onDeleted={ this.deleteItem }
                    onToggleDone={ this.onToggleDone }
                    onToggleImportant={ this.onToggleImportant } />
                <AddItem onItemAdded={ this.addItem }/>
            </div>
        )
    }
}