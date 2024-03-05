import { createContext, useState } from "react";
import axios from "axios";
 

export let WishListContext = createContext(0)
export default function WishListContextProvider ({children}) {

let [fav,setFav]=useState(false)
let [wishListcounter , setwishListCounter]= useState(0)


async function addTowishList (productId){
  return await axios.post("https://ecommerce.routemisr.com/api/v1/"+`wishlist`,
  {productId}, 
  {headers:{token:localStorage.getItem('UserToken')}}
  )
    .then(({data})=> data)
    .catch(err=>err)
}

async function removeFromwishList (productId){
  return await axios.delete("https://ecommerce.routemisr.com/api/v1/"+`wishList/`+productId, 
  {headers:{token:localStorage.getItem('UserToken')}}
  )
    .then(({data})=> data)
    .catch(err=>err)
}




async function GetwishList(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/"+`wishlist`,
  {headers:{token:localStorage.getItem('UserToken')}}
  )
    .then(({data})=> data)
    .catch(err=>err)
    
}


return <WishListContext.Provider value={{
  fav,setFav,
  wishListcounter , setwishListCounter,
  addTowishList ,
  GetwishList,
  removeFromwishList,GetwishList,addTowishList,
  
}}>
  {children}
</WishListContext.Provider>
}

