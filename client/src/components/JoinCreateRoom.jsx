// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { toast } from "react-toastify";

// const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
//   const [roomId, setRoomId] = useState(uuid());
//   const [name, setName] = useState("");
//   const [joinName, setJoinName] = useState("");
//   const [joinRoomId, setJoinRoomId] = useState("");

//   const handleCreateSubmit = (e) => {
//     e.preventDefault();
//     if (!name) return toast.dark("Please enter your name!");

//     setUser({
//       roomId,
//       userId: uuid(),
//       userName: name,
//       host: true,
//       presenter: true,
//     });
//     setRoomJoined(true);
//   };

//   const handleJoinSubmit = (e) => {
//     e.preventDefault();
//     if (!joinName) return toast.dark("Please enter your name!");

//     setUser({
//       roomId: joinRoomId,
//       userId: uuid(),
//       userName: joinName,
//       host: false,
//       presenter: false,
//     });
//     setRoomJoined(true);
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="text-center my-12">
//         <h1 className="text-4xl font-semibold">
//           Welcome To Rooms
//         </h1>
//       </div>
//       <div className="flex justify-center mt-12">

//         <div className="w-full md:w-1/2 lg:w-1/3 p-8 border border-gray-300 mx-4 bg">
//           <h1 className="text-center text-blue-600 mb-8 text-2xl">Create Room</h1>
//           <form onSubmit={handleCreateSubmit}>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="form-control block w-full p-2 border border-gray-300 rounded"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
//               <input
//                 type="text"
//                 className="flex-grow bg-transparent focus:outline-none"
//                 value={roomId}
//                 readOnly={true}
//               />
//               <button
//                 className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 rounded"
//                 type="button"
//                 onClick={() => setRoomId(uuid())}
//               >
//                 Generate
//               </button>
//               <CopyToClipboard
//                 text={roomId}
//                 onCopy={() => toast.success("Room Id Copied To Clipboard!")}
//               >
//                 <button
//                   className="ml-2 px-2 py-1 text-sm text-white bg-gray-500 rounded"
//                   type="button"
//                 >
//                   Copy
//                 </button>
//               </CopyToClipboard>
//             </div>
//             <div className="mt-8">
//               <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">
//                 Create Room
//               </button>
//             </div>
//           </form>
//         </div>


//         <div className="w-full md:w-1/2 lg:w-1/3 p-8 border border-gray-300 mx-4">
//           <h1 className="text-center text-blue-600 mb-8 text-2xl">Join Room</h1>
//           <form onSubmit={handleJoinSubmit}>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="form-control block w-full p-2 border border-gray-300 rounded"
//                 value={joinName}
//                 onChange={(e) => setJoinName(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 className="form-control block w-full p-2 border border-gray-300 rounded"
//                 value={joinRoomId}
//                 onChange={(e) => setJoinRoomId(e.target.value)}
//                 placeholder="Room Id"
//               />
//             </div>
//             <div className="mt-8">
//               <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">
//                 Join Room
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinCreateRoom;
















// import React from 'react';
// import man from './public/4801.jpg';

// const JoiCreateRoom = () => {
//   return (
//     <div className='flex flex-col h-full w-full'>
//       <h1 className='ml-12 mt-2 font-bold text-2xl'>CloudStore Rooms</h1>

//       <div className='h-full flex flex-row'>
//         <div className='w-1/2 h-full flex flex-col'>
//           <h1 className='ml-12 mt-24 text-4xl font-normal'>
//             Discover Collaborative Experience
//           </h1>
//           <h1 className='ml-12 mt-3 text-4xl font-normal'>
//             with CloudStore Rooms
//           </h1>
//           <p className='ml-12 text-lg mt-14'>
//             Step into CloudStore Rooms, where creativity and collaboration come to life!
//             Whether you're brainstorming with your team, hosting a virtual workshop,
//             or just hanging out with friends, our feature-rich rooms provide the perfect environment.
//             Enjoy real-time interaction, seamless file sharing, and advanced drawing tools all in one place.
//           </p>
//           <div className='ml-12 mt-8 flex tracking-wider'>
//             <button className='bg-blue-400  text-white p-auto w-44 h-14 rounded-lg'>Create Room</button>
//             <button className='ml-12 bg-blue-100 text-blue-600 p-auto w-44 h-14 rounded-lg'>Join Room</button>
//           </div>
//         </div>

//         <div className='w-1/2 h-full'>
//           <img src={man} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JoiCreateRoom;


import React, { useState } from 'react';
import man from './public/4801.jpg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { IoIosClose } from "react-icons/io";

const JoiCreateRoom = ({uuid, setUser, setRoomJoined}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [openedChatTab, setOpenedChatTab] = useState(false);


  const handleCreateClick = () => {
    setShowCreateForm(true);
    setShowJoinForm(false);
  };

  const handleJoinClick = () => {
    setShowJoinForm(true);
    setShowCreateForm(false);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setShowJoinForm(false);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name)  return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
    setShowCreateForm(false);
  };



  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName || !joinRoomId) {
      return toast.dark("Please enter your name and the room ID!");
    }

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
    setShowJoinForm(false);

  };


  return (
    <div className='flex flex-col h-full w-full'>
      <h1 className='ml-12 mt-2 font-bold text-2xl'>CloudStore Rooms</h1>

      <div className='h-full flex flex-row'>
        <div className='w-1/2 h-full flex flex-col'>
          <h1 className='ml-12 mt-24 text-4xl font-normal'>
            Discover Collaborative Experience
          </h1>
          <h1 className='ml-12 mt-3 text-4xl font-normal'>
            with CloudStore Rooms
          </h1>
          <p className='ml-12 text-lg mt-14'>
            Step into CloudStore Rooms, where creativity and collaboration come to life!
            Whether you're brainstorming with your team, hosting a virtual workshop,
            or just hanging out with friends, our feature-rich rooms provide the perfect environment.
            Enjoy real-time interaction, seamless file sharing, and advanced drawing tools all in one place.
          </p>
          <div className='ml-12 mt-8 flex tracking-wider'>
            <button 
              className='bg-blue-400 text-white p-auto w-44 h-14 rounded-lg' 
              onClick={handleCreateClick}
            >
              Create Room
            </button>
            <button 
              className='ml-12 bg-blue-100 text-blue-600 p-auto w-44 h-14 rounded-lg'
              onClick={handleJoinClick}
            >
              Join Room
            </button>
          </div>
        </div>

        <div className='w-1/2 h-full'>
          <img src={man} alt="" className=''/>
        </div>
      </div>



      {(showCreateForm || showJoinForm) && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm" onClick={handleCloseForm}></div>
          {showCreateForm && (
            <div className="relative w-full md:w-1/2 lg:w-1/3 p-8 border border-gray-300 bg-white mx-4 rounded-2xl">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={handleCloseForm}
              >
                <IoIosClose size={24} />
              </button>
              <h1 className="text-center text-blue-600 mb-8 text-2xl">Create Room</h1>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control block w-full p-2 border border-gray-300 rounded font-mono"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
                  <input
                    type="text"
                    className="flex-grow bg-transparent focus:outline-none"
                    value={roomId}
                    readOnly={true}
                  />
                  <button
                    className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 rounded"
                    type="button"
                    onClick={() => setRoomId(uuid())}
                  >
                    Generate
                  </button>
                  <CopyToClipboard
                    text={roomId}
                    onCopy={() => toast.success("Room Id Copied To Clipboard!")}
                  >
                    <button
                      className="ml-2 px-2 py-1 text-sm text-white bg-gray-500 rounded"
                      type="button"
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
                <div className="mt-8 ">
                  <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">
                    Create Room
                  </button>
                </div>
              </form>
            </div>
          )}


          {showJoinForm && (
            <div className="relative w-full md:w-1/2 lg:w-1/3 p-8 border border-gray-300 bg-white mx-4 rounded-2xl">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={handleCloseForm}
              >
                <IoIosClose size={24} />
              </button>
              <h1 className="text-center text-blue-600 mb-8 text-2xl">Join Room</h1>
              <form onSubmit={handleJoinSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control block w-full p-2 border border-gray-300 rounded"
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control block w-full p-2 border border-gray-300 rounded"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    placeholder="Room Id"
                  />
                </div>
                <div className="mt-8">
                  <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">
                    Join Room
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JoiCreateRoom;
