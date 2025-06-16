import { State } from "./state";

export async function commandExplore(state: State, locationName: string) {
    try {
        const location = await state.pokeapi.fetchLocation(locationName);
        console.log(location.pokemon_encounters.map(p => `- ${p.pokemon.name}`).join('\n'));
    } catch (error) {
        if (error instanceof Error && error.message.includes('404')) {
            console.error(`Location ${locationName} not found`);
        } else {
            console.error(`Error exploring ${locationName}: ${error}`);
        }
    }
}