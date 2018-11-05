import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [], API_URL: 'http://localhost:3003/api/todos' }
        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleChangeDescriptionTodo = this.handleChangeDescriptionTodo.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.refreshList()
    }
    refreshList() {
        axios.get(`${ this.state.API_URL }?sort=-createdAt`)
            .then( res => this.setState({ ...this.state, description: '', list: res.data }) )
    }
    handleAddTodo() {
        const description = this.state.description
        axios.post(this.state.API_URL, { description })
            .then( () => this.refreshList() )
    }
    handleChangeDescriptionTodo(event) {
        this.setState({ ...this.state, description: event.target.value })
    }
    handleRemove(todo) {
        axios.delete(`${ this.state.API_URL }/${todo._id}`)
            .then( () => this.refreshList() )
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm handleAdd={ this.handleAddTodo } description={ this.state.description }
                    handleChangeDescription={ this.handleChangeDescriptionTodo } />
                <TodoList list={ this.state.list } handleRemove={ this.handleRemove } />
            </div>
        )
    }
}

export default Todo