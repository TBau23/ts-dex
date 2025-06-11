import { createInterface } from "readline";

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
        console.log(`Your command was: ${clean[0]}`);
        rl.prompt();
    });

}