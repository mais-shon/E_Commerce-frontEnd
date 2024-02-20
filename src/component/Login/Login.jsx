import { useFormik } from 'formik'
import React from 'react'
import Style from './Login.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';


function Login(props) {
  let navigate=useNavigate();
  const validationSchema =Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(3, 'Password must be at least three characters').required('Password is required'),
  
  })


  let formik = useFormik({
    initialValues: {
    
      email: '',
      password: '',
    }, validationSchema: validationSchema,
    onSubmit: sendloginData,
  });
  
  async function sendloginData(values) {
    console.log(values)
    try {
      // Check if the form is valid based on the validation schema
      await validationSchema.validate(values, { abortEarly: false });

     

      const { data } = await axios.post('https://mais-gaduation.onrender.com/auth/signIn', values);
      
      if (data.message === 'Done') {
        localStorage.setItem('userToken',data.token)
        props.userToken();
        if (data.user && data.user.role === 'Admin') {
          // If the user is an admin, navigate to '/dashboard'
          navigate('/dashbord');
        } else {
          // If the user is not an admin, navigate to '/home'
          navigate('/home');
        }
      } else {
        formik.resetForm();
        Swal.fire({
          icon: 'error',
          title: 'Sign-in Failed',
          text: `Reason: ${data.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      formik.resetForm();
      console.error('Error during sign-up:', error.message);

      // Show a more specific error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
       
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }


  return (
   <>
   <div className={Style.superDiv}>
   <h2 className={Style.head}>Sign In</h2>
   <form className={Style.signinForm} onSubmit={formik.handleSubmit}>
  <div className="form-row ">
  <div className="row">
    <div className="col-12 mb-3">
    <input type="email" className="form-control" placeholder="Email" name='email' value={formik.values.email} onChange={formik.handleChange} />
  </div>
    <div className="col-12 mb-3">
    <input type="password" className="form-control" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
  </div>

</div>
<button type="submit" className="btn bg-secondary text-white">
  Sign in
</button>
<Link to='/logup ' className={Style. signup}> Sign Up</Link>
 </div>

 
</form>



</div>
   </>
  )
}

export default Login