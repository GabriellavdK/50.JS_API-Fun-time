import { getData } from "./api-client.js";

async function receiveData(pokemon) {
	try {
		let data = await getData(pokemon);
		console.log("Received data from api-client.js file.");
		data = await data.json();
		console.log("Converted the data to JSON.");
		addToHtml(data);
		console.log(data.types.length);
		return data;
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

const addToHtml = (data) => {
	const pokemonButton = document.getElementsByClassName('pokemon-button')[0];
	const newImg = document.createElement('img');
	const id = data.id;
	const imgUrl = () => {
		if (id < 650) {
			console.log("id onder de 649");
			return data.sprites.other.dream_world.front_default;
		} else {
			console.log("id vanaf de 650");
			return data.sprites.front_default;
		}
	}
	newImg.src = imgUrl();
	pokemonButton.appendChild(newImg)
	console.log(data.id)
}

console.log(receiveData("649"));

// max pokemon is 898
