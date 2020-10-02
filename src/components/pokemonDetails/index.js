import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPokemonsById } from '../../api'

import './details.css'
import Navbar from '../navbar'
import Spinner from '../spinner'

const PokemonDetails = ({ id }) => {
    const [data, setData] = useState({})
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData () {
            let response = await getPokemonsById(id)
            setImg(response.sprites.front_default)
            setData(response)
            setLoading(false)
        }

        fetchData()

    }, [id])

    return (
        <>
            <Navbar/>
            <div className='container'>
                <Link
                    to={'/'}
                    className='btn btn-danger mt-2'
                >
                    Back
                </Link>
                {
                    loading ? <Spinner/>  : (
                        <div className="pokemon">
                            <h3>Name: {data.name}</h3>
                            <div className="Card__img">
                                <img src={img} alt=""/>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="pokemon__height well">
                                        <p className="title">Height:</p>
                                        <p>{data.height}</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="pokemon__weight well">
                                        <p className="title">Weight:</p>
                                        <p>{data.weight}</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="pokemon__type well">
                                        <p className="title">Types:</p>
                                        {
                                            data.types.map((item, index) => {
                                                return (
                                                    <div
                                                        className={item.type.name}
                                                        key={index}>
                                                        {item.type.name}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="pokemon__abilities well">
                                        <p className="title">Abilities:</p>
                                        {
                                            data.abilities.map(
                                                (item, index) => {
                                                    return (
                                                        <p key={index}>{item.ability.name}</p>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="pokemon__stats well">
                                        <p className="title">Stats:</p>
                                        {
                                            data.stats.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className='stat'>
                                                            <p>{item.stat.name}:</p>
                                                            <p>{item.base_stat}</p>
                                                            <p>Effort: {item.effort}</p>

                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                }
            </div>
        </>
    )
}
export default PokemonDetails
