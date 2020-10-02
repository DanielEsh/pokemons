import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import App from './App'
import PokemonDetails from './components/pokemonDetails'


export default (
      <BrowserRouter>
        <Switch>
            <Route path='/' component={App} exact/>
            <Route path='/pokemon/:id' render={({match}) => {
                const {id} = match.params
                return <PokemonDetails id={id}/>
            }}/>
        </Switch>
      </BrowserRouter>
)

