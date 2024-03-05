import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Products from './Component/Products/Products'
import Cart from './Component/Cart/Cart'
import Category from './Component/Category/Category'
import Login from './Component/Login/Login'
import Regsiter from './Component/Regsiter/Regsiter'
import Brands from './Component/Brands/Brands'
import Notfound from './Component/Notfound/Notfound'
import { UserContext, UserContextProvider } from './Context/UserContext'
import { ProtectingRouting } from './Component/ProtectingRouting/ProtectingRouting'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { CartContextProvider } from './Context/CartContext'
import Allorders from './Component/Allorders/Allorders'
import Checkout from './Component/Checkout/Checkout'
import WishListContextProvider from './Context/WishListContext';
import WishList from './Component/WishList/WishList';
export default function App() {

  let queryClient = new QueryClient()

  let Routes = createHashRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "home", element: <ProtectingRouting><Home /></ProtectingRouting> },
        { path: "products", element: <ProtectingRouting><Products /></ProtectingRouting> },
        { path: "allorders", element: <ProtectingRouting><Allorders /></ProtectingRouting> },
        { path: "checkout/:id", element: <ProtectingRouting><Checkout /></ProtectingRouting> },
        { path: "ProductDetails/:id", element: <ProtectingRouting><ProductDetails /></ProtectingRouting> },
        { path: "brands", element: <ProtectingRouting><Brands /></ProtectingRouting> },
        { path: "cart", element: <ProtectingRouting><Cart /> </ProtectingRouting> },
        { path: "wish-list", element: <ProtectingRouting><WishList /> </ProtectingRouting> },
        { path: "category", element: <ProtectingRouting><Category /></ProtectingRouting> },
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <Notfound /> },
      ]
    },


  ])

  return (
    <div>

      <QueryClientProvider client={queryClient}  >
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />


        <UserContextProvider >
          <WishListContextProvider>

          <CartContextProvider>

            <RouterProvider router={Routes}></RouterProvider>

          </CartContextProvider>
          </WishListContextProvider>
        </UserContextProvider>
      </QueryClientProvider>



    </div>
  )
}
