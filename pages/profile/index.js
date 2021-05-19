import {useEffect, useRef} from 'react'
import { parseCookies } from 'nookies'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'
import baseurl from '../../helpers/baseUrls'
import UserRoles from '../../components/UserRoles'

const Profile =({error, products})=>{

    const router = useRouter()
    const nocookie = parseCookies()
    const user = nocookie.userdata ? JSON.parse(nocookie.userdata) : ''

    const orderBox =  useRef(null)

    useEffect(()=>{
        M.Collapsible.init(orderBox.current);
    },[])

    if(error){
        M.toast({html:error, classes:'red'})
        cookie.remove('token')
        cookie.remove('userdata')
        router.push('/login')
    }

    return (
        <div className="container" style={{marginTop:'30px'}}>
            <ul className="collection with-header">
                <li className="collection-header"><h4>Profile</h4></li>
                <li className="collection-item"><b>Name:</b> {user.name}</li>
                <li className="collection-item"><b>Email:</b> {user.email}</li>
            </ul>

            <ul className="collection collapsible with-header" ref={orderBox} >
                <li className="collection-header"><h4>Orders History</h4></li>
                { products.length <=0 &&
                    <li className="collection-header"><h6>There is no order history!</h6></li>
                }
                { products.length > 0 && products.map(order=>{
                    return (
                        <li key={order._id}>
                            <div className="collapsible-header">
                            <i className="material-icons">folder</i>
                            {order.createdAt}
                            <span className="new badge">₹ {order.total}</span></div>
                            <div className="collapsible-body">
                                <p>Order Items</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item Name</th>
                                            <th>Item Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.products.map((item,index)=>{
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
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {user.role == "root" &&
                <UserRoles />
            } 
            <h5 className="center">Thank you for connecting with us!</h5>
        </div>
    )
}

export default Profile

export async function getServerSideProps(context) {
    const {token} = parseCookies(context)
    if(!token){
        const {res} = context
        res.writeHead(302,{Location:'/login'})
        res.end()
    }

    const res = await fetch(`${baseurl}api/product/getorders`,{
        method:"GET",
        headers:{
            'requestType':'getOrders',
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