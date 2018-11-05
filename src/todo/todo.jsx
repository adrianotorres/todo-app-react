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
    }
    handleAddTodo() {
        const description = this.state.description
        axios.post(this.state.API_URL, { description })
            .then( res => console.log('Funcionou') )
    }
    handleChangeDescriptionTodo(event) {
        this.setState({ ...this.state, description: event.target.value })
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm handleAdd={ this.handleAddTodo } description={ this.state.description }
                    handleChangeDescription={ this.handleChangeDescriptionTodo } />
                <TodoList />
            </div>
        )
    }
}

export default Todo