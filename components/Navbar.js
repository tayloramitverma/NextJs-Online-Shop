import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'

const NavBar = () => {
    const router =  useRouter();
    const userCookie = parseCookies()
    const user = userCookie.userdata ? JSON.parse(userCookie.userdata) : ''
    const token = userCookie.token

    let authenticated = false
    if(token){
        authenticated=true
    }

    const isActive = (route) => {
        if(route==router.pathname){
            return 'active'
        }else{
            return ''
        }
    }

    return(
        <nav className="light-blue darken-2">
            <div className="container nav-wrapper">
                <Link href="/"><a className="brand-logo">Taylor's Store</a></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className={isActive('/cart')}><Link href="/cart"><a>Cart</a></Link></li>
                    {
                        authenticated ? 
                        <>
                            {
                               user.role !== 'user' && <li className={isActive('/product/create')}><Link href="/product/create" ><a>Create</a></Link></li>                            }   
                            <li className={isActive('/profile')}><Link href="/profile"><a>Profile</a></Link></li>
                            <li>
                                <button 
                                    className="btn waves-effect waves-light black"
                                    onClick={()=>{
                                        cookie.remove('token')
                                        cookie.remove('userdata')
                                        router.push('/login')
                                    }} 
                                >Logout</button>
                            </li>
                        </>
                        :
                        <>
                            <li className={isActive('/login')}><Link href="/login" ><a>Login</a></Link></li>
                            <li className={isActive('/register')}><Link href="/register"><a>Register</a></Link></li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar