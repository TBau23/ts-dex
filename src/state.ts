import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    previousLocationsURL: string | null;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });

    const pokeapi = new PokeAPI();

    function getCommands(): Record<string, CLICommand> {
        return {
            exit: {
                name: "exit",
                description: "Exit the Pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Display a help message",
                callback: commandHelp,
            },
            map: {
                name: 'map',
                description: 'Return a page of 20 locations',
                callback: commandMap,
            },
            mapb: {
                name: 'mapb',
                description: 'Return a apage of previous 20 locations',
                callback: commandMapB,
            },
            explore: {
                name: 'explore',
                description: 'Explore a location',
                callback: commandExplore,
            }
        }
    }

    return {
        rl,
        commands: getCommands(),
        pokeapi,
        nextLocationsURL: null,
        previousLocationsURL: null,
    }
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}