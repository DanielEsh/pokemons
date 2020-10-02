import React, { useEffect, useState } from 'react'

import Card from './components/card'
import { getAllPokemons, getPokemon } from './api'
import Navbar from './components/navbar'
import Spinner from './components/spinner'

import './app.css'


const App = () => {
    const [pokemons, setPokemons] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async function fetchData () {
            let response = await getAllPokemons('https://pokeapi.co/api/v2/pokemon')
            setNextUrl(response.next)
            setPrevUrl(response.previous)
            await loadPokemon(response.results)
            setLoading(false)
        })()
    }, [])

    const next = async () => {
        setLoading(true)
        let data = await getAllPokemons(nextUrl)
        await loadPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    const prev = async () => {
        if (!prevUrl) return
        setLoading(true)
        let data = await getAllPokemons(prevUrl)
        await loadPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon)
            return pokemonRecord
        }))
        setPokemons(_pokemonData)
    }

    return (

        <div className='view-container'>
            <Navbar/>
            <div className="container">
                {
                    loading ? <Spinner/> : (
                        <>
                            <div className="pokemons-view">
                                {pokemons.map((pokemon, i) => {
                                    return <Card key={i} pokemon={pokemon}/>
                                })}
                            </div>
                            <div className="btn">
                                <button onClick={prev} className="btn btn-dark">Prev</button>
                                <button onClick={next} className="btn btn-dark ml-2">Next</button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default App
