import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .min(3, <FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .max(20, 'Too Long!'),

    address: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .min(4, <FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .max(30, 'Too Long!'),

    phoneNumber: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .min(9, <FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .max(10, 'Please enter valid number'),

    email: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .email(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />),

    password: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .oneOf([Yup.ref('password'), null])
        .matches(/[a-z]/, "Atleast one small letter")
        .oneOf([Yup.ref('password'), null])
        .matches(/[A-Z]/, "Atleast one capital letter")
        .matches(/[0-9]/, 'Atleast  one number')
        .min(8, 'Should be 8 chars minimum.'),

    conformPassword: Yup.string()
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .oneOf([Yup.ref('password'), null], <FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)

});
const Register = () => {
    const navigate = useNavigate();
    return (

        <div className='container'>
            <div className='name_create'>Create an account </div>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    conformPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { resetForm }) => {//reset form is a inbuild function
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    };
                    try {
                        const response = await fetch("http://localhost:3005/register", requestOptions)
                        const data = await response.json()

                        if (response.status === 409 && data.error) {
                            alert(data.error)
                        } else if (response.status === 200) {
                            alert(data.msg)
                            navigate("/");
                        }
                        // resetForm({ values: "" }); for blank form
                    } catch (err) {
                        alert(err);
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className='form'>
                        <Field name="name" placeholder="Enter Name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="address" placeholder="Enter Address" />
                        {errors.address && touched.address ? (
                            <div>{errors.address}</div>
                        ) : null}
                        <Field name="phoneNumber" placeholder="Enter Mobile Number" />
                        {errors.phoneNumber && touched.phoneNumber ? (
                            <div>{errors.phoneNumber}</div>
                        ) : null}
                        <Field name="email" type="email" placeholder="Enter Email Address" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}

                        <Field name="password" type="password" placeholder="Enter Password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <Field name="conformPassword" type="password" placeholder="Enter Conform Password" />
                        {errors.conformPassword && touched.conformPassword ? (
                            <div>{errors.conformPassword}</div>
                        ) : null}
                        <div className='cubmit_backtologin'>
                            <button type="submit" className='button_submit'>Signup</button>
                            <Link to="/" className='back_to_login'>back to login</Link>
                        </div>
                        <div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>


    );
}
export default Register;