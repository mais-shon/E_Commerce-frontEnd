import React, { useEffect, useState } from 'react'
import Style from './SpecificProductContent.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';
import StarRating from 'react-rating-stars-component';
import * as Yup from 'yup';
export default function SpecificProductContent() {
  const [sizes, setSizes] = useState([]);
    const [colors, setColor] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem('userToken');
  const [product, setProduct] = useState([]);
  const [feedback,setFeedBack]=useState([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    color: Yup.string().required('Color is required'),
    size: Yup.string().required('Size is required'),
    qty: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    // Add other validations for additional fields if needed
  });
  

  const formikk = useFormik({
    initialValues: {
      color: '', // Add initial color value if needed
      size: '',  // Add initial size value if needed
      qty: '',
      // ... other form fields
    },
    onSubmit: sendColorSize,
    validationSchema: validationSchema,
  });
  

  async function sendColorSize(values) {
    console.log('Form values:', values);
  
    try {
      await validationSchema.validate(values, { abortEarly: false });
  
      console.log('Form validation successful');
  
      const { data } = await axios.post(
        `https://mais-gaduation.onrender.com/cart/${id}`,
        values,
        {
          headers: {
            Authorization: `Mais__Hi${token}`,
          },
        }
      );
  
      console.log('API response:', data);
  
      if (data.message === 'success') {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You add this product to cart",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // ... rest of the failure logic
      }
    } catch (error) {
      console.error('Error during add to cart:', error.message);
      // ... rest of the error handling
    }
  }
  

  const ImageGallery = ({ mainImage, subImages }) => {
    const settings = {
      dots: false, // Set dots to false to remove navigation dots
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
  
    // Calculate aspect ratio based on main image
    const aspectRatio = mainImage ? mainImage.height / mainImage.width : 1;
  
    const imageStyle = {
      height: '50vw', // Set the height based on the aspect ratio, you can adjust this value
      maxHeight: '370px', // Set a maximum height if needed
      width:'100%'
    };
  
    return (
      <Slider {...settings}>
        {mainImage && (
          <div>
            <img src={mainImage.secure_url} alt="Main Image" style={imageStyle} />
          </div>
        )}
        {subImages &&
          subImages.map((image) => (
            <div key={image.public_id}>
              <img src={image.secure_url} alt="Sub Image" style={imageStyle} />
            </div>
          ))}
      </Slider>
    );
  };


  const formik = useFormik({
    initialValues: {
      comment: '',
      rating:'',
    },
    onSubmit: (values) => {
      sendCommentData(values);
    },
  });
  async function displaycolorsize() {
    try {
      let { data } = await axios.get(`https://mais-gaduation.onrender.com/product/showcolor_size_qutupdate/${id}`, {
        headers: {
          Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
        },
      });
  
      const products = data.existingInfo.products || [];
  
      // Extract colors into an array
      const colors = products.map(product => product.color);
       const sizes= products.map(product => product.size);
       setColor(colors);
       setSizes(sizes)
      
      // Continue with the rest of your code using the 'colors' array
      // For example, you might call another function or perform further operations with the colors array here.
      // ...
  
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error appropriately
    }
  }



  async function sendCommentData(values) {
    try {
      // Check if the form is valid based on the validation schema
      const requestData = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value !== '' && !(key === 'rating' && value === ''))
      );
  
      // Log the requestData to the console for debugging
      
  
      const { data } = await axios.patch(
        `https://mais-gaduation.onrender.com/feedBack/${id}`,
        requestData,
        {
          headers: {
            Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
          },
        }
      );
  
      if (data.message === 'success') {
        navigate('/specificProduct/:id');
      } else {
        // Handle unsuccessful sign-up (if needed)
        formik.resetForm();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `make feedback failed: Are u sure u order this product befor?`,
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
        text: `Something went wrong: Are u sure u order this product befor?`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }
  const addToWishlist = async () => {
        try {
          // Make a POST request to the addToWishlist API endpoint
          const {data} = await axios.patch(`https://mais-gaduation.onrender.com/product/addToWishlist/${id}`, {}, {
            headers: {
              Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
            },
          });
      
          // Handle the response as needed
          if (data.message === 'success') {
            // Product added to wishlist successfully
            console.log('Product added to wishlist!');
            // You can also update your component state or perform any other actions
          } else {
            // Handle other cases if needed
            console.log('Failed to add product to wishlist:', response.data.message);
          }
        } catch (error) {
          // Handle errors
          console.error('Error adding product to wishlist:', error.message);
        }
      };



      const likeproduct= async () => {
            try {
              // Make a POST request to the addToWishlist API endpoint
              const {data} = await axios.patch(`https://mais-gaduation.onrender.com/product/like/${id}`, {}, {
                headers: {
                  Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
                },
              });
          
              // Handle the response as needed
              if (data.message === 'success') {
                // Product added to wishlist successfully
                console.log('like Product !');
                // You can also update your component state or perform any other actions
              } else {
                // Handle other cases if needed
                console.log('Failed to add product to wishlist:', response.data.message);
              }
            } catch (error) {
              // Handle errors
              console.error('Error adding product to wishlist:', error.message);
            }
          };
    

          const addToCart= async () => {
          
                try {
                  // Make a POST request to the addToWishlist API endpoint
                  const {data} = await axios.patch(`https://mais-gaduation.onrender.com/cart/${id}`, {}, {
                    headers: {
                      Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
                    },
                  });
              
                  // Handle the response as needed
                  if (data.message === 'success') {
                   
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "this product added successfully",
  showConfirmButton: false,
  timer: 1500
});
                  } else {
                    // Handle other cases if needed
                    console.log('Failed to add product to wishlist:', response.data.message);
                  }
                } catch (error) {
                  // Handle errors
                  console.error('Error adding product to wishlist:', error.message);
                }
              };
        


          const dislikeproduct= async () => {
                try {
                  // Make a POST request to the addToWishlist API endpoint
                  const {data} = await axios.patch(`https://mais-gaduation.onrender.com/product/unlike/${id}`, {}, {
                    headers: {
                      Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
                    },
                  });
              
                  // Handle the response as needed
                  if (data.message === 'success') {
                    // Product added to wishlist successfully
                    console.log('unlike Product !');
                    // You can also update your component state or perform any other actions
                  } else {
                    // Handle other cases if needed
                    console.log('Failed to add product to wishlist:', response.data.message);
                  }
                } catch (error) {
                  // Handle errors
                  console.error('Error adding product to wishlist:', error.message);
                }
              };

              
          const displayfeedback= async () => {
            try {
              // Make a POST request to the addToWishlist API endpoint
              const {data} = await axios.get(`https://mais-gaduation.onrender.com/feedBack/${id}`, {
                headers: {
                  Authorization: `Mais__Hi${token}`, // Include your authorization token if needed
                },
              });
           
              // Handle the response as needed
              if (data.message === 'Success') {
                setFeedBack(data.feedback);
                data.feedback.forEach((feedbackItem) => {
                  feedbackItem.feedback.forEach((user) => {
                    const userFirstName = user.firstName;
                    
                  });
                });
                console.log('Feedback set successfully!');
              }else {
                // Handle other cases if needed
                console.log('Failed to add product to wishlist:', response.data.message);
              }
            } catch (error) {
              // Handle errors
              console.error('Error adding product to wishlist:', error.message);
            }
          };

      

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded User:', decoded);
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    displayfeedback();
    displaycolorsize();
    displaySpecificProduct();
  }, [id, token]);

  
  useEffect(() => {
    if (id && token) {
      displaySpecificProduct();
    }
  }, [id, token]);

  async function displaySpecificProduct() {
    try {
      const { data } = await axios.get(`https://mais-gaduation.onrender.com/product/getspecficProductForSpecificStore/${id}`, {
        headers: { Authorization: `Mais__Hi${token}` },
      });
      console.log(data.product);
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching specific product:', error);
    }
  }

  
  return (
    <div className={Style.super} >
<div className="container">
    <div className={Style.content}>
<div className="row">
  <div className="col-8" >
    <div className={Style.img}>
<ImageGallery  style={{height:'20%'}} mainImage={product.mainImage} subImages={product.subImages} />
</div></div>
<div className="col-4">
    <div className={Style.head}>
<h2>
    {product.name}
</h2> </div>
</div>
<div className="col-4">
  <div className={Style.price}>
    <p style={{ textDecoration: product.discount !== 0 ? 'line-through' : 'none' }}>Price: {product.price}</p>
  </div>
</div>

<div className="col-4">
  <div className={Style.discount}>
    <p>Discount: {product.discount}</p>
  </div>
</div>

<div className="col-4">
  <div className={Style.finalprice}>
    <p>Final Price: {product.finalPrice}</p>
  </div>
</div>

<div className="col-4">
    {product?.descreption && (
        <div className={Style.descreption}>
            <p>description: {product.descreption}</p>
            <p style={{ marginLeft: '-1%', fontSize: '14px', marginTop: '-3%' }}>total vote: {product.totalVote} </p>
        </div>
    )}
</div>
<div className="col-4">
    <div className={Style.descreption}>
        <p style={{ marginLeft: '-10%',fontSize:'14px',marginTop:'-3%' }}>total vote: {product.totalVote} </p>
        </div>
</div>


<form onSubmit={formikk.handleSubmit}>
  {/* Sizes */}
  <div className={Style.sizes}>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {sizes.map((element, index) => (
        <div className={Style.size} key={index}>
        <input
  type="radio"
  id={`size-${index}`}
  name="size"  
  value={element}
  checked={formikk.values.size === element}
  onChange={formikk.handleChange}
  hidden
/>  <label htmlFor={`size-${index}`} className={Style.sizeCircle}>
            {element}
          </label>
        </div>
      ))}
    </div>
  </div>
  {/* Colors */}
  <div className={Style.colors}>
    <div  style={{ display: 'flex', gap: '8px' }}>
      {colors.map((element, index) => (
        <div className={Style.color} key={index} style={{ color:'rgba(255, 0, 0, 0.5)', fontSize:'5px',backgroundColor: element, width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #000' }}>
         <input
  type="radio"
  id={`color-${index}`}
  name="color"  
  value={element}
  checked={formikk.values.color === element}
  onChange={formikk.handleChange}
  hidden
/>
          <label htmlFor={`color-${index}`} className={Style.colorCircle}>
            {element}
          </label>
        </div>
      ))}
    </div>
  </div><div>
    <div className={Style.quantity}>
    <input className={Style.quantityy}
      type="number"
      id="qty"
      name="qty"
      value={formikk.values.qty}
      onChange={formikk.handleChange}
    />
  </div></div>
  {/* Submit Button */}
  <button className={Style.buttonn} type="submit">  <i className="fa-solid fa-cart-plus"></i></button>
</form>

<div className={Style.icons}>
  <div className="row">
 
    <div className="col-3">
      <i className="fa-regular fa-bookmark"  onClick={addToWishlist}></i>
    </div>
    <div className="col-3">
      <i className="fa-regular fa-thumbs-up" onClick={likeproduct}></i>
 
    </div>
    <div className="col-3">
      <i className="fa-regular fa-thumbs-down" onClick={dislikeproduct}></i>
    </div>
  </div>
</div>
</div>
</div>

<div className={Style.feedback}>

{feedback.map((element) => (
  <div className={Style.feedbackbody} key={element.id}>
    {element.feedback.map((user) => (
      <Link className={Style.name} key={user._id}>
        {`${user.firstName} ${user.lastName}`}
      </Link>
    ))}
    <p className={Style.par}>{element.comment}</p>
  </div>
))}
   <form className={Style.comment} onSubmit={formik.handleSubmit}>
  <div className="form-row">
    <div className="row">
      <div className="col-12 mb-3">
        <input
          type="text"
          className="form-control py-3"
          placeholder="Write your comment"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </div>
      <div className="col-12 mb-3">
        {/* Replace the input field with StarRating component */}
        <StarRating
          count={5}
          size={24}
          value={formik.values.rating} // Assuming you have a rating field in your formik values
          onChange={(newRating) => formik.setFieldValue('rating', newRating)}
          edit // Enable user to edit the rating
        />
      </div>
    </div>

    <button type="submit" style={{backgroundColor:' rgb(110, 97, 127)'}} className={Style.comment}>
      Comment
    </button>
  </div>
</form>

</div>
</div>
    </div>
  )
}
