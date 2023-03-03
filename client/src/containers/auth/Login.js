import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import {addUserDetails} from "../../redux/actions/userAction"
import {useDispatch,} from "react-redux";
const usersSchema = Yup.object().shape({
    email: Yup.string()
        .email(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />),


    password: Yup.string()
        // .required("Required field")
        .oneOf([Yup.ref('password'), null])
        .required("")
        .matches(/[a-z]/, "Atleast one small letter")
        .oneOf([Yup.ref('password'), null])
        .matches(/[A-Z]/, "Atleast one capital letter")
        .matches(/[0-9]/, 'Atleast  one number')
        .min(8, 'Should be 8 chars minimum.'),
});
const Login = () => {
    const dispatch= useDispatch();
    const navigate = useNavigate();
    return (
        

<div className='login_screen'>

        
        <div className='login_leftbox'>

        </div>
        <div className='login_rightbox'>
           <div className='login_box'>
           <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={usersSchema}
                    onSubmit={async (values, { resetForm }) => {
                        const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values),

                        };
                        const res = await fetch("http://localhost:3005/login", requestOptions);
                        const data = await res.json()
                        if (res.status === 200) {
                            // alert(JSON.stringify(data.userList))
                            dispatch(addUserDetails(data.userList))
                           // navigate("/home");role/ email anusar automatic navigate hunxa
                        } else {
                            alert(data.errorMsg)
                        }
                        console.log(values);
                        // resetForm({ values: '' })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='form'>
                             <br/>
                            <label>Email :  </label>
                            <br/>
                            <Field  name="email" type="email" placeholder="Enter Email Address" className ="field" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <br/> <br/>
                            <label>Password:</label>
                            <br/>
                            <Field name="password" type="password" placeholder="Enter Password" className ="field"  />
                            <FontAwesomeIcon icon={faEyeSlash} className='icon_eye_slash' />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <br/><br/>
                            <Link to="/forget_password" className='forget_password'>Forget password</Link>
                            <button type="submit" className='login_buttom'>Login</button>
                        </Form>
                    )}
                </Formik>
                <Link to="/register" className='create'>New member? Register here.</Link>

           </div>
        </div>
       
   </div>


      



    );
}
export default Login;