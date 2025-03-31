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
        

        const textNodes: Node[] = getAllTextNodes(node);
        if (!textNodes.length) {
            throw new Error(`This transition only works on elements with text nodes`);
        }
    
        let totalLength = 0;
        const ranges = textNodes.map(textNode => {
            const range = [totalLength, totalLength + textNode.textContent!.length];
            totalLength += textNode.textContent!.length;
            const text = textNode.textContent;
            textNode.textContent = '';
            return { textNode, range, text };
        });
    
        let currentRangeIndex = 0;
        function getCurrentRange(i: number) {
            while (ranges[currentRangeIndex].range[1] < i && currentRangeIndex < ranges.length) {
                const { textNode, text } = ranges[currentRangeIndex];
                textNode.textContent = text;		// finish typing up the last node
                currentRangeIndex++;
            }
            return ranges[currentRangeIndex];
        }

    const duration = totalLength / (!(backspace || options.direction == 'out')  ? (speed / 12000) : (1 / 30));

    return {
        delay,
        duration,
        tick: (t: number) => {
            const progress = ~~(totalLength * t);
            console.log(progress);
            const { textNode, range, text } = getCurrentRange(progress);
            const [start, end] = range;
            const textLength = ((progress - start) / (end - start)) * text!.length;
            textNode.textContent = text!.slice(0, textLength);
        },
    };
}

function getAllTextNodes(node: Node): Node[] {
    if (node.nodeType === 3) {
        return [node];
    } else if (node.hasChildNodes()) {
        let list: Node[] = [];
        for (let child of node.childNodes) {
            getAllTextNodes(child).forEach(textNode => list.push(textNode));
        }
        return list;
    }
    return [];
}