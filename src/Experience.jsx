import { useFrame } from '@react-three/fiber'
import {
    BakeShadows,
    OrbitControls,
    useHelper
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'


export default function Experience() {

    //come aggiungere un helper
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)


    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    return <>
        {/* Import BakingShadows dal drei libray */}
        <BakeShadows />{/* non usarlo sul oggetto che si muove */}
        {/* cambiare il colore con r3f */}{/*puo essere messo ovunque finché il parente è 'scene' */}
        <color args={['#aaafff']} attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight ref={directionalLight} castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}