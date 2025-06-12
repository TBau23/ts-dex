import { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
    console.log(locations.results.map(l => l.name).join('\n'));
    state.nextLocationsURL = locations.next;
    state.previousLocationsURL = locations.previous;
}

export async function commandMapB(state: State) {
    if (state.previousLocationsURL === null) {
        console.log('You are on the first page');
        return;
    }

    const locations = await state.pokeapi.fetchLocations(state.previousLocationsURL ?? undefined);
    console.log(locations.results.map(l => l.name).join('\n'));
    state.nextLocationsURL = locations.next;
    state.previousLocationsURL = locations.previous;
}