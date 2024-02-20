import { useFormik } from 'formik'
import React from 'react'
import Style from './Logup.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';


function Logup() {
  let navigate=useNavigate();
  const validationSchema =Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string(),
    address: Yup.string().required('Address is required'),
    phone: Yup.number().required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(3, 'Password must be at least three characters').required('Password is required'),
    cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),

  
  })

  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      role: '',
      cPassword: '',
      categoryName: '',
    }, validationSchema: validationSchema,
    onSubmit: sendregisterData,
  });
  
  async function sendregisterData(values) {
    try {
      // Check if the form is valid based on the validation schema
      await validationSchema.validate(values, { abortEarly: false });

      const requestData = { ...values };

      // Delete categoryName if the role is not 'stakeHolder'
      if (values.role !== 'stakeHolder') {
        delete requestData.categoryName;
      }

      const { data } = await axios.post('https://mais-gaduation.onrender.com/auth/signUp', requestData);

      if (data.message === 'success') {
     navigate('/login')
      } else {
        // Handle unsuccessful sign-up (if needed)
        formik.resetForm();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Sign-up failed: ${data.message}`,
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
        text: `Something went wrong: ${error.message}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }

  return (
   <>
   <div className={Style.superDiv}>
   <h2 className={Style.head}>Sign Up</h2>
   <form className={Style.signUpForm} onSubmit={formik.handleSubmit}>
  <div className="form-row ">
  <div className="row">
  <div className="col-6 mb-3">
    <input type="text" className="form-control" placeholder="First name" name="firstName"  value={formik.values.firstName} onChange={formik.handleChange}/>
  </div>
  
  
  <div className="col-6 mb-3">
    <input type="text" className="form-control" placeholder="Last name" name="lastName"  value={formik.values.lastName} onChange={formik.handleChange}/>
  </div>
  
  <div className="col-6 mb-3">
    <input type="text" className= 'form-control  ' placeholder="Address" name="address"  value={formik.values.address} onChange={formik.handleChange} />
  </div>
  <div className="col-6  mb-3">
    <input type="text" className="form-control" placeholder="Phone"  name='phone' value={formik.values.phone} onChange={formik.handleChange}/>
    </div>
    <div className="col-12 mb-3">
    <input type="email" className="form-control" placeholder="Email" name='email' value={formik.values.email} onChange={formik.handleChange} />
  </div>
    <div className="col-12 mb-3">
    <input type="password" className="form-control" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
  </div>
  <div className="col-12 mb-3">
    <input type="password" className="form-control" placeholder=" Confirm Password"  name='cPassword' value={formik.values.cPassword} onChange={formik.handleChange}/>
  </div>
  
  
  <div>
  <div className="form-check col-6 mt-4 mb-2 mb-3">
    <input
      className="form-check-input"
      type="radio"
      name="role"
      id="gridRadios1"
      value="Customer"
      checked={formik.values.role === 'Customer'}
      onChange={formik.handleChange}
    />
    <label className="form-check-label" htmlFor="gridRadios1">
      Customer
    </label>
  </div>
  <div className="form-check col-6 mt-4 mb-2 mb-3">
    <input
      className="form-check-input"
      type="radio"
      name="role"
      id="gridRadios2"
      value="stakeHolder"
      checked={formik.values.role === 'stakeHolder'}
      onChange={formik.handleChange}
    />
    <label
      className={`form-check-label ${
        formik.values.role === 'stakeHolder' ? 'active' : ''
      }`}
      htmlFor="gridRadios2"
    >
      Store
    </label>
    {formik.values.role === 'stakeHolder' && (
      <input
        type="text"
        className="form-control"
        placeholder="Store's category"
        name="categoryName"
        value={formik.values.categoryName}
        onChange={formik.handleChange}
      />
    )}
  </div>
</div>
</div>
<button type="submit" className="btn  bg-secondary text-white">Sign up</button>
<Link to='/Login ' className={Style.signin}> Sign In</Link>
 </div>

 
</form>

</div>
   </>
  )
    }

export default Logup