// import React, { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import Canvas from "./Canvas";
// import { IoIosUndo } from "react-icons/io";
// import {IoIosRedo} from 'react-icons/io';
// import { IoArrowBackSharp } from "react-icons/io5";
// import { FaMicrophone } from "react-icons/fa6";
// import { RxExit } from "react-icons/rx";




// const Room = ({ userNo, socket, setUsers, setUserNo, users }) => {
//   const sideBarRef = useRef(null);

//   const openSideBar = () => {
//     sideBarRef.current.style.left = 0;
//   };
//   const closeSideBar = () => {
//     sideBarRef.current.style.left = "-100%";
//   };


//   const canvasRef = useRef(null);
//   const ctx = useRef(null);
//   const [color, setColor] = useState("#000000");
//   const [elements, setElements] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [tool, setTool] = useState("pencil");
//   const [openedChatTab, setOpenedChatTab] = useState(false);


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

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.fillStyle = "white";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     setElements([]);
//   };

//   const undo = () => {
//     setHistory((prevHistory) => [
//       ...prevHistory,
//       elements[elements.length - 1],
//     ]);
//     setElements((prevElements) =>
//       prevElements.filter((ele, index) => index !== elements.length - 1)
//     );
//   };
//   const redo = () => {
//     setElements((prevElements) => [
//       ...prevElements,
//       history[history.length - 1],
//     ]);
//     setHistory((prevHistory) =>
//       prevHistory.filter((ele, index) => index !== history.length - 1)
//     );
//   };

//   const disconnectUser = () => {
//     socket.disconnect();
  
//     window.location.href = "/room"; 
//   };

//   return (
//     <div className=" relative container mx-auto p-4 bg-slate-100 ">
//        <div
//         className="absolute text-black font-mono top-0 pt-2 h-full bg-slate-300 transition-transform duration-300 ml-22 flex flex-col"
//         ref={sideBarRef}
//           style={{
//              width: "150px",
//              left: "-100%",
//               zIndex: "9999",
//             }}
//           >
//          <button
//           className="w-8 ml-12 mt-6 p-auto rounded-full bg-white text-gray-800 py-2 shadow-3xl"
//           onClick={closeSideBar}
//          >
//       <IoArrowBackSharp className="ml-2" />
//         </button>
//          <div className="w-full mt-5 flex-grow">
//            {users.map((usr, index) => (
//             <p key={index} className="text-black text-center py-2">
//               {usr.id === socket.id && " - (You)"}
//              {usr.username}
//               </p>
//            ))}
//           </div>
//        </div>
       
//        {openedChatTab && (
//           <Chat  setOpenedChatTab={setOpenedChatTab} socket={socket} />
//       )}
   
//       <div className="text-center mb-4 flex">
//         <h1 className="text-3xl  my-4 tracking-wider font-serif bg-white w-2/5  p-3 mx-auto rounded-2xl shadow-md mr-3">
//           CloudStore  Rooms  
//         </h1>

//         <h3 onClick={openSideBar} className="font-mono bg-white w-36  p-2 h-8 mt-4 text-sm mx-auto rounded-md  shadow-md">users online: {userNo}</h3>
//         <div className=" bg-white flex flex-col p-4 space-y-8 rounded-lg shadow-2xl">
//         <button className="mic"><FaMicrophone size={20}/> </button>
//         <button onClick={disconnectUser} className="exit"> <RxExit size={20}/></button>
//         </div>
//         <button onClick={setOpenedChatTab} className="mb-20 text-sm mx-auto h-8 hover:bg-blue-300 hover:text-black tracking-wider bg-blue-500 text-white py-2 w-28 px-auto rounded-lg">Chats</button>

//       </div>
//       <div className="flex justify-center items-center text-center mb-4 bg-white w-3/5 p-4 mx-auto rounded-xl shadow-2xl">
//         <div className="mx-2">
//           <div className="flex items-center justify-center">
//             Color Picker:&nbsp;
//             <input
//               type="color"
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="mx-2">
//           <div className="inline-block mx-1">
//             <input
//               className="mr-1"
//               type="radio"
//               name="tools"
//               id="pencil"
//               value="pencil"
//               checked={tool === "pencil"}
//               onClick={(e) => setTool(e.target.value)}
//               readOnly
//             />
//             <label className='font-light' htmlFor="pencil">Pencil</label>
//           </div>
//           <div className="inline-block mx-1">
//             <input
//               className="mr-1"
//               type="radio"
//               name="tools"
//               id="line"
//               value="line"
//               checked={tool === "line"}
//               onClick={(e) => setTool(e.target.value)}
//               readOnly
//             />
//             <label className="font-light" htmlFor="line">Line</label>
//           </div>
//           <div className="inline-block mx-1">
//             <input
//               className="mr-1"
//               type="radio"
//               name="tools"
//               id="rect"
//               value="rect"
//               checked={tool === "rect"}
//               onClick={(e) => setTool(e.target.value)}
//               readOnly
//             />
//             <label  className='font-light' htmlFor="rect">Rectangle</label>
//           </div>
//         </div>

//         <div className="mx-2">
//           <button
//             type="button"
//             className="btn btn-outline-primary p-1 rounded-full border border-slate-500"
//             disabled={elements.length === 0}
//             onClick={() => undo()}
//           >
//             <IoIosUndo />
//           </button>
//           &nbsp;&nbsp;
//           <button
//             type="button"
//             className="btn btn-outline-primary ml-1  p-1 rounded-full border border-slate-500"
//             disabled={history.length < 1}
//             onClick={() => redo()}
//           >
//             <IoIosRedo />
//           </button>
//         </div>
//         <div className="mx-2">
//           <div className="flex items-center justify-center">
//             <input
//               type="button"
//               className=" bg-red-600 text-white w-32 p-1 rounded-md hover:bg-red-400"
//               value="Clear Canvas"
//               onClick={clearCanvas}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <Canvas canvasRef={canvasRef} ctx={ctx} color={color} setElements={setElements} elements={elements} tool={tool} socket={socket}/>
//       </div>
//     </div>
//   );
// };

// export default Room;











import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import Chat from "./Chat";

const Room = ({ userNo, socket, setUsers, setUserNo, users }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    sideBarRef.current.style.left = 0;
  };
  const closeSideBar = () => {
    sideBarRef.current.style.left = "-100%";
  };

  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");
  const [openedChatTab, setOpenedChatTab] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, [socket]);
  
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, [socket, setUsers, setUserNo]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };
  
  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  const disconnectUser = () => {
    socket.disconnect();
    window.location.href = "/room";
  };

  return (
    <div className="relative container mx-auto p-4 bg-slate-100">
      <div
        className="absolute text-black font-mono top-0 pt-2 h-full backdrop-filter backdrop-blur border transition-transform duration-300 ml-22 flex flex-col"
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          zIndex: "9999",
        }}
      >
        <button
          className="w-8 ml-12 mt-6 p-auto rounded-full bg-white text-gray-800 py-2 shadow-3xl"
          onClick={closeSideBar}
        >
          <IoArrowBackSharp className="ml-2" />
        </button>
        <div className="w-full mt-5 flex-grow">
          {users.map((usr, index) => (
            <p key={index} className="text-black text-center py-2">
              {usr.id === socket.id && " - (You)"}
              {usr.username}
            </p>
          ))}
        </div>
      </div>
      
      {openedChatTab && (
        <Chat setOpenedChatTab={setOpenedChatTab} socket={socket}/>
      )}

      <div className="text-center mb-4 flex">
        <h1 className="text-3xl my-4 tracking-wider font-serif bg-white w-2/5 p-3 mx-auto rounded-2xl shadow-md mr-3">
          CloudStore Rooms
        </h1>

        <h3 onClick={openSideBar} className="font-mono bg-white w-36 p-2 h-8 mt-4 text-sm mx-auto rounded-md shadow-md">
          users online: {userNo}
        </h3>
        <div className="bg-white flex flex-col p-4 space-y-8 rounded-lg shadow-2xl">
          <button className="mic"><FaMicrophone size={20} /></button>
          <button onClick={disconnectUser} className="exit"><RxExit size={20} /></button>
        </div>
        <button 
          onClick={() => setOpenedChatTab(prev => !prev)} 
          className="mb-20 text-sm mx-auto h-8 hover:bg-blue-300 hover:text-black tracking-wider bg-blue-500 text-white py-2 w-28 px-auto rounded-lg">
          Chats
        </button>
      </div>
      <div className="flex justify-center items-center text-center mb-4 bg-white w-3/5 p-4 mx-auto rounded-xl shadow-2xl">
        <div className="mx-2">
          <div className="flex items-center justify-center">
            Color Picker:&nbsp;
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-2">
          <div className="inline-block mx-1">
            <input
              className="mr-1"
              type="radio"
              name="tools"
              id="pencil"
              value="pencil"
              checked={tool === "pencil"}
              onClick={(e) => setTool(e.target.value)}
              readOnly
            />
            <label className='font-light' htmlFor="pencil">Pencil</label>
          </div>
          <div className="inline-block mx-1">
            <input
              className="mr-1"
              type="radio"
              name="tools"
              id="line"
              value="line"
              checked={tool === "line"}
              onClick={(e) => setTool(e.target.value)}
              readOnly
            />
            <label className="font-light" htmlFor="line">Line</label>
          </div>
          <div className="inline-block mx-1">
            <input
              className="mr-1"
              type="radio"
              name="tools"
              id="rect"
              value="rect"
              checked={tool === "rect"}
              onClick={(e) => setTool(e.target.value)}
              readOnly
            />
            <label className='font-light' htmlFor="rect">Rectangle</label>
          </div>
        </div>

        <div className="mx-2">
          <button
            type="button"
            className="btn btn-outline-primary p-1 rounded-full border border-slate-500"
            disabled={elements.length === 0}
            onClick={undo}
          >
            <IoIosUndo />
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-outline-primary ml-1 p-1 rounded-full border border-slate-500"
            disabled={history.length < 1}
            onClick={redo}
          >
            <IoIosRedo />
          </button>
        </div>
        <div className="mx-2">
          <div className="flex items-center justify-center">
            <input
              type="button"
              className="bg-red-600 text-white w-32 p-1 rounded-md hover:bg-red-400"
              value="Clear Canvas"
              onClick={clearCanvas}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;
