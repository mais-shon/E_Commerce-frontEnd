import React, { useEffect, useState } from 'react';
import Style from './AllCategoryContent.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

export default function AllCategoryContent() {
  const token = localStorage.getItem('userToken');
  const [categories, setCategories] = useState([]);

  let formik = useFormik({
    initialValues: {
    
     name:'',
    }, 
    onSubmit: addCategory,
  });
  
  async function addCategory(values) {
    try {
      const { data } = await axios.post(
        'https://mais-gaduation.onrender.com/category/createCategory',
        values,
        {
          headers: {
            Authorization: `Mais__Hi${token}`,
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );

      if (data.message === 'success') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Category created successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        // Refresh the category list after successful creation
        displayCategories();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Category Creation Failed',
          text: 'Unexpected response from the server',
        });
      }
    } catch (error) {
      console.error('Error creating category:', error.message);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error creating category. Please try again later.',
      });
    }
  }
  
  async function displayCategories() {
    try {
      const { data } = await axios.get('https://mais-gaduation.onrender.com/category/getAllCategory', {
        headers: { Authorization: `Mais__Hi${token}` }
      });
      setCategories(data.allCategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function handleDelete(_id) {
    console.log('Deleting category with ID:', _id);
  
    try {
      const { data } = await axios.delete(`https://mais-gaduation.onrender.com/category/deleteCategory/${_id}`,{
        headers: { Authorization: `Mais__Hi${token}` }
      });

  
      if (data.message === 'success') {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Unexpected response:', data.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
  
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
      }
    }
  }
  


  useEffect(() => {
    displayCategories();
  }, []);

  return (
    <div className={Style.super}>
      <h1 className={Style.head}>All Categories</h1>
      <div className={Style.content}>
      <div className={Style.add}>
        <form className={Style.form} onSubmit={formik.handleSubmit}>
  <input type="text" className={Style.input} placeholder='Add new category' name='name' value={formik.values.name} onChange={formik.handleChange} />
  <button type='submit' className={Style.button}>Add Category</button>
</form>
        

        </div>
        <ul className={Style.category}>
        {categories.length > 0 ? (
            categories.map((category, index) => (
              <li className={Style.list} key={category._id}>
                <span> {index + 1}. {category.name}</span>
                <button className={Style.delete} onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
       
      </div>
    </div>
  );
}
