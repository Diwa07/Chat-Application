import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import img from "../../images/avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import { logoutResetDetails } from '../../redux/actions/userAction';
import axios from "axios";
import io from 'socket.io-client';
// const socket = io();different domain vayekole talako line use gareko
const socket = io("http://localhost:3005");
function UserDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState([])
  const [show, setshow] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const { name,email ,_id,address} = useSelector(state => state.user)
  
 
  const fetchUser = () => {


    axios.get("http://localhost:3005/register").then((response) => {

      setUserDetails(response.data.userDetails)
    });
  }
  const  triggerMessageSend =async()=>{
    await axios.post("http://localhost:3005/message",{senderId:_id,receiverId:selectedUserDetails,message:message})
    
    // console.log(_id,selectedUserDetails,message)
 

  }
  useEffect(() => {
    fetchUser();
    socket.on('connect', () => {
    });
  }, [])
  const triggerLogout = () => {
    dispatch(logoutResetDetails())
    navigate('/')
  
  }

  return (
    <div className='user_screen' >
      <div className='user_nav'>
        <h2>   Hi {name} welcome to home</h2>

        <button className="button_logout" onClick={() => triggerLogout()}>Logout</button>
      </div>
      <div className='user_body'>
        <div className='user_left'>
          <h2>list of friend</h2>
          <div className='user_left_box'>
            {userDetails.length > 0 ? userDetails.map((item, id) => {
              return <li className='name_list' onClick={() =>  {setSelectedUserDetails(item); setshow(!false)}}><span className='profile'>
                <img src={img} alt="Logo" />
              </span>
                {item.name}
              </li>
            }) : null
            }
          </div>

        </div>
        <div className='user_mid'>
          {
            show ? 
            <div className='message_box'>
              <div className='message_head'>
  
                <div className='head_body'>
  
                  <div className='message_profile'>
                    <img src={img} alt="Logo" /> 
                  </div>
                  {selectedUserDetails.name}  
                  <button  className='close' onClick={()=>setshow(!show)}>close</button>
  
                </div>
           <div className='message_body'> 

           <div className='message_left'> 
                <div className='profile'> <img src={img} alt="Logo" /> </div>
            <div className='other'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse porro expedita, nostrum voluptatum temporibus, consequuntur animi eum magnam suscipit officiis error natus, iusto exercitationem soluta est molestias nam illum? Voluptatum! hello Lorem ipsum dolor sit amet consectetur 
           adipisicing elit. Necessitatibus ab earum fuga, illo laudantium exercitationem dolorum perferendis totam sunt 
           recusandae ipsa inventore! Doloribus sequi soluta ea perferendis inventore aliquam dicta.
             </div>
         
                  </div>
                  <div className='message_right'>
                  
                  <div className='me'>   hi Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente beatae ipsa aspernatur consectetur quisquam illo. Molestias quas harum incidunt praesentium natus? Delectus, nisi libero corporis eius illum sequi ad deserunt. his  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo corrupti error 
                  qui obcaecati sapiente at ut excepturi quos! Sunt veniam, 
                  ipsum assumenda nam voluptas dignissimos totam eius dolores ea soluta! </div> 
                  <div className='profile'> <img src={img} alt="Logo" /> </div>
                  </div> 


                  <div className='message_left'> 
                <div className='profile'> <img src={img} alt="Logo" /> </div>
            <div className='other'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse porro expedita, nostrum voluptatum temporibus, consequuntur animi eum magnam suscipit officiis error natus, iusto exercitationem soluta est molestias nam illum? Voluptatum! hello Lorem ipsum dolor sit amet consectetur 
           adipisicing elit. Necessitatibus ab earum fuga, illo laudantium exercitationem dolorum perferendis totam sunt 
           recusandae ipsa inventore! Doloribus sequi soluta ea perferendis inventore aliquam dicta.
             </div>
         
                  </div>
                 

                 
  
  
  
                </div>
                <div className='message_footer'>
  
                  <input onKeyUp={(e)=>setMessage(e.target.value)} placeholder='write something' onKeyPress={(event)=>{
                    event.key === "Enter"&& triggerMessageSend();
                  }} className='input' />
                  <button onClick={()=> triggerMessageSend() } className='button_logout'>  Send &#9658;</button>
  
                </div>
  
              </div>
  
            </div>
            :null
           }


        </div>
        <div className='user_right'>
          <div className='user_right_box'>


            <div className='profile_circle'><img src={img} alt="Logo" />
            </div>
            Name:
            <h2>  {name}</h2>
            Email:
            <h4>  {email}</h4>
            <h4>  {address}</h4>
         

          </div>

        </div>

      </div>

    </div>
  )
}

export default UserDashboard
