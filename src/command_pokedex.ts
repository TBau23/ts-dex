import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log(`Your Pokedex: \n${Object.keys(state.pokedex).map(p => `  - ${p}`).join('\n')}`);
}