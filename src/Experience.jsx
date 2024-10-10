import { useFrame } from '@react-three/fiber'
import {
    AccumulativeShadows,
    BakeShadows,
    ContactShadows,
    OrbitControls,
    RandomizedLight,
    SoftShadows,
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
        // const time = state.clock.elapsedTime

        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    return <>
        {/* Import BakingShadows dal drei libray */}
        {/*<BakeShadows />*/}{/* non usarlo sul oggetto che si muove */}

        {/* Import SoftShadows dal drei library */}
        {/*<SoftShadows size={25} samples={10} focus={0} />*/}{/* una volta trovato i valori giusti non toccare più perché SoftShadows coincide molto sul performance*/}



        {/* cambiare il colore con r3f */}{/*puo essere messo ovunque finché il parente è 'scene' */}
        <color args={['#aaafff']} attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* Import AccumulativeShadows dal drei library */}
        {/* AccumulativeSadows non è indicato ai oggetti animati */}
        {/* <AccumulativeShadows
            position-y={-0.99}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity} //accumula n shadow per ogni frame se metti alto ci vorra più tempo
            temporal //nel tempo dimostra n shadows accumulato per frame
            blend={100} //default render ci da 20 render, con blend possiamo aumentarlo
        >
            <RandomizedLight
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={3}
                position={[1, 2, 3]}
                bias={0.001}
            />

        </AccumulativeShadows> */}

        {/* Import ContactShadows dal drei library */}
        <ContactShadows
            position={[0, -0.99, 0]} //move it right above the floor
            scale={10}
            resolution={512}
            far={5}
        />

        <directionalLight
            ref={directionalLight}
            castShadow
            position={[1, 2, 3]}
            intensity={4.5}
            //configurazione shadow in r3f
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        />
        <ambientLight intensity={1.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}