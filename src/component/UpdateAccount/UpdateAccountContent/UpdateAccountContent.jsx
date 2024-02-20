import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Style from './UpdateAccountContent.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


function UpdateAccountContent() {
  let token=localStorage.getItem('userToken')
  let navigate=useNavigate();
  const validationSchema =Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
    phone: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    }, validationSchema: validationSchema,
    onSubmit: sendupdateData,
  });


  async function sendupdateData(values) {
    try {
      // Check if the form is valid based on the validation schema
      await validationSchema.validate(values, { abortEarly: false });
  
      // Create an object with only non-empty values
      const requestData = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== '')
      );
  
      // Log the requestData to the console for debugging
      console.log('Request Data:', requestData);
  
      // Make the API call with the requestData
      const { data } = await axios.put('https://mais-gaduation.onrender.com/user/', requestData, {
          headers: { Authorization: `Mais__Hi${token}` }
  ,
});
      
      if (data.message === 'success') {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        formik.resetForm();
      } else {
        formik.resetForm();
        Swal.fire({
          icon: 'error',
          title: 'update Failed',
          text: `Reason: ${data.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      formik.resetForm();
      console.error('Error during update:', error.message);

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
   <h2 className={Style.head}>Update Account</h2>
   <form className={Style.updateForm} onSubmit={formik.handleSubmit}>
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
    <input type="password" className="form-control" placeholder=" New Password" name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} />
  </div>

  <div className="col-12 mb-3">
    <input type="password" className="form-control" placeholder=" confirm new Password" name='confirmNewPassword' value={formik.values.confirmNewPassword} onChange={formik.handleChange} />
  </div>

  <div className="col-12 mb-3">
    <input type="password" className="form-control" placeholder=" Password"  name='password' value={formik.values.password} onChange={formik.handleChange}/>
  </div>
  
</div>
<button type="submit" className="btn  bg-secondary text-white">Update Account</button>
 </div>

 
</form>

</div>
   </>
  )
}

export default UpdateAccountContent;

