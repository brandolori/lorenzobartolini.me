import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'



const Pebble = (props) => {
    return <mesh
        {...props}
    >
        <sphereGeometry args={[.2]} />
        <meshStandardMaterial color="hotpink" />
    </mesh >
}

const Firefly = (props) => {
    return <pointLight {...props} />
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

const Swarm = ({ size, offsetVariance, tension, tensionVariance }: SwarmProps) => {
    const [params, setParams] = useState<FollowerProps[]>([])
    useEffect(() => {
        setParams(Array.from(Array(size)).map(() => ({
            target: {
                x: Math.random() * offsetVariance,
                y: Math.random() * offsetVariance
            },
            tension: 100,
            friction: 50,
        })))
    }, [size, offsetVariance])

    return <>
        {params.map((el, i) =>
            <Follower key={i} tension={el.tension} friction={el.friction} target={el.target} >
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


const Demo = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    return <>
        <Canvas>
            <ambientLight intensity={.4} />
            <mesh position={[0, 0, -1]}
                onPointerMove={(ev) => {
                    setMousePosition({ x: ev.point.x, y: ev.point.y })
                }}>
                <planeGeometry args={[100, 300]} />
                <meshStandardMaterial color="orange" />
            </mesh>
            <Follower tension={400} friction={50} target={mousePosition}>
                <Firefly />
            </Follower>
            <Swarm friction={0} frictionVariance={0} offsetVariance={1} size={50} target={mousePosition} tension={0} tensionVariance={0} />
        </Canvas>
    </>
}


export default Demo