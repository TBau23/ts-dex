import { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeapi.fetchLocations();
    console.log(locations.results.map(l => l.name).join('\n'));
}

// export async function commandMapB(state: State) {
//     return {}
// }