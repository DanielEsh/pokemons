import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getAllPokemons } from '../../api'

import './navbar.css'
import Spinner from '../spinner'


const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchData () {
            let response = await getAllPokemons(
                'https://pokeapi.co/api/v2/pokemon?offset=100&limit=100')
            setPokemons(response.results)
            setLoading(false)
        }

        fetchData()

    }, [])

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <div className='menu'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className="container">
                    <button className="navbar-toggler" type="button"
                            data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={showSidebar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" width="200" height="60" alt=""/>
                    </div>

                    <div className="logo">

                    </div>
                </div>
            </nav>

            <div className={sidebar ? 'menu-list active' : 'menu-list'}>
                <ul onClick={showSidebar}>
                    {loading ? <Spinner/>  : (
                            pokemons.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={`/pokemon/${item.url.match('\\/([0-9]*)\\/$')[1]}`}
                                        className='btn'
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                    )}
                </ul>
            </div>
        </div>

    )
}

export default Navbar
