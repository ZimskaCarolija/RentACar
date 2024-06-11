import { motion} from "framer-motion";
import Tema from "../Tema";
import {najpopularnijiFja} from "../Automobili";
import Naslov from "./Naslov";
import { useEffect } from "react";
import React from "react";
const cardVariants = {
    offscreen: {
        y: 300
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};
const KartaPopularno = ({broj,model})=>{
    return(

        <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{  amount: 0.8 }}
      >
        <div className="splash"  style={{backgroundColor:Tema.palette.common.black}}/>
        <motion.div className="card" variants={cardVariants} >
          <div className="broj"style={{color:Tema.palette.common.black}} >{broj}</div><br/>
          <div className="naziv">{model}</div>
        </motion.div>
      </motion.div>
    );
}
const Najpopularnije=()=>{
  const a = "1"
  const[Auto,setRows] = React.useState([])
  useEffect(() => {
    const fetchAutomobili = async () => {
      try {
        const automobili = await najpopularnijiFja();
        console.log(automobili);
        setRows(automobili)
      } catch (err) {
        console.log(err);
      } finally {
        console.log(false);
      }
    }
    fetchAutomobili();
   },[a]);
  
    console.log("AUTOOOO"+Auto)
    debugger
    return (
      <div> <Naslov  tekst={"Najpopularnije"} klasa={"NaslovObican"}/>
        <div className="najpopularnije" style={{ backgroundColor: Tema.palette.common.white }}>
       
                    {Auto && Auto.map((element,index) => (
            <KartaPopularno key={element.id} broj={index+1} model={element.model} />
            ))}
        </div>
        </div>
        
    );

}
export default Najpopularnije