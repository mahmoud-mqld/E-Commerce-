import React from 'react'
import appstore from './../../assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg'
import playstore from './../../assets/images/google-play-badge-1-logo-svgrepo-com.svg'

export default function Footer() {
  return (
    <div className='d-flex justify-content-evenly align-items-center bg-main-light ' >
  <i className='fa-brands mx-2 fs-1 fa-instagram'></i>
              <i className='fa-brands mx-2 fs-1 fa-youtube'></i>
              <i className='fa-brands mx-2 fs-1 fa-twitter'></i>
              <i className='fa-brands mx-2 fs-1 fa-spotify'></i>      
              <div className='d-flex justify-content-center flex-column'>
                <img src={appstore}  alt="" />
                <img src={playstore}  alt="" />
               

              </div>
    </div>
  )
}
