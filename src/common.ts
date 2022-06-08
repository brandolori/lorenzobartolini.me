const theme = {
    mainColor: "#FFA500",
    backgroundColor: "#23272f",
    headingFont: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    contentFont: "Georgia, Times, 'Times New Roman', serif"
}
/**
 * 
 * @returns the value normalized in the [-1, 1] range
 */
const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

export { theme, normalize }
