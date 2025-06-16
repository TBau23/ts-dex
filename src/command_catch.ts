import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try {
        const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
        const catchRate = pokemon.base_experience / 100;
        const random = Math.random();
        if (random < catchRate) {
            console.log(`You caught ${pokemonName}!`);
            
        } else {
            console.log(`You missed ${pokemonName}!`);
        }
    } catch (err) {
        if (err instanceof Error && err.message.includes('404')) {
            console.error(`Pokemon ${pokemonName} not found`);
        } else {
            console.error(`Error catching ${pokemonName}: ${err}`);
        }
    }

}