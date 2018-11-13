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
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.refreshList()
    }
    refreshList(description = '') {
        axios.get(`${ this.state.API_URL }?sort=-createdAt&description__regex=/${description}/`)
            .then( res => this.setState({ ...this.state, list: res.data }) )
    }
    handleAddTodo() {
        const description = this.state.description
        this.setState({ ...this.state, description: '' })
        axios.post(this.state.API_URL, { description })
            .then( () => this.refreshList() )
    }
    handleChangeDescriptionTodo(event) {
        this.setState({ ...this.state, description: event.target.value })
    }
    handleSearch() {
        this.refreshList(this.state.description)
    }
    handleClear() {
        this.setState({ ...this.state, description: '' })
        this.refreshList()
    }
    handleRemove(todo) {
        axios.delete(`${ this.state.API_URL }/${todo._id}`)
            .then( () => this.refreshList(this.state.description) )
    }
    handleMarkAsDone(todo) {
        axios.put(`${ this.state.API_URL}/${todo._id}`, { ...todo, done: true })
            .then( () => this.refreshList(this.state.description) )
    }
    handleMarkAsPending(todo) {
        axios.put(`${ this.state.API_URL}/${todo._id}`, { ...todo, done: false })
            .then( () => this.refreshList(this.state.description) )
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm
                    handleAdd={ this.handleAddTodo }
                    description={ this.state.description }
                    handleChangeDescription={ this.handleChangeDescriptionTodo }
                    handleSearch={ this.handleSearch }
                    handleClear={ this.handleClear } />
                <TodoList
                    list={ this.state.list }
                    handleRemove={ this.handleRemove }
                    handleMarkAsDone={ this.handleMarkAsDone }
                    handleMarkAsPending={ this.handleMarkAsPending } />
            </div>
        )
    }
}

export default Todo