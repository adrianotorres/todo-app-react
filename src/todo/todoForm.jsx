import React from 'react'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => (
    <div role='form' className='todoForm'>
        <Grid cols='12 9 10'>
            <input id='description' className='form-control' 
                placeholder='Adicione uma tarefa' value={ props.description }
                onChange={ props.handleChangeDescription } />
        </Grid>
        <Grid cols='12 3 2'>
            <IconButton onClick={ props.handleAdd } style='primary' icon='plus'></IconButton>
            <IconButton onClick={ props.handleSearch } style='info' icon='search'></IconButton>
            <IconButton onClick={ props.handleClear } style='default' icon='close'></IconButton>
        </Grid>
    </div>
)