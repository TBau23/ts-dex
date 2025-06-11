import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}

export function getCommands(): Record<string, CLICommand> {
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
        }
    }
}



export function cleanInput(input: string): string[] {
    const x: string[] = input.trim().split(' ').filter(x => x !== '').map(x => x.toLowerCase());
    return x;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });

    rl.prompt();
    rl.on("line", (input) => {
        const clean = cleanInput(input);
        if (clean.length == 0 ) {
            rl.prompt();
        }
        // should probably check something other than just the first word
        const command = getCommands()[clean[0]];
        if (command) {
            command.callback(getCommands());
        } else {
            console.log(`Unknown command: ${clean[0]}`);
        }
        rl.prompt();
    });

}