import type { Writable } from "svelte/store";
import { cmds } from "./cmds";

let inp: (inp: string) => void;

export function handleKeys(
    e: KeyboardEvent,
    input: string,
    outputs: Writable<{ inp: string; res: string; isError?: boolean; restrict?: boolean }[]>
) {
    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            outputs.update((prev) => {
                if (input.length === 0) {
                    inp(prev[prev.length - 1].inp);
                } else if (prev.some((o) => o.inp === input)) {
                    const index = prev.findIndex((o) => o.inp === input);
                    const prevInp = prev[index - 1].inp;
                    if (prevInp !== "") inp(prevInp);
                }
                return prev;
            });
            break;
        case "ArrowDown":
            e.preventDefault();
            outputs.update((prev) => {
                if (input.length === 0) {
                    inp("");
                } else if (prev.some((o) => o.inp === input)) {
                    const index = prev.findIndex((o) => o.inp === input);
                    inp(prev[index + 1]?.inp ?? "");
                }
                return prev;
            });
            break;
        case "Tab":
            e.preventDefault();
            if (input.length === 0) break;
            outputs.update((prev) => {
                const prevMatch = prev.find((o) => o.inp.startsWith(input));
                const cmdMatch = Object.keys(cmds).find((c) => c.startsWith(input));
                if (prevMatch) {
                    inp(prevMatch.inp);
                } else if (cmdMatch) {
                    inp(cmdMatch);
                }
                return prev;
            });
            break;
        case "l": // Ctrl+l
            if (e.ctrlKey) {
                e.preventDefault();
                outputs.set([]);
            }
            break;
        default:
            break;
    }
}

export function setInput(setter: (inp: string) => void) {
    inp = setter;
}
