'use client';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CommentsFrameLayout from '../components/Comments_frame_layout/CommentsFrameLayout';

export default function Product() {
  const params = useParams()
  const [product, setProduct] = useState();
  const [comments, setComments] = useState();
  useEffect(() => {
    axios.get("http://localhost:8080/product/" + params.id)
      .then(data => {
        console.log(data.data)
        setProduct(data.data)
      })
      .catch(error => {
        console.error(error)
        // or display the error to the user
      })
  }, []) // empty dependency array to run only once

  const handleSubmitComment = async () => {
    // The URL of the API endpoint
    const url = "http://localhost:8080/product/"+params.id+ "/comments";
  
    // The data you want to send in the body of the request
    const data = {
        comments : {
          text : comments,
          author : "phuong"
      }
    };
    
    setProduct(
      product,
      [data,...product.comments] // Create a new array with the existing comments and the new comment
    )
  
    // The options for the Axios request
    const options = {
      headers: {
        "Content-Type": "application/json" // The content type of the request body
      }
    };
  
    // Make the Axios request and handle the response
    try {
      // Send the request and get the response
      const response = await axios.post(url, data, options);
  
      // Do something with the response data, such as updating the UI or state
      console.log(response.data);
    } catch (error) {
      // Handle the error, such as displaying a message or logging it
      console.error(error.message);
    }
  };

  return (
    product ?
      <div className='container'>
        <div>Id: {product._id}</div>
        <div className='row'>
          <div className='col-md-4'>
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                {
                  product.images.map(i=>                
                  <div class="carousel-item active">
                    <img width={'100%'} src={i.url}></img>
                  </div>)
                }
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className='col-md-6'>
            <h3>Name: {product.name}</h3>
            <h3>Price: {product.price}</h3>
            <h3>rate:</h3>
            <select className='form-select'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div>
          <h3>Description:</h3>
          <h5>{product.description}</h5>
        </div>

        <div>
          <h3>Comments:</h3>
          <div>
            {
              product.comments.map(c =>
                <div className='d-flex justify-content-between' style={{ border: '1px solid black', marginBottom: '5px' }}>
                  <div>
                    <h5>Author: {c.author}</h5>
                    <p>{c.text}</p>
                  </div>
                  <button className='btn btn-primary'>edit</button>
                </div>)
            }
          </div>

          <div>
            Write <input onChange={(event) => setComments(event.target.value)}></input> <button onClick={() => handleSubmitComment()} className='btn btn-primary'>add</button>
          </div>
        </div>
      </div>
      : ''
  )
}