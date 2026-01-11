// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";


// export default function MenuDrawer({ open, setOpen }) {
// if (!open) return null;


// return (
// <motion.div
// initial={{ x: "100%" }}
// animate={{ x: 0 }}
// exit={{ x: "100%" }}
// className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl p-6 z-40"
// >
// <button onClick={() => setOpen(false)} className="mb-6">✕</button>
// <nav className="flex flex-col gap-4">
// <Link to="/">Home</Link>
// <Link to="/login">Login</Link>
// <Link to="/signup">Sign Up</Link>
// </nav>
// </motion.div>
// );
// }



// ----------------This is Main-----------------------


// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function MenuDrawer({ open, setOpen }) {
//   if (!open) return null;

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.3 }}
//       className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl p-6 z-[999]"
//     >
//       <button
//         onClick={() => setOpen(false)}
//         className="mb-6 text-xl"
//       >
//         ✕
//       </button>

//       <nav className="flex flex-col gap-4 text-lg">
//         <Link to="/" onClick={() => setOpen(false)}>Home</Link>
//         <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
//         <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
//       </nav>
//     </motion.div>
//   );
// }


//---------Final --------

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MenuDrawer({ open, setOpen }) {
  if (!open) return null;

    return (
        <>
            {/* FULL SCREEN OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(6px)",
                    zIndex: 9998,
                    pointerEvents: "auto",
                }}
            />

            {/* CENTER MENU */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
            >
                <div
                    style={{
                        width: "320px",
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                        position: "relative",
                    }}
                >
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "16px",
                            fontSize: "20px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>

                    {/* Menu */}
                    <nav
                        style={{
                            marginTop: "32px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: 600,
                        }}
                    >
                        <a href="/">Home</a>
                        <a href="/login">Login</a>
                        <a href="/signup">Sign Up</a>
                    </nav>
                </div>
            </motion.div>

    </>
  );
}
