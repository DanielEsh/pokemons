export function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
        .then(data => {
            resolve(data)
        })
    });
}

export async function getAllPokemons(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
        .then(data => {
            resolve(data)
        })
    });
}

export async function getPokemonsById (id) {
    return new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
            .then(data => resolve(data))
    })
}
