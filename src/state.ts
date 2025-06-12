import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";


export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });

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
        }
    }

    return {
        rl,
        commands: getCommands(),
    }
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}