import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
    const x: string[] = input.trim().split(' ').filter(x => x !== '').map(x => x.toLowerCase());
    return x;
}

export function startREPL() {
    const state = initState();

    const { rl, commands } = state;

    rl.prompt();
    rl.on("line", (input) => {
        const clean = cleanInput(input);
        if (clean.length == 0 ) {
            rl.prompt();
        }
        // should probably check something other than just the first word
        const command = commands[clean[0]];
        if (command) {
            command.callback(state);
        } else {
            console.log(`Unknown command: ${clean[0]}`);
        }
        rl.prompt();
    });

}