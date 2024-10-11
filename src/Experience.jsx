import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { render, useFrame, useThree } from '@react-three/fiber'

import {
    AccumulativeShadows,
    BakeShadows,
    ContactShadows,
    OrbitControls,
    RandomizedLight,
    Sky,
    SoftShadows,
    useHelper,
    Environment,
    Lightformer,
    Stage
} from '@react-three/drei'



export default function Experience() {

    //come aggiungere un helper
    const cube = useRef()
    const directionalLight = useRef()

    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)


    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime

        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 },
    })

    const { subPosition } = useControls('sky', {
        //in sunPosition usiamo spherical coordinates, ma qui non abbiamo usato!
        subPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 1, min: 0, max: 12 },
        envMapHeight: { value: 2, min: 0, max: 100 },
        envMapRadius: { value: 20, min: 10, max: 1000 },
        envMapScale: { value: 20, min: 10, max: 1000 }
    })

    const scene = useThree(state => state.scene)
    useEffect(() => {
        scene.environmentIntensity = envMapIntensity
    }, [envMapIntensity])

    return <>
        {/* Import Environment map from drei*/}
        {/* <Environment 
            // background
            //HDR texture**
            // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
            //**Presets di drei che troviamo in github */
            // preset="sunset"
            // //ground crea una globo del environment con un piano di appoggio come il pavimento, posizione y del contactShadows va sul 0 e la poszione di oggetti in base alla necessità su o giu
            //resolution={32} //se non abbaiamo un environment background image, mettiamo un small resolution per migliorare il performance 
            // ground={{
            //     height: envMapHeight,
            //     radius: envMapRadius,
            //     scale: envMapScale
            // }}>

        /*}
            {/* Creare un custom enironment map, aggiungendo cio che voglio all'interno del Environment tag */ }
        {/* <color args={['#000000']} attach="background" /> */}

        {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color='red' />
            </mesh> */}
        {/* creare light usando mesh ⬆️ non è indicato, drei ci da Lightformer */}
        {/* <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> */}
        {/* </Environment> */}

        {/*Import Sky from Drei */}
        {/* <Sky sunPosition={subPosition} /> */}

        {/* Import BakingShadows dal drei libray */}
        {/*<BakeShadows />*/}{/* non usarlo sul oggetto che si muove */}

        {/* Import SoftShadows dal drei library */}
        {/*<SoftShadows size={25} samples={10} focus={0} />*/}{/* una volta trovato i valori giusti non toccare più perché SoftShadows coincide molto sul performance*/}



        {/* cambiare il colore con r3f */}{/*puo essere messo ovunque finché il parente è 'scene' */}
        {/* <color args={['ivory']} attach="background" /> */}

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
        {/* <ContactShadows
            position={[0, 0, 0]} //move it right above the floor
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
        //frames={1} //cosi posso bake shadow "non sui ogg. in animazione!"
        /> */}

        {/* <directionalLight
            ref={directionalLight}
            castShadow
            position={subPosition} //mettendo sunPosition facciamo shadow realistico
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
        <ambientLight intensity={1.5} /> */}

        {/* <mesh castShadow position-y={1} position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity}/>
        </mesh>

        <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' envMapIntensity={envMapIntensity}/>
        </mesh> */}

        {/* <mesh position-y={0} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}

        {/* import Stage drei, stage ci da la possibilità di renderizzare al volo  */}
        <Stage
            shadows={{
                type: 'contact',
                opacity: 0.2,
                blur: 3
            }}
            environment="sunset"
            preset="portrait"
            intensity={envMapIntensity}
        >
            <mesh castShadow position-y={1} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color='mediumpurple' envMapIntensity={envMapIntensity} />
            </mesh>
        </Stage>

    </>
}