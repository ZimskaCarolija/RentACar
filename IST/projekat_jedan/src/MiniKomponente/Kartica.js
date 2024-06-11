import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

function Kartica() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["+10%", "-500%"]);

  return (
    <div ref={ref} className="HorizontalniKontejner">
      <div className="Kartice" >
        <motion.div style={{ x }}
          className="Karta " 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.7, delay: 0.3 } }}
        >
          <div>
          <img src="../izbor.jpg" alt="Veliki Izbor" />
          <div>Veliki Izbor</div>
          </div>
        </motion.div>
        <motion.div style={{ x }}
          className="Karta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.7, delay: 0.3 } }}
        >
          <img src="../online.jpg" alt="Sve Online" />
          <div>Sve Online</div>
        </motion.div>
        <motion.div style={{ x }}
          className="Karta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.7, delay: 0.3 } }}
        >
          <img src="../24h.jpg" alt="24h Dostupno" />
          <div>24h Dostupno</div>
        </motion.div>
      </div>
    </div>
  );
}

export default Kartica;
