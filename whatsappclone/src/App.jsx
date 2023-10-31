import './App.css'
import { FaPeopleCarry, FaSearch } from "react-icons/fa"
import { BiSolidMessageDetail } from "react-icons/bi"
import { IoMdPeople } from "react-icons/io"
import { BsThreeDotsVertical, BsFillEmojiLaughingFill, BsFillMicFill } from "react-icons/bs"
import { FaSortAlphaDown } from "react-icons/fa"
import { contactdetail } from './assets/data'
import { AiOutlineDown, AiOutlineCheck } from "react-icons/ai"
import { GrAdd } from "react-icons/gr"
import { createContext, useContext, useState } from 'react'
import { chatdata } from './assets/data'


const Chatdata = createContext(null);
function App() {
  const [chat, setchat] = useState(null);
  return (
    <div className='App flex justify-center items-center w-screen h-screen bg-white'>
      <Chatdata.Provider value={{ chat, setchat }}>
        <main className="main  bg-white " style={{ padding: "1%", height: "100%", width: "100%" }}>
          <Contact />
          <Chats />
        </main>
      </Chatdata.Provider>
    </div>
  )
}
export default App
function Reuseablebtn(e) {
  return (
    <div id={e.value.id} className='btnofoption z-30 p-1'>
      <button>Acheve chat</button>
      <button>Mute</button>
      <button>Exit Group</button>
      <button>Pin chat</button>
      <button>mark as unread</button>
    </div>
  )
}

// function ContactInsfo(){
//   return(
//     <section style={{maxWidth:"25%",height:"100%"}}>
//       <div className=' w-full h-full border-solid border-red-700 '>
//         kfnskl
//       </div>
//     </section>
//   )

// }



function Contact() {
  const chatin = useContext(Chatdata);
  const { chat, setchat } = chatin;
  const [input, setinput] = useState(contactdetail);
  function handelclickbtn(prop) {
    console.log("clicked")
    options(prop)
  }
  function hendelclickdiv(prop) {
    setchat(prop)
  }
  function options(prop) {
    const btn = document.getElementById(prop)
    btn.classList.toggle("active");
  }
  let x = []
  function search(e) {
    if (e == "" || e == " " || e == null || e == undefined) {
      setinput(contactdetail)
    }
    else {
      x = contactdetail.filter(z => {
        if (z.phonenon.includes(e)) {
          return z
        }
      })
      setinput(x)
    }
  }
  return (
    <section id="contact" className=' w-1/3 h-full border-2 border-solid relative float-left '>
      <div className='nav w-full h-1/6 bg-green-400'>
        <div className="uppper p-2 flex  justify-between bg-green-700 w-full h-1/2 items-center"><img src='#' style={{ borderRadius: "50%" }} /><div className=' iconsnav flex justify-evenly items-center ' ><FaPeopleCarry style={{ width: "3vw", height: "1vw" }} /><BiSolidMessageDetail style={{ width: "3vw", height: "1vw" }} /><IoMdPeople style={{ width: "3vw", height: "1vw" }} /><button><BsThreeDotsVertical style={{ width: "3vw", height: "1vw" }} /></button></div></div>
        <div className="down h-1/2 w-full flex justify-evenly items-center"><div className=' w-11/12 h-2/3 rounded-xl bg-current flex justify-start items-center'><FaSearch style={{ width: "2.5vw", marginRight: "2%", color: "black" }} /><input type='text' onChange={(e) => { search(e.target.value) }} placeholder='Search' className=' text-black bg-transparent border-none outline-none w-full h-full text-xl'></input></div><FaSortAlphaDown /></div>
      </div>
      <div className='contactpge overflow-y-scroll h-5/6' style={{ scrollbarWidth: "thin" }}>
        {input.map(e => {
          return (
            <><div onClick={() => { hendelclickdiv(e) }} className="contcontainer relative flex  justify-start cursor-pointer items-center text-black w-full" style={{ height: "12%", border: "2px solid", borderImage: "linear-gradient(to left,#000 82%,transparent 18%) 100% 1" }} key={e.id}>
              <img src={e.profile} style={{ width: "15%", maxWidth: "70px", height: "70%", maxHeight: "70px", marginLeft: "5%", borderRadius: "50%" }} />
              <h2 className=' ml-4 w-full'><span className=' text-black text-2xl font-medium'>{e.phonenon}<p className=' text-base font-light'>{e.des}</p></span></h2>
              <h5 className=' absolute bottom-1/2 right-3 '>{e.time}</h5>
              <div className='buttonforcont' onClick={() => { handelclickbtn(e.id) }}><AiOutlineDown style={{ width: "30px", height: "30px" }} />
              </div>
              <Reuseablebtn value={e} />
            </div>
            </>)
        })}
      </div>
    </section>
  )
}
function Chats() {
  const chatin = useContext(Chatdata)
  const { chat, setchat } = chatin;
  function ChatSR(prop) {
    const color = prop.value.seen == "seen" ? "#0000ff" : "#fff";
    if (prop.value.send == "send") {
      return (
        <div className='w-full min-h-max border-2 mb-6 flex items-end flex-col border-solid border-transparent'>
          <div className=' p-2 w-1/6 bg-green-800 rounded-xl'>
            <div className='relative p-1'>
              <p style={{ color: '#fff' }}>{prop.value.data}</p>
              <div><span className=' absolute bottom-0 right-0 opacity-70 text-xs flex items-center '>{prop.value.time}<AiOutlineCheck className=' ml-1' color={color} /><AiOutlineCheck color={color} /></span></div>
            </div>
          </div>
        </div>
      )
    }
    else if (prop.value.send == "receve") {
      return (
        <div className='w-full min-h-max border-2 mb-6 flex flex-col border-solid border-transparent'>
          <div className=' p-2 w-1/6 bg-green-800 rounded-xl'>
            <div className=' relative p-1'>
              <p style={{ color: '#fff' }}>{prop.value.data}</p>
              <span className=' absolute bottom-0 right-0 opacity-70 text-xs'>{prop.value.time}</span>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <section id="contact" className='border-2 border-solid border-transparent float-right' style={{ maxWidth: "66.6%", height: "100%" }}>
      {chat ?
        <div className='chatmain relative w-full h-full justify-evenly'>
          <div className='chattop relative flex w-full bg-orange-400 items-center' style={{ height: "8.3333335%" }}>
            <img src={chat.profile} style={{ width: "6%", maxWidth: "70px", height: "70%", maxHeight: "70px", marginLeft: "2%", marginRight: "1%", borderRadius: "50%" }} />
            <h1 >{chat.phonenon}</h1>
            <div className=' flex justify-evenly items-center absolute top-0 right-0 h-full w-1/6'>
              <button><FaSearch /></button>
              <button><BsThreeDotsVertical /></button>
            </div>
          </div>
          <div className='chatbottom flex w-full bg-green-500 justify-evenly items-center absolute left-0 bottom-0' style={{ height: "8.3333335%" }}>
            <button><BsFillEmojiLaughingFill /></button>
            <button><GrAdd /></button>
            <div className=' h-3/4 w-4/5 pl-3 rounded-xl  bg-green-900'><input type="text" className=" w-full h-full bg-transparent outline-none border-none" placeholder='Type a message' /></div>
            <button><BsFillMicFill /></button>
          </div>
          <div className='chats h-5/6 w-full flex flex-col-reverse   items-end bg-purple-600 overflow-y-scroll' style={{ scrollbarWidth: "thin", padding: "3%" }}>
            {chatdata.map(e => {
              if (e.id == chat.id) {
                return (
                  <ChatSR key={e.chatid} value={e} />
                );
              }
            })}
          </div>
        </div> :
        <div className=' flex justify-center items-center h-full font-medium text-2xl text-red-600'>hello want to start chat click here</div>
      }
      <div className=' w-1/2 h-full bg-red-700 '>
        
      </div>
    </section>
  )
}