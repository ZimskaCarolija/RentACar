
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
  const NaruciHome=() =>{
    const navigate = useNavigate();
    const Animacija = useAnimation();
    const PokreniANimaciju = () => {
      Animacija.start({
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: {
          duration: 5, 
          ease: "linear",
          loop: Infinity,
        }
      });
    };
    const zaustaviAnimaciju = () => {
      Animacija.stop(); 
    };
  
  return (
    <div className="OkoKruga">
            <motion.button
            onClick={()=>{navigate('/Narucivanje')}}
            className="naruciKrug"
            animate={Animacija}
            onHoverStart={PokreniANimaciju}
            onHoverEnd={zaustaviAnimaciju}
      >
        <div style={{zIndex:5}}>Iznajmi</div>
      </motion.button>
    </div>
  );
}
export default NaruciHome
