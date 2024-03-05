import React from 'react'
import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Product from '../Product/Product';
import { WishListContext } from './../../Context/WishListContext';

export default function Products() {
  let {wishListcounter,setwishListCounter,addTowishList,removeFromwishList}=useContext(WishListContext)
  let [fav,setFav]=useState(false)

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
  async function addProductToWishList(productId) {
    let data = await addTowishList(productId);
    setFav(true);
    setwishListCounter(data.data.length)
    console.log(data);

  }

  async function removeProductToWishList(productId) {
    let data = await removeFromwishList(productId);
    setFav(false);
    console.log(data);
    setwishListCounter(data.data.length)
    
  }




  return (


    <>
      <div className='row g-5'>

{data?.data.data.map((item) => <Product   key={item.id} item={item} />)}



</div>
<nav style={{cursor:"pointer"}} aria-label="Page  navigation example">
<ul className="pagination mt-5 justify-content-center">
  <li className="page-item">
    <a className="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
  <li className="page-item"><a className="page-link" onClick={() => setPage(1)}>1</a></li>
  <li className="page-item"><a className="page-link" onClick={() => setPage(2)} >2</a></li>

  <li className="page-item">
    <a className="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</ul>
</nav>
    </>
  )
}
