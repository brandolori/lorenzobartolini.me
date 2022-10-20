export const theme = {
    mainColor: "#FFA500",
    modelColor: "#604a21",
    backgroundColor: "#23272f",
    headingFont: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    contentFont: "Georgia, Times, 'Times New Roman', serif"
}
/**
 * @returns the value normalized in the [-1, 1] range
 */
export const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

export const randomBinomial = () => {
    let u = 0, v = 0
    while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return num / 10.0 // Translate to 0 -> 1
}

export const centeredRandom = () => Math.random() - .5
