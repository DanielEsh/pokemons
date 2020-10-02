import React from 'react'
import {Link} from 'react-router-dom'


const Card = ({ pokemon }) => {
    return (
            <div className='card'>
                <div className="Card__img">
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.sprites.front_default} alt=""/>
                    </Link>
                </div>
                <div className="Card__name">
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <p>{pokemon.name}</p>
                    </Link>
                </div>
                <div className="card__btn">
                    <Link
                        to={`/pokemon/${pokemon.id}`}
                        className='btn btn-dark'
                    >
                        show more
                    </Link>
                </div>
            </div>

    )
}

export default Card
