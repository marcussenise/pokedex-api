const page = document.querySelector('#pokedex-page')

fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
    .then( response => {
        return response.json()
    })
    .then(async data => {
        const box = document.querySelector('#pokemon-box');
        page.innerHTML = '';

        for(let i = 0; i<data.results.length; i++){
            box.querySelector('#pokemon-name').innerHTML = data.results[i].name;
            box.querySelector('#pokemon-name').style.textTransform = 'Capitalize';
            const pokemonInfo = await fetch('https://pokeapi.co/api/v2/pokemon-form/'+data.results[i].name)
            const info = await pokemonInfo.json();
            box.querySelector('#pokemon-img').src = info.sprites.front_default;
            box.querySelector('#pokemon-type').innerHTML = info.types[0].type.name;
            box.querySelector('#pokemon-type').style.textTransform = 'Capitalize';
            page.innerHTML += box.outerHTML;
        }

        VanillaTilt.init(document.querySelectorAll("#pokemon-box"));
    })