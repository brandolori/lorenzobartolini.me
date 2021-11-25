import { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import ThemeContext from '../src/ThemeContext'
import { useContextBridge } from '@react-three/drei'

const randomBinomial = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num / 10.0; // Translate to 0 -> 1
}

const centeredRandom = () => Math.random() - .5

const Pebble = (props) => {
    const [randomRotation,] = useState([Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2])
    const [randomSize,] = useState(.15 + centeredRandom() * .1)

    const [color,] = useContext(ThemeContext)
    return <mesh
        {...props}
        rotation={randomRotation}
    >
        <torusGeometry args={[randomSize, randomSize / 5, 20, 20]} />
        <meshStandardMaterial color={color} />
    </mesh >
}

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
    const [params, setParams] = useState([])
    useEffect(() => {
        setParams(Array.from(Array(size)).map(() => ({
            variance: {
                x: randomBinomial() * offsetVariance,
                y: randomBinomial() * offsetVariance
            },
            tension: tension + centeredRandom() * tensionVariance,
            friction: friction + centeredRandom() * frictionVariance,
        })))
    }, [size, offsetVariance, tension, tensionVariance, friction, frictionVariance])

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


export default ({ pointerPosition }: { pointerPosition: { x: number, y: number } }) => {
    const ContextBridge = useContextBridge(ThemeContext)
    const [theme,] = useContext(ThemeContext)
    const [pixelRatio, setPixelRatio] = useState(1)

    useEffect(() => {
        setPixelRatio(window.devicePixelRatio)
    }, [])
    return <>
        <Canvas
            linear
            dpr={pixelRatio}
        >
            <ContextBridge>

                <ambientLight intensity={.8} />
                <mesh position={[0, 0, -1]}>
                    <planeGeometry args={[100, 300]} />
                    <meshStandardMaterial color="#202020" />
                </mesh>
                <Follower
                    friction={75}
                    tension={125}
                    target={pointerPosition}
                >
                    <pointLight
                        intensity={.4}
                        color={theme}
                    />
                </Follower>
                <Swarm
                    friction={75}
                    frictionVariance={75}
                    tension={125}
                    tensionVariance={75}

                    offsetVariance={5}
                    size={10}

                    target={pointerPosition}
                />
                <EffectComposer >
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={250} intensity={.4} />
                    <Noise opacity={0.03} />
                    <Vignette eskil={false} offset={0.1} darkness={0.4} />
                </EffectComposer>
            </ContextBridge>
        </Canvas>
    </>
}