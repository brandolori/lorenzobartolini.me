import { useContext, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { centeredRandom, randomBinomial, theme } from '../src/common'
import PointerContext from '../src/PointerContext'

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
    const [params,] = useState(() => Array.from(Array(size)).map(() => ({
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
    const [randomRotation,] = useState(() => [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2])
    const [randomSize,] = useState(() => .08 + centeredRandom() * .08)
    const [randomModel,] = useState(() => Math.random())

    return <mesh
        {...props}
        rotation={randomRotation}
    >
        {randomModel < .5
            ? <torusGeometry args={[randomSize, randomSize / 4, 20, 20]} />
            : <boxGeometry args={[randomSize * 1.3, randomSize * 1.3, randomSize * 1.3]} />}

        <meshBasicMaterial color={theme.modelColor} />
    </mesh >
}

const targetMultiplier = 3

export default () => {
    const [offScreen, setOffScreen] = useState(true)
    const pointerPosition = useContext(PointerContext)

    const target = { x: pointerPosition.x * targetMultiplier * window.innerWidth / window.innerHeight, y: pointerPosition.y * targetMultiplier }

    useEffect(() => {
        setOffScreen(false)
    }, [])

    return <>
        <Canvas
            style={{ filter: offScreen ? "opacity(0%)" : "opacity(100%)", transition: "filter 3s" }}
            flat
            dpr={Math.min(window.devicePixelRatio, 1)}
            camera={{ fov: 93.75, near: 0.1, far: 1000, position: [0, 0, 4] }}
        >
            <Swarm
                friction={100}
                frictionVariance={75}
                tension={75}
                tensionVariance={65}

                offsetVariance={8}
                size={40}

                target={target}
            />
        </Canvas>
    </>
}