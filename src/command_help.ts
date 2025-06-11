import { getCommands } from "./repl.js";

export function commandHelp() {
    console.log(`
        Welcome to the Pokedex!
        Usage:

        ${Object.values(getCommands()).map(c => `${c.name}: ${c.description}`).join('\n\t')}
        `)
}