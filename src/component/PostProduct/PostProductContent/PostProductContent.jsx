import React, { useState } from 'react';
import Style from './PostProductContent.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

export default function PostProductContent() {
    let token=localStorage.getItem('userToken')
console.log(token)
    let formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            discount: '',
            description: '',
            products: [
              { color: '', size: '', qut: '' }
            ],
            mainImage: {
              public_id: '',
              secure_url: ''
            },
            subImages: [
              { public_id: '', secure_url: '' }
            ]
          },
        onSubmit: sendpostData,
      });

      const handleSubImageChange = (e) => {
        const files = Array.from(e.target.files);
        formik.setValues({
          ...formik.values,
          subImages: files
        });
      };
      const handleAddColorSize = () => {
        // Logic to add an empty variant to the products array
        formik.setValues({
          ...formik.values,
          products: [...formik.values.products, { color: '', size: '', qut: '' }]
        });
      };
      const handleMainImageChange = (e) => {
        const file = e.target.files[0];
      
        // Assuming you want to update the mainImage field in formik
        formik.setValues({
          ...formik.values,
          mainImage: {
            
            file: file,
          },
        });
      };

      
      const handleVariantInputChange = (index, event) => {
        const { name, value } = event.target;

        // Assuming products is an array in your formik values
        const updatedProducts = [...formik.values.products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value,
        };

        formik.setValues({
            ...formik.values,
            products: updatedProducts,
        });
    };


 
    async function sendpostData(values) {
        // Clean up the form values before sending them
        const cleanedValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => {
                if (key === 'description') {
                    return value.trim() !== '';
                } else if (key === 'subImages') {
                    return value && value.length > 0;
                }
                return true;
            })
        );
    console.log(cleanedValues)
        try {
            const { data } = await axios.post(/*'https://mais-gaduation.onrender.com/product/createProduct'*/'localhost:5000/product/createProduct', cleanedValues, {
                headers: { Authorization: `Mais__Hi${token}` }
            });
    
            // Rest of your code...
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
    }
  return (
    <div className={Style.super}>
      <div className="container">
        <h2 className={Style.head}>Post New Product</h2>
        <div className={Style.content}>
          <form  onSubmit={formik.handleSubmit}>
            <div className="row">
            <div className="col-4">
    <div className={Style.name}>
      <input type="text" name="name" style={{  border:'1px white solid'}} value={formik.values.name} onChange={formik.handleChange} required placeholder='Product name'/>
    </div>
  </div>
  <div className="col-4" >
    <div className={Style.price}>
      <input type="number" name="price" style={{  border:'1px white solid'}} value={formik.values.price} onChange={formik.handleChange} required  placeholder='Price'/>
    </div>
  </div>
  <div className="col-4">
    <div className={Style.discount}>
    
      <input type="number" name="discount"  style={{  border:'1px white solid'}} value={formik.values.discount} onChange={formik.handleChange} required placeholder='Discount'/>
    </div>
  </div>

              <div className="col-12">
                <div className={Style.des}>
              
                <input name="description" placeHolder='descreption' value={formik.values.description} onChange={formik.handleChange} style={{width:'38rem', border: '1px white solid',padding:'1% 2%',borderRadius:'4px',marginBottom:'3%',marginTop:'3%'}}  />
              </div></div>

              {formik.values.products.map((variant, index) => (
  <div key={index} className="row">
    <div className="col-4">
      <input 
        value={variant.color}
        onChange={(e) => {
          formik.handleChange(e);
          handleVariantInputChange(index, e);
        }}
        style={{ border: '1px white solid' }}
        placeholder='color'
        type="text"
        name="color"
        required
      />
    </div>

    <div className="col-4">
      <input
        style={{ border: '1px white solid' }}
        placeholder='size'
        value={variant.size}
        onChange={(e) => {
          formik.handleChange(e);
          handleVariantInputChange(index, e);
        }}
        type="text"
        name="size"
        required
      />
    </div>

    <div className="col-4">
      <input
        style={{ border: '1px white solid' }}
        placeholder='quantity'
        value={variant.qut}
        onChange={(e) => {
          formik.handleChange(e);
          handleVariantInputChange(index, e);
        }}
        type="number"
        name="qut"
        required
      />
    </div>
  </div>
))}
            <button type="button" style={{ width: '43rem', padding: '0% 2%', border: '1px white solid', borderRadius: '2px', marginBottom: '4%', marginTop: '3%'}} onClick={handleAddColorSize}>
  Add Color/Size/qut
</button>

              <div className="row">
              <div className="col-6 image-upload-section">
  <label>Main Image:</label>
  <input
  onChange={(e) => {
    formik.handleChange(e);
    handleMainImageChange(e);
  }}
  type="file"
  name="mainImageInput"
  accept="image/*"
  required
/>
  {formik.values.mainImage.secure_url && (
    <img
      src={formik.values.mainImage.secure_url}
      alt="Main Product"
      style={{ width: '100%', height: 'auto', marginTop: '10px' }}
    />
  )}
</div>

<div className="col-6 image-upload-section">
  <label>Sub Images (select multiple):</label>
  <input
    onChange={(e) => {
      formik.handleChange(e);
      handleSubImageChange(e);
    }}
    type="file"
    name="subImagesInput"
    accept="image/*"
    multiple
  />
{formik.values.subImages.length > 0 && (
  <div className="selected-sub-images">
   
    {formik.values.subImages.map((subImage, index) => (
      <img
        key={index}
        src={subImage instanceof Blob ? URL.createObjectURL(subImage) : ''}
        alt={`Sub Image ${index + 1}`}
        style={{ width: '100%', height: 'auto', marginTop: '5px' }}
      />
    ))}
  </div>
)}
</div>

</div>
            </div>
            <button type="submit"className={Style.submit}>
post
</button>
         
          </form>
        </div>
      </div>
    </div>
  );
}
