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
        className="fixed inset-0 origin-top bg-blue-600 z-50"
        style={{ pointerEvents: "none" }}
      />
      {children}
    </>
  );
}
