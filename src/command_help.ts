import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log(`
        Welcome to the Pokedex!
        Usage:

        ${Object.values(state.commands).map(c => `${c.name}: ${c.description}`).join('\n\t')}
        `)
}