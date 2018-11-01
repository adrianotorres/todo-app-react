import React, { Component } from 'react'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleAddTodo = this.handleAddTodo.bind(this)
    }
    handleAddTodo() {
        console.log(this)
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm handleAdd={ this.handleAddTodo } />
                <TodoList />
            </div>
        )
    }
}

export default Todo