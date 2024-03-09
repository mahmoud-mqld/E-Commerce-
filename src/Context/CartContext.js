import axios from 'axios'
import { createContext, useState } from 'react'

export let CartContext = createContext()

export function CartContextProvider({ children }) {
    let [numOfCartItems, setnumOfCartItems] = useState()


    function getUserCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', options)
    }
    function addCart(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            productId: id
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, options)
    }

    function clearCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, options)
    }
    function removeCart(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, options)
    }
    function updateCart(id, count) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            count: count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, options)
    }
    function checkoutPayment(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://mahmoud-mqld.github.io/E-Commerce-/`, body, options)
    }
    function checkoutCash(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, body, options)
    }
    return <CartContext.Provider value={{checkoutCash, checkoutPayment, updateCart, removeCart, clearCart, getUserCart, setnumOfCartItems, numOfCartItems, addCart }}>
        {children}
    </CartContext.Provider>
}