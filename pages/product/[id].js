import baseurl from '../../helpers/baseUrls'
import {useRef, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'

export default function Product({product}) {
    const [quantity, setQuantity] = useState(1)
    const modalRef = useRef(null)
    const router = useRouter()

    const {userdata, token} = parseCookies()
    const user = userdata?JSON.parse(userdata):''

    useEffect(()=>{
        M.Modal.init(modalRef.current);
    },[])

    if(router.isFallback){
        return(
            <h3>loading...</h3>
        )
    }

    const addToCart = async () => {
        if(!token){
            return M.toast({html:'You must be login for add to cart!', classes:'blue'})
        }
        const res = await fetch(`${baseurl}api/product/addtocart`, {
            method:'PUT',
            headers:{
                'requestType':'addToCart',
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                quantity,
                product:product._id
            })
        })

        const data = await res.json()

        if(data.err){
            M.toast({html:data.err, classes:'red'})
            cookie.remove('token')
            cookie.remove('userdata')
            router.push('/login')
        }
        
        M.toast({html:data.message,classes:'green'})
        setQuantity(1)
    }

    const getModal = () => {
        return (
            <div id="modal1" className="modal" ref={modalRef}>
                <div className="modal-content">
                <h4>{product.name}</h4>
                <p>Are you sure to delete this item?</p>
                </div>
                <div className="modal-footer center">
                    <button className="btn waves-effect waves-light blue modal-close" style={{marginRight:'10px'}}>Cancel</button>
                    <button className="btn waves-effect waves-light red" onClick={()=>deleteProduct(product._id)}>Yes</button>
                </div>
            </div>
        )
    }

    const deleteProduct = async (id) =>{
        const res = await fetch(`${baseurl}api/product/${id}`,{
            method:'DELETE',
            headers: {
                'requestType': 'deleteProduct'
            }
        });
        
        const data = await res.json();
        M.toast({html:data.message,classes:'green'})
        router.push('/')
    }

    

    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaURI} className="responsive-img pd-image"/>
            <h5>{product.price}</h5>
            <div className="row">
                <div className="col s12">
                    <div className="input-field inline">
                        <input id="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" min="1" className="validate"/>
                        <label htmlFor="quantity">Quantity</label>
                    </div>
                    <button 
                        className="btn waves-effect waves-light blue"
                        onClick={()=>addToCart()}
                    >Add To Card
                        <i className="material-icons right">add</i>
                    </button>
                </div>
            </div>
            <p>{product.description}</p>
            {user?.role === 'admin' &&
                <button data-target="modal1" className="btn waves-effect waves-light red modal-trigger">Delete Product
                    <i className="material-icons right">delete</i>
                </button>
            }
            {getModal()}
        </div>
    )
}


export async function getStaticProps({params:{id}}) {
    
    const res = await fetch(`${baseurl}api/product/${id}`, {
        method: 'GET',
        headers: {
            'requestType': 'getProduct'
        }
    })
    const data = await res.json();
    return {
      props: {product:data},
    }
}

export async function getStaticPaths() {
    return {
      paths: [
        { params: { id:"609cc24c0a0b3c24b5c54159" } } 
      ],
      fallback: true
  }
}
