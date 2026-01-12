// import { motion } from "framer-motion";


// export default function Curtain({ children }) {
// return (
// <>
// <motion.div
// initial={{ scaleY: 1 }}
// animate={{ scaleY: 0 }}
// transition={{ duration: 1.2, ease: "easeInOut" }}
// className="fixed inset-0 origin-top bg-blue-600 z-50"
// />
// {children}
// </>
// );
// }

import { motion } from "framer-motion";

export default function Curtain({ children }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 origin-top z-50"
        style={{ 
          pointerEvents: "none",
          background: "linear-gradient(180deg, #4F32AA 0%, #7B5CBF 50%, #B153D7 100%)",
        }}
      />
      {children}
    </>
  );
}
