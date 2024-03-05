
import toast, { Toaster } from 'react-hot-toast';
import style from './WishList.module.css'
import { useContext, useEffect, useState } from "react";
import { CartContext } from './../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';



const WishList =()=>{
  let { wishListcounter ,setwishListCounter ,GetwishList ,removeFromwishList,updateWishList ,fav,
      setFav}= useContext(WishListContext)
let [favoriteProduct,setFavoriteProduct]=useState([])
let { addCart,setnumOfCartItems } = useContext(CartContext)

  useEffect(()=>{(async()=>{
      let data = await GetwishList()
      console.log(data);
     setFavoriteProduct(data.data)
     setwishListCounter(data.count)
     console.log('favs',favoriteProduct);
     })()}
    ,[]
  )

  useEffect(()=>{(async()=>{
      let data = await GetwishList()
      console.log(data);
     setFavoriteProduct(data.data)
     setwishListCounter(data.count)
     console.log('favs',favoriteProduct);
     })()}
    ,[wishListcounter]
  )

  async function addToCart(id) {
    let req = await addCart(id)
    if (req.data.status == "success") {

      setnumOfCartItems(req.data.numOfCartItems)
      toast.success(req.data.message, {
      });
    }
    console.log(req);
  }

  // let {counter , setCounter, addToCart}= useContext(CartContext)

  // async function addProductToCart(ProductID){
  //     let data = await addToCart(ProductID)
  //     setCounter(data.numOfCartItems)
  //     console.log(data);
  //     if (data.status=="success") {toast.success(data.message)
       
  //     }
  //    }


     async function removeProductToWishList(productId) {
      let data = await removeFromwishList(productId);
      setFav(false);
      console.log(data);
      setwishListCounter(data.data.length)
      
    }





  return(
      <>
        
        <Helmet>
    <title> WishList</title>
</Helmet>
        <div className="container">
       {favoriteProduct?.map((product)=>(
            <div className="row">
            <div className="col-md-2">
                <figure>
                    <img className='img-fluid' src={product.imageCover} alt="" />
                </figure>
            </div>
          <div className="col-md-8">
            <p>{product.category.name}</p>
            <h3>{product.title}</h3>
            <h4 className=' text-muted'> {product.description}</h4>
            <p>{product.price} EGP</p>

            <button onClick={()=>addToCart(product.id)} className=' m-2 w-100 btn text-white bg-main'>Add To Cart</button>
            <button onClick={()=>removeProductToWishList(product.id)} className=' m-2 btn btn-danger' >Remove</button>
          </div>
          </div>
       ))}
      </div>
      </>


  )

}
export default WishList

