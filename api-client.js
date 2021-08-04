const apiUrl = "https://pokeapi.co/api/v2/pokemon/" // add at the end the id(number) or name(of pokemon).

export async function getData(pokemon) {
	try {
		const data = await fetch(apiUrl + pokemon, { method: 'GET' });
		console.log("Fetched the pokemon data from the API");
		return data;
	} catch (err) {
		return console.log("Error: ", err);
	}
}