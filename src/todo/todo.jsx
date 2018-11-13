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

        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.refreshList()
    }
    refreshList() {
        axios.get(`${ this.state.API_URL }?sort=-createdAt&description__regex=/${this.state.description}/`)
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
        this.refreshList()
    }
    handleRemove(todo) {
        axios.delete(`${ this.state.API_URL }/${todo._id}`)
            .then( () => this.refreshList() )
    }
    handleMarkAsDone(todo) {
        axios.put(`${ this.state.API_URL}/${todo._id}`, { ...todo, done: true })
            .then( () => this.refreshList() )
    }
    handleMarkAsPending(todo) {
        axios.put(`${ this.state.API_URL}/${todo._id}`, { ...todo, done: false })
            .then( () => this.refreshList() )
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm
                    handleAdd={ this.handleAddTodo }
                    description={ this.state.description }
                    handleChangeDescription={ this.handleChangeDescriptionTodo }
                    handleSearch={ this.handleSearch } />
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