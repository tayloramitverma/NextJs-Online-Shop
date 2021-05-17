import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import baseurl from '../helpers/baseUrls'
const Cart = ({error,products}) => {
    const [cartProducts, setCartProducts] = useState(products)
    const router = useRouter();
    const {token} = parseCookies()

    if(!token){
        return (
            <div className="center">
                <h3>Please login to view your cart items!</h3>
                <Link href={'/login/'}><a><button className="btn waves-effect waves-light blue">Login</button></a></Link>
            </div>
        )
    }
    if(error){
        M.toast({html:error, classes:'red'})
        cookie.remove('token')
        cookie.remove('userdata')
        router.push('/login')
    }

    const removeItem = async (id) => {
        const res = await fetch(`${baseurl}api/product/${id}`, {
            method:"DELETE",
            headers:{
                'requestType':'removeCartItem',
                'Authorization':`Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        if(data.err){
            M.toast({html:data.err, classes:'red'})
            cookie.remove('token')
            cookie.remove('userdata')
            router.push('/login')
        }
        setCartProducts(data)
        M.toast({html:"Item removed!",classes:'green'})
    }

    return (
        <div className="container">
            <h1>My Cart</h1>
            <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Remove Item</th>
                </tr>
            </thead>
            <tbody>
                {
                    cartProducts.map((item,index)=>{
                        let indexing = index+1
                        return (
                            <tr key={indexing}>
                                <td>
                                    {indexing}
                                </td>
                                <td>
                                    <img src={item.product.mediaURI} style={{width:'50px'}} /><br/>
                                    <b>{item.product.name}</b>
                                </td>
                                <td>
                                    {item.product.price}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.quantity * item.product.price}
                                </td>
                                <td>
                                <button className="btn waves-effect waves-light blue" onClick={()=>removeItem(item.product._id)}><i class="material-icons">delete</i></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    )
}

export default Cart

export async function getServerSideProps(context) {
    const {token} =  parseCookies(context)

    if(!token) {
        return {
            props:{products:[]}
        }
    }

    const res = await fetch(`${baseurl}api/product/cart`,{
        method:'GET',
        headers:{
            'requestType':'getCart',
            'Authorization':`Bearer ${token}`
        }
    })

    const data = await res.json()

    if(data.err){
        return {
            props:{error:data.err}
        }
    }else{
        return {
            props:{products:data}
        }
    }
    
}