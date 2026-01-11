// import { Menu, Mic } from "lucide-react";
// import MenuDrawer from "./MenuDrawer";
// import { useState } from "react";


// export default function Header() {
// const [open, setOpen] = useState(false);


// return (
// <header className="relative z-20 w-full flex justify-between items-center px-6 py-5">
// <div className="flex items-center gap-3">
// <div className="w-9 h-9 rounded-full bg-blue-600" />
// <h1 className="text-xl font-bold">SmartRX</h1>
// </div>


// <div className="flex items-center gap-6">
// <Mic className="cursor-pointer" />
// <Menu
//   className="cursor-pointer"
//   onClick={() => {
//     console.log("MENU CLICKED");
//     setOpen(true);
//   }}
// />

// </div>


// <MenuDrawer open={open} setOpen={setOpen} />
// </header>
// );
// }

//--------------------------


/*import { Menu, Mic } from "lucide-react";
import MenuDrawer from "./MenuDrawer";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 w-full flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600" />
          <h1 className="text-xl font-bold">🤖SmartRX</h1>
        </div>

             <div className="flex items-center"
                  style={{ transform: "translateX(-10px)" }}
             >
                  <Mic
                      className="cursor-pointer"
                      style={{ marginRight: "40px" }}
                  />
                  <Menu
                      className="cursor-pointer"
                      onClick={() => {
                          console.log("MENU CLICKED");
                          setOpen(true);
                      }}
                  />
              </div>

          </header>

      <MenuDrawer open={open} setOpen={setOpen} />
    </>
  );
}
*/

// import { Menu, Mic } from "lucide-react";
// import MenuDrawer from "./MenuDrawer";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const navigate = useNavigate();

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported");
//       return;
//     }

//     // Stop previous session if any
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setListening(true);
//       console.log("LISTENING");
//     };


//     recognition.onresult = (event) => {
//        console.log("RECEIVING");
//       const transcript = event.results[0][0].transcript;
//       navigate(`/search/${transcript}`);
//       console.log("RECEIVED");
//     };

//     recognition.onerror = () => {
//       console.log("ERROR!!");
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.start();

//     // Safety timeout
//     setTimeout(() => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//         setListening(false);
//       }
//     }, 8000);
//   };

//   return (
//     <>
//       <header className="relative z-20 w-full flex justify-between items-center px-6 py-5">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-blue-600" />
//           <h1 className="text-xl font-bold">🤖 SmartRX</h1>
//         </div>

//         {/* Right icons */}
//         <div
//           className="flex items-center gap-6"
//           style={{ transform: "translateX(-10px)" }}
//         >
//           {/* WORKING MIC */}
//           <button onClick={startListening}>
//             <Mic
//               className={`w-6 h-6 cursor-pointer ${
//                 listening
//                   ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
//                   : "text-gray-700"
//               }`}
//             />
//           </button>

//           {/* MENU */}
//           <Menu
//             className="w-6 h-6 cursor-pointer"
//             onClick={() => setOpen(true)}
//           />
//         </div>
//       </header>

//       <MenuDrawer open={open} setOpen={setOpen} />
//     </>
//   );
// }


//----------------
// import { Menu, Mic } from "lucide-react";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import MenuDrawer from "./MenuDrawer";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const navigate = useNavigate();

//   const startListening = () => {
//     // Browser support check
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }

//     // Stop any previous recognition
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       console.log("🎙️ LISTENING");
//       setListening(true);
//     };

//     recognition.onresult = (event) => {
//       console.log("📥 RESULT RECEIVED");

//       const transcript = event.results[0][0].transcript.trim();
//       console.log("🗣️ TRANSCRIPT:", transcript);

//       // Stop mic before navigation
//       recognition.stop();
//       setListening(false);

//       // IMPORTANT: encodeURIComponent fixes navigation issue
//       navigate(`/search/${encodeURIComponent(transcript)}`);
//     };

//     recognition.onerror = (event) => {
//       console.error("❌ SPEECH ERROR:", event.error);
//       setListening(false);
//     };

//     recognition.onend = () => {
//       console.log("🛑 LISTENING ENDED");
//       setListening(false);
//     };

//     recognition.start();
//   };

//   return (
//     <>
//       <header className="relative z-20 w-full flex justify-between items-center px-6 py-5 bg-white shadow">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-blue-600" />
//           <h1 className="text-xl font-bold">🤖 SmartRX</h1>
//         </div>

//         {/* Right icons */}
//         <div className="flex items-center gap-6">
//           {/* MIC */}
//           <button onClick={startListening}>
//             <Mic
//               className={`w-6 h-6 cursor-pointer transition ${
//                 listening
//                   ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
//                   : "text-gray-700"
//               }`}
//             />
//           </button>

//           {/* MENU */}
//           <Menu
//             className="w-6 h-6 cursor-pointer"
//             onClick={() => setOpen(true)}
//           />
//         </div>
//       </header>

//       <MenuDrawer open={open} setOpen={setOpen} />
//     </>
//   );
// }




//--------------------main---------------


// import { Menu, Mic } from "lucide-react";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import MenuDrawer from "./MenuDrawer";

// export default function Header({ hideLogo = false }) {
//   const [open, setOpen] = useState(false);
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const navigate = useNavigate();

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }

//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       console.log("🎙️ LISTENING");
//       setListening(true);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.trim();
//       recognition.stop();
//       setListening(false);
//       navigate(`/search/${encodeURIComponent(transcript)}`);
//     };

//     recognition.onerror = () => {
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.start();
//   };

//   return (
//     <>
//       <header className="relative z-20 w-full flex justify-between items-center px-6 py-5 bg-white shadow">
        
//         {/* LEFT: LOGO (conditionally hidden) */}
//         {!hideLogo ? (
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-blue-600" />
//             <h1 className="text-xl font-bold">🤖 SmartRX</h1>
//           </div>
//         ) : (
//           <div /> /* keeps spacing balanced */
//         )}

//         {/* RIGHT ICONS */}
//         <div className="flex items-center gap-6">
//           <button onClick={startListening}>
//             <Mic
//               className={`w-6 h-6 cursor-pointer transition ${
//                 listening
//                   ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
//                   : "text-gray-700"
//               }`}
//             />
//           </button>

//           <Menu
//             className="w-6 h-6 cursor-pointer"
//             onClick={() => setOpen(true)}
//           />
//         </div>
//       </header>

//       <MenuDrawer open={open} setOpen={setOpen} />
//     </>
//   );
// }


import { Menu, Mic, LogOut } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import LogoutModal from "./LogoutModal";
import smartRxLogo from "../assets/logo2.png";
import { logoutUser } from "../services/firebaseAuth";


export default function Header({ hideLogo = false, onLogout }) {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const recognitionRef = useRef(null);
  const hasResultRef = useRef(false);
  const navigate = useNavigate();

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    hasResultRef.current = false;

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎙️ LISTENING");
      setListening(true);
    };

    recognition.onresult = (event) => {
      if (hasResultRef.current) return;

      hasResultRef.current = true;

      const transcript = event.results[0][0].transcript.trim();
      console.log("🗣️ TRANSCRIPT:", transcript);

      setListening(false);

      navigate(`/search/${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = (event) => {
      console.error("❌ SPEECH ERROR:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      console.log("🛑 LISTENING ENDED");
      setListening(false);
    };

    recognition.start();
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
    document.body.style.overflow = "hidden";
  };

  /*const confirmLogout = () => {
    setShowLogoutModal(false);
    document.body.style.overflow = "";
    onLogout && onLogout();
  };*/

  const confirmLogout = async () => {
  setShowLogoutModal(false);
  document.body.style.overflow = "";

  try {
    await logoutUser(); // 🔥 Firebase logout
    onLogout?.(); // ✅ Update app state
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


  const cancelLogout = () => {
    setShowLogoutModal(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <header className="relative z-20 w-full flex justify-between items-center px-6 py-5 bg-white shadow">
        {/* LEFT: LOGO */}
        {!hideLogo ? (
          <div className="flex items-center gap-3">
            <img
              src={smartRxLogo}
              alt="SmartRX"
              className="w-100 h-100 object-contain"
              style={{ maxWidth: 200, maxHeight: 200 }}
            />
          </div>
        ) : (
          <div />
        )}

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6">
          <button onClick={startListening}>
            <Mic
              className={`w-6 h-6 cursor-pointer transition ${
                listening
                  ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
                  : "text-gray-700"
              }`}
            />
          </button>

          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setOpen(true)} />

          <button onClick={handleLogout} title="Logout">
            <LogOut className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500 transition" />
          </button>
        </div>
      </header>

      <MenuDrawer open={open} setOpen={setOpen} />

      <LogoutModal isOpen={showLogoutModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </>
  );
}

