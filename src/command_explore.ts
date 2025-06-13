import { State } from "./state";

export async function commandExplore(state: State, locationName: string) {
    const location = await state.pokeapi.fetchLocation(locationName);
    console.log(location.pokemon_encounters.map(p => `- ${p.pokemon.name}`).join('\n'));
    
}