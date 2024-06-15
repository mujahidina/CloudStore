// import { useEffect, useState } from "react";
// import { IoMdSend } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";


// const Chat = ({ setOpenedChatTab, socket }) => {
//   const [chat, setChat] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("messageResponse", (data) => {
//       setChat((prevChats) => [...prevChats, data]);
//     });

//     return () => {
//       socket.off("messageResponse");
//     };
//   }, [socket]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       setChat((prevChats) => [...prevChats, { message, name: "You" }]);
//       socket.emit("message", { message });
//       setMessage("");
//     }
//   };

//   return (
//     <div className="fixed top-0 right-0 h-full w-80 bg-dark text-white z-50 shadow-lg flex flex-col p-4  backdrop-filter backdrop-blur">
//       <button
//         type="button"
//         onClick={() => setOpenedChatTab(false)}
//         className="btn btn-light mb-4 self-end bg-red-500 rounded-full p-1">
//         <IoMdClose />
//       </button>
//       <div className="chat-messages flex-grow overflow-y-auto mb-4 text-black">
//         {chat.map((msg, index) => (
//           <p key={index} className="mb-2">
//             <strong>{msg.name}: </strong>{msg.message}
//           </p>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="flex items-center">
//         <input
//           type="text"
//           placeholder="Enter message"
//           className="flex-grow p-2 border border-gray-300 rounded-md mr-2 text-black"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded-full p-auto">
//         <IoMdSend />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;






import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Chat = ({ setOpenedChatTab, socket, username }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [micOn, setMicOn] = useState(false); // default to off
  const [profile, setProfile] = useState(null);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChats) => [...prevChats, data]);
    });

    return () => {
      socket.off("messageResponse");
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChats) => [...prevChats, { message, name: "You" }]);
      socket.emit("message", { message });
      setMessage("");
    }
  };

  const handleMicClick = () => {
    setMicOn(!micOn);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
        console.log('this is my id', userId)
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-dark text-white z-50 shadow-lg flex flex-col p-4 backdrop-filter backdrop-blur">
      <button
        type="button"
        onClick={() => setOpenedChatTab(false)}
        className="btn btn-light mb-4 self-end bg-red-500 rounded-full p-1"
      >
        <IoMdClose />
      </button>
      <div className="chat-messages flex-grow overflow-y-auto mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md max-w-xs flex items-start ${
              msg.name === "You" ? "bg-blue-500 text-white self-end ml-20" : "bg-gray-200 text-black self-start mr-20"
            }`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
              {profile && profile.image_url ? (
                <img src={profile.image_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <CgProfile className="w-full h-full text-gray-400" />
              )}
            </div>
            <div>
              <strong>{msg.name}: </strong>{msg.message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Enter message"
          className="flex-grow p-2 border border-gray-300 rounded-md mr-2 text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-full p-auto">
          <IoMdSend />
        </button>
        <button
          type="button"
          onClick={handleMicClick}
          className="p-2 bg-green-500 text-white rounded-full ml-2"
        >
          {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
      </form>
    </div>
  );
};

export default Chat;
