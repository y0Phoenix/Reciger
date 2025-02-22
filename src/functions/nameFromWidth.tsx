/**
 * 
 * @param screenWidth the current width of the browser window
 * @param name the name to check
 * @returns {string} either ending in 3 dots or the original name
 */
export default function nameFromWidth (screenWidth: number, name: string): string {
    if (screenWidth <= 768) {
        let newName = name.split('');
        if (newName.length > 7) {
            newName.splice(7);
            newName.push('.', '.', '.');
        }
        console.log(newName);
        name = newName.join('');
        console.log(name);
        return name;
    }
    return name;
}