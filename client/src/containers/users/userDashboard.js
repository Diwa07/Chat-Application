import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import img from "../../images/avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import { logoutResetDetails } from '../../redux/actions/userAction';
import axios from "axios";
function UserDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState([])
  const [show, setshow] = useState(false)
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const { name } = useSelector(state => state.user)

 
  const fetchUser = () => {


    axios.get("http://localhost:3005/register").then((response) => {

      setUserDetails(response.data.userDetails)
    });
  }
  useEffect(() => {
    fetchUser()
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
                  
                  <div className='me'>    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente beatae ipsa aspernatur consectetur quisquam illo. Molestias quas harum incidunt praesentium natus? Delectus, nisi libero corporis eius illum sequi ad deserunt. his  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo corrupti error 
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
  
                  <input placeholder='write something' className='input' />
                  <button className='button_logout'>Send</button>
  
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

          </div>

        </div>

      </div>

    </div>
  )
}

export default UserDashboard
