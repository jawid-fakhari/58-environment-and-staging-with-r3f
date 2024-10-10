import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
// import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))
/**
 * func created, state: ci da lo stato del canvas
 */
// const created = (state) => {
//     state.gl.setClearColor('#ffeeff')
// } ⬇️
// const created = ({ gl }) => {//possiamo fare destructuring
//     gl.setClearColor('#ffa0ff', 1)
// }

// const created = ({ scene }) => {
//     scene.background = new THREE.Color('red')
// }

root.render(
    <Canvas
        shadows //attivare shadows in r3f, poi dobbiamo fare il cast al shadows alla luce e ai oggetti
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [- 4, 3, 6]
        }}
    // onCreated={created} //dp creazione canvas chiama created
    >
        {/* cambiare il colore con r3f */}
        {/* <color args={['purple']} attach="background" /> */}
        <Experience />
    </Canvas>
)