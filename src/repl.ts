import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
    const x: string[] = input.trim().split(' ').filter(x => x !== '').map(x => x.toLowerCase());
    return x;
}

export async function startREPL() {
    const state = initState();

    const { rl, commands } = state;

    rl.prompt();
    rl.on("line", async (input) => {
        const clean = cleanInput(input);
        if (clean.length == 0 ) {
            rl.prompt();
        }

        // should probably check something other than just the first word
        const command = commands[clean[0]];
        if (command) {
            if (command.name === 'explore' || command.name === 'catch' || command.name === 'inspect') {
                await command.callback(state, clean[1]);
            } else {
                await command.callback(state);
            }
        } else {
            console.log(`Unknown command: ${clean[0]}`);
        }
        rl.prompt();
    });

}