'use client';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CommentsFrameLayout from '../components/Comments_frame_layout/CommentsFrameLayout';

export default function Product() {
  const params = useParams()
  const [product, setProduct] = useState();
  const [newProduct, setNewProduct] = useState({
    "name": "",
    "price": 0,
    "description": ""
  });
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

  const setField = async (value, field) => {
    if (field == "name") {
      setNewProduct({ ...newProduct, name: value })
    }
    if (field == "price") {
      setNewProduct({ ...newProduct, price: value })
    }
    if (field == "desc") {
      setNewProduct({ ...newProduct, description: value })
    }
  }

  const handleSave = async () => {
    const url = "http://localhost:8080/product/"
    // The data you want to send in the body of the request
    const data = {
      name: newProduct.name,
      price: newProduct.price,
      category: "65daeedc0cae7e88aa67ddd4",
      description: newProduct.description,
      // images: [
      //   {
      //     _id: "65dc08083e6c2804cd3baeea",
      //     id: 45,
      //     url: "tennisracket1.jpg"
      //   },
      //   {
      //     _id: "65dc08083e6c2804cd3baeeb",
      //     id: 46,
      //     url: "tennisracket2.jpg"
      //   }
      // ]
    };

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
  }

  const handleSubmitComment = async () => {
    // The URL of the API endpoint
    const url = "http://localhost:8080/product/" + params.id + "/comments";

    // The data you want to send in the body of the request
    const data = {
      comments: {
        text: comments,
        author: "phuong"
      }
    };

    setProduct(
      product,
      [data, ...product.comments] // Create a new array with the existing comments and the new comment
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
                  product.images.map(i =>
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
            <h3>rate: 5 stars</h3>
            <div>
              <h3>Description:</h3>
              <h5>{product.description}</h5>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add a new product
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add a new product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div>
                  <h3>Name:</h3><input onChange={(event) => setField(event.target.value, "name")} className='form-control' value={newProduct.name}></input>
                  <h3>Price: </h3><input type='number' onChange={(event) => setField(event.target.value, "price")} className='form-control' value={newProduct.price}></input>
                  <h3>Description:</h3> <input onChange={(event) => setField(event.target.value, "desc")} className='form-control mb-5' value={newProduct.description}></input>
                  {
                    product.images.map(i =>
                      <div className='d-flex row'>
                        <div class="mb-3 col-md-6" >
                          <input class="form-control form-control-sm" id="formFileSm" type="file" />
                        </div>
                        <div className='col-md-6'>
                          <img width={'100%'} src={i.url}></img>
                        </div>
                      </div>
                    )
                  }
                  <button className='btn btn-primary' onClick={{}}>Add image</button>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={() => handleSave()} class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h3>Comments:</h3>

          <div>
            Write <input onChange={(event) => setComments(event.target.value)}></input> <button onClick={() => handleSubmitComment()} className='btn btn-primary'>add</button>
          </div>
          <div>
            {
              product.comments.map(c =>
                <div className='d-flex justify-content-between' style={{ border: '1px solid black', marginBottom: '5px' }}>
                  <div>
                    <h5>Author: {c.author}</h5>
                    <p>{c.text}</p>
                  </div>
                  {/* <button className='btn btn-primary'>edit</button> */}
                </div>)
            }
          </div>
        </div>
      </div>
      : ''
  )
}