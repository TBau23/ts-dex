export function cleanInput(input: string): string[] {
    const x: string[] = input.trim().split(' ').filter(x => x !== '');
    return x;
}