import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
    if (!state.pokedex[pokemonName]) {
        console.error(`You don't have ${pokemonName} in your pokedex`);
        return;
    }

    const pokemon = state.pokedex[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats: \n${pokemon.stats.map(a => `  -${a.stat.name}: ${a.base_stat}`).join('\n')}`);
    console.log(`Types: \n${pokemon.types.map(t => `  -${t.type.name}`).join('\n')}`);
}