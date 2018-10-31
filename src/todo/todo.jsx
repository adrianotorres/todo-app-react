import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
            </div>
        )
    }
}

export default Todo