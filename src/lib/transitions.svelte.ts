export function blink(
    node: Node,
    {
        delay = 0,
        duration = 1,
    }: {
        delay?: number,
        duration?: number,
    } = {},
    options: {direction: "in" | "out" | "both"})
{
    if (options.direction == "both") console.log('fuck you man');

    return {
        delay,
        duration,
        css: (t: number, u: number) => `visibility: ${
            (t && options.direction == 'in')  ? 'visible' :
            (u && options.direction == 'out') ? 'visible' : 'hidden'}`
    }
}

export function typewriter(
    node: Node, {
        speed = 200, // unit: WPM
        backspace = false,
        delay = 0,
    }: {
        speed?: number,
        backspace?: boolean,
        delay?: number
    } = {},
    options: {direction: "in" | "out" | "both"}) {

    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }
    
    const text = node.textContent;
    const duration = text!.length / (!(backspace || options.direction == 'out')  ? (speed / 12000) : (1 / 30));

    return {
        delay,
        duration,
        tick: (t: number) => {
            const i = Math.trunc(text!.length * t);
			node.textContent = text!.slice(0, i);
        },
    };
}
