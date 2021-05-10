
// TODO: Add public API comments

export function removeAll(text: string, textToRemove: string): string {
    while (text.indexOf(textToRemove) > -1) {
        text = text.replace(textToRemove, '');
    }
    return text;
}
