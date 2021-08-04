import { getData } from "./api-client.js";
const pokemonButton = document.getElementsByClassName('pokemon-button')[0];
const damageButton = document.getElementsByClassName('damage-button')[0];

async function receiveData(pokemon) {
	try {
		let data = await getData(pokemon);
		console.log("Received data from api-client.js file.");
		data = await data.json();
		console.log("Converted the data to JSON.");
		addPokemonToHtml(data);
		return data;
	} catch (err) {
		addToHtml();
		return console.log(`Error: ${err}`);
	}
}

const addPokemonToHtml = (data) => {
	const pokemonSection = document.getElementsByClassName('pokemon-picture')[0];
	const newTitle = document.createElement('h1');
	const newText = document.createElement('p');
	const newImg = document.createElement('img');
	const id = data.id;
	let errorNumbers = [10061, 10080, 10081, 10082, 10083, 10084, 10085, 10094, 10095, 10096, 10097, 10098,
		10099, 10116, 10117, 10122, 10121, 10131, 10130, 10132, 10134, 10133, 10135, 10137, 10139, 10138, 10140,
		10141, 10142, 10143, 10145, 10147, 10148, 10179, 10175, 10217];
	const imgUrl = () => {
		if (id <= 649) {
			return data.sprites.other.dream_world.front_default;
		} else if (errorNumbers.indexOf(id) != -1) {
			return data.sprites.front_default;
		} else if ((id >= 650 && id <= 898) || (id >= 10001 && id <= 10220)) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
		}
	}
	pokemonButton.className = 'damage-button';
	pokemonButton.innerHTML = `This Pokemon gets the most damage by:`;
	newTitle.innerHTML = `This is: ${data.name}`;
	newImg.src = imgUrl();
	newImg.height = 100;
	pokemonSection.appendChild(newTitle);
	pokemonSection.appendChild(newText);
	pokemonSection.appendChild(newImg);
}

const addToHtml = () => {
	const pokemonSection = document.getElementsByClassName('pokemon-picture')[0];
	const newTitle = document.createElement('h1');
	const newText = document.createElement('p');
	const newImg = document.createElement('img');
	newImg.height = 100;
	newImg.src = 'images/Poke_ball.png';
	newTitle.innerHTML = `Not a valid Pokemon name or ID`;
	newText.innerHTML = `Try an id between 1 and 898, or 10001 and 10220`
	pokemonSection.appendChild(newTitle);
	pokemonSection.appendChild(newText);
	pokemonSection.appendChild(newImg);
}

pokemonButton.addEventListener('click', () => receiveData('700'));

// damageButton.addEventListener('click', () => );


