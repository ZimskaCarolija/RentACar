import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import { useRef } from 'react';
import Tema from './Tema';
import './index.css';
import Naslov from './MiniKomponente/Naslov';
import { useTransform, useScroll } from "framer-motion";

function Model(props) {
    const { scene } = useGLTF("/autoModel.glb");
  const meshRef = useRef();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = y.get();
    }
  });

  

    return <primitive  object={scene} ref={meshRef} {...props} />
}

const ModelDeo = () => {
    return (
      <div className='pomoc' >
        <Canvas dpr={[0.03, 0.15]} shadows="none" style={{ position: "fixed" , top:0 , zIndex:-1}}>
          <color attach="background" args={[Tema.palette.common.white]} />
            <Stage environment={"dawn"}>
              <Model scale={0.002}  position={[0, 0, 0]}/>
            </Stage>
        </Canvas>
        <Naslov klasa={"Naslov"}  tekst={"Dobrodosli u ? najbolji rent a  car"}/>
      </div>
      );
}

export default ModelDeo;


