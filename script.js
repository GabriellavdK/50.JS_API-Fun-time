import { getData } from "./api-client.js";

const pokemonButton = document.getElementsByClassName('pokemon-button')[0];
const formButton = document.getElementById('button-form');
const pokemonSection = document.getElementsByClassName('pokemon-picture')[0];
const searchField = document.createElement('input');
const searchButton = document.createElement('button');

async function receiveData(pokemon) {
	try {
		console.log(pokemon);
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
	const newTitle = document.createElement('h1');
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
	newTitle.innerHTML = `This is: ${data.name}`;
	newImg.src = imgUrl();
	// newImg.height = 100;
	searchField.placeholder = "Type the name of your favorite Pokemon here"
	searchButton.innerHTML = "Search!"
	pokemonButton.remove();
	formButton.appendChild(searchField);
	formButton.appendChild(searchButton);
	pokemonSection.appendChild(newTitle);
	pokemonSection.appendChild(newImg);
}

const addToHtml = () => {
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

const getRandomPokemon = () => Math.floor(Math.random() * 897) + 1;
pokemonButton.addEventListener('click', () => receiveData(getRandomPokemon()));

// Code after clicking the first button 
const searchFieldInput = () => {
	let value = document.getElementsByTagName('input')[0].value;
	let output = value.toLowerCase();
	return output;
};

const clearWindow = () => {
	pokemonSection.removeChild(pokemonSection.firstChild);
	pokemonSection.removeChild(pokemonSection.firstChild);
}

formButton.addEventListener('click', (event) => {
	event.preventDefault();
	if (searchFieldInput() != '') {
		clearWindow();
		receiveData(searchFieldInput());
	}
	else {
		return;
	}
});

