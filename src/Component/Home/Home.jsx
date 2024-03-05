import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import MainSilder from '../MainSilder/MainSilder';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../Context/CartContext';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import Products from '../Products/Products';
import { Helmet } from 'react-helmet';

export default function Home() {
  let { addCart,setnumOfCartItems } = useContext(CartContext)
  let [page, setPage] = useState(1)
  function getProducts(queryParm) {
    console.log();
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryParm.queryKey[1]}`)
  }
  let { isLoading, data, isError } =
    useQuery(['productApi', page], getProducts)

  async function addToCart(id) {
    let req = await addCart(id)
    if (req.data.status == "success") {

      setnumOfCartItems(req.data.numOfCartItems)
      toast.success(req.data.message, {
      });
    }
    console.log(req);
  }

  function addToWishList(e,id){

    e.target.classList.replace('fa-regular','fa-solid')
  }
  return (
    <>

<Helmet>
    <title>Home</title>
</Helmet>


      <Toaster />
      {isLoading ? <div className='loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white '>
        <span className="loader"></span>

      </div> :
        <div className='container py-5'>
          <MainSilder />
          <CategorySlider />
        <Products/>
        </div>}



    </>
  )

















  // let [loading, setLoading] = useState(true)
  // let [productList, setProducts] = useState([])
  // useEffect(() => {

  //   getAllProducts()
  // }, [])
  // async function getAllProducts() {
  //   setLoading(true)
  //   let req = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=1`)


  //   console.log(req.data.data);
  //   setProducts(req.data.data)
  //   setLoading(false)
  // }

}


