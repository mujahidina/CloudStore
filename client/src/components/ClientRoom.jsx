// import React, { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { FaMicrophone } from "react-icons/fa6";
// import { RxExit } from "react-icons/rx";



// const ClientRoom = ({ userNo, socket, setUsers, setUserNo, users }) => {
//   const imgRef = useRef(null);
//   const sideBarRef = useRef(null);

//   const openSideBar = () => {
//     sideBarRef.current.style.left = 0;
//   };
//   const closeSideBar = () => {
//     sideBarRef.current.style.left = "-100%";
//   };


//   useEffect(() => {
//     socket.on("message", (data) => {
//       toast.info(data.message);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("users", (data) => {
//       setUsers(data);
//       setUserNo(data.length);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("canvasImage", (data) => {
//       imgRef.current.src = data;
//     });
//   }, []);

//   const disconnectUser = () => {
//     socket.disconnect();
  
//     window.location.href = "/room"; 
//   };

//   return (
//     <div className="relative container mx-auto px-4 bg-slate-100 rounded-md">
//                  <div
//         className=" absolute text-black font-mono top-0 pt-2 h-full bg-slate-300 transition-transform duration-300 ml-22 "
//         ref={sideBarRef}
//         style={{
//           width: "150px",
//           left: "-100%",
//           zIndex: "9999",
//         }}
//       >
//         <button
//           className="w-8 ml-12  mt-6 p-auto rounded-full shadow-2xl bg-white text-gray-800 py-2 "
//           onClick={closeSideBar}
//         >
//         <IoArrowBackSharp  className="ml-2"/>
//         </button>
//         <div className="w-full mt-5">
//           {users.map((usr, index) => (
//             <p key={index} className="text-black text-center py-2">
//               {usr.id === socket.id && " - (You)"}
//               {usr.username}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="text-center py-2 flex">
//         <h1 onClick={openSideBar} className="  pt-4 pb-3 font-mono bg-white w-36 mx-auto p-2 rounded-2xl shadow-md">
//           users online: {userNo}
//         </h1>
//         <div className=" bg-white flex flex-col p-4 space-y-8 rounded-lg shadow-2xl">
//         <button className="mic"><FaMicrophone size={20}/> </button>
//         <button onClick={disconnectUser} className="exit"> <RxExit size={20}/></button>
//         </div>
//       </div>
//       <div className="flex justify-center mt-5">
//         <div className="overflow-hidden rounded-2xl shadow-2xl mt-3   lg:w-1/2" style={{ height:"600px"}}>
//           <img className="w-full h-full object-contain bg-white " ref={imgRef} src=""  alt='canvas'/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientRoom;




// ClientRoom.js
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import Chat from "./Chat"; // Importing the Chat component

const ClientRoom = ({ userNo, socket, setUsers, setUserNo, users }) => {
  const imgRef = useRef(null);
  const sideBarRef = useRef(null);
  const [openedChatTab, setOpenedChatTab] = useState(false); // State to manage chat visibility

  const openSideBar = () => {
    sideBarRef.current.style.left = 0;
  };
  const closeSideBar = () => {
    sideBarRef.current.style.left = "-100%";
  };

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);

  const disconnectUser = () => {
    socket.disconnect();
    window.location.href = "/room"; 
  };

  return (
    <div className="relative container mx-auto px-4 bg-slate-100 rounded-md">
      <div
        className="absolute text-black font-mono top-0 pt-2 h-full bg-slate-300 transition-transform duration-300 ml-22 "
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          zIndex: "9999",
        }}
      >
        <button
          className="w-8 ml-12  mt-6 p-auto rounded-full shadow-2xl bg-white text-gray-800 py-2 "
          onClick={closeSideBar}
        >
          <IoArrowBackSharp  className="ml-2"/>
        </button>
        <div className="w-full mt-5">
          {users.map((usr, index) => (
            <p key={index} className="text-black text-center py-2">
              {usr.id === socket.id && " - (You)"}
              {usr.username}
            </p>
          ))}
        </div>
      </div>
      
      {/* Conditionally render Chat component */}
      {openedChatTab && <Chat setOpenedChatTab={setOpenedChatTab} socket={socket} />}
      
      <div className="text-center py-2 flex">
        <h1 onClick={openSideBar} className="  pt-4 pb-3 font-mono bg-white w-36 mx-auto p-2 rounded-2xl shadow-md">
          users online: {userNo}
        </h1>
        <div className=" bg-white flex flex-col p-4 space-y-8 rounded-lg shadow-2xl">
          <button className="mic"><FaMicrophone size={20}/> </button>
          <button onClick={disconnectUser} className="exit"> <RxExit size={20}/></button>
        </div>
        {/* Button to toggle Chat component visibility */}
        <button onClick={() => setOpenedChatTab(!openedChatTab)} className="mb-20 text-sm mx-auto h-8 hover:bg-blue-300 hover:text-black tracking-wider bg-blue-500 text-white py-2 w-28 px-auto rounded-lg">
          Chats
        </button>
      </div>
      <div className="flex justify-center mt-5">
        <div className="overflow-hidden rounded-2xl shadow-2xl mt-3 lg:w-1/2" style={{ height:"600px"}}>
          <img className="w-full h-full object-contain bg-white " ref={imgRef} src=""  alt='canvas'/>
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
