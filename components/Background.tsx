import { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { theme } from '../src/common'
import PointerContext from '../src/PointerContext'

console.log("LOAD THE BOIIIS")

const randomBinomial = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num / 10.0; // Translate to 0 -> 1
}

const centeredRandom = () => Math.random() - .5

type SwarmProps = {
    target: { x: number, y: number },
    size: number,
    tension: number,
    tensionVariance: number,
    friction: number,
    frictionVariance: number,
    offsetVariance: number
}

const Swarm = ({ target, size, offsetVariance, tension, tensionVariance, friction, frictionVariance }: SwarmProps) => {
    const [params,] = useState(Array.from(Array(size)).map(() => ({
        variance: {
            x: randomBinomial() * offsetVariance,
            y: randomBinomial() * offsetVariance
        },
        tension: tension + centeredRandom() * tensionVariance,
        friction: friction + centeredRandom() * frictionVariance,
    })))

    return <>
        {params.map((el, i) =>
            <Follower key={i} tension={el.tension} friction={el.friction} target={{ x: target.x + el.variance.x, y: target.y + el.variance.y }} >
                <Pebble />
            </Follower>)}
    </>
}

type FollowerProps = {
    target: { x: number, y: number },
    tension: number,
    friction: number,
    children?: any
}

const Follower = ({ target, tension, friction, children }: FollowerProps) => {
    const { boxPosition } = useSpring({
        boxPosition: [target.x, target.y, 0],
        config: { tension, friction },
    })
    return <animated.group
        //@ts-ignore
        position={boxPosition}
    >
        {children}
    </animated.group >
}

const Pebble = (props) => {
    const [randomRotation,] = useState([Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2])
    const [randomSize,] = useState(.08 + centeredRandom() * .08)

    return <mesh
        {...props}
        rotation={randomRotation}
    >
        <torusGeometry args={[randomSize, randomSize / 4, 20, 20]} />
        <meshBasicMaterial color={theme.mainColor} />
    </mesh >
}

const targetMultiplier = 2

export default () => {
    const [pixelRatio, setPixelRatio] = useState(1)
    const [offScreen, setOffScreen] = useState(true)
    const pointerPosition = useContext(PointerContext)

    console.log("RENDER THE BOIIII")

    const target = offScreen ? { x: 10, y: 0 } : { x: pointerPosition.x * targetMultiplier, y: pointerPosition.y * targetMultiplier }

    //set pixel ratio to the device pixel ratio, if lower than 1
    //needs to be inside a userEffect because it needs the window object
    useEffect(() => {
        setPixelRatio(Math.min(window.devicePixelRatio, 1))
    }, [])

    //after load, start targeting pointer position
    useEffect(() => {
        setTimeout(() => {
            setOffScreen(false)
        }, 100)
    }, [])
    return <>
        <Canvas
            linear
            flat
            dpr={pixelRatio}
            camera={{ fov: 93.75, near: 0.1, far: 1000, position: [0, 0, 4] }}
        >
            <Swarm
                friction={100}
                frictionVariance={75}
                tension={75}
                tensionVariance={50}

                offsetVariance={7}
                size={15}

                target={target}
            />
        </Canvas>
    </>
}