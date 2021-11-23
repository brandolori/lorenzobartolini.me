type StyleMap = {
    [thingName: string]: React.CSSProperties
}

const makeStyles = <M extends StyleMap>(things: M) => things

export default makeStyles