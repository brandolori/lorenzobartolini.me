const theme = {
    mainColor: "#FFA500",
    backgroundColor: "#23272f"
}

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

export { theme, normalize }
