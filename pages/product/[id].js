import baseurl from '../../helpers/baseUrls'
import {useRef, useEffect} from 'react'
import {useRouter} from 'next/router'

export default function Product({product}) {
    const modalRef = useRef(null)
    const router = useRouter()

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
            method:'DELETE'
        });
        
        const data = await res.json();
        M.toast({html:data.message})
        router.push('/')
    }

    useEffect(()=>{
        M.Modal.init(modalRef.current);
    },[])

    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaURL} className="pimage"/>
            <h5>{product.price}</h5>
            <div className="row">
                <div className="col s12">
                    <div className="input-field inline">
                        <input id="quantity" type="number" min="1" className="validate"/>
                        <label for="quantity">Quantity</label>
                    </div>
                    <button className="btn waves-effect waves-light blue">Add To Card
                        <i className="material-icons right">add</i>
                    </button>
                </div>
            </div>
            <p>{product.description}</p>
            <button data-target="modal1" className="btn waves-effect waves-light red modal-trigger">Delete Product
                <i className="material-icons right">delete</i>
            </button>
            {getModal()}
        </div>
    )
}


export async function getServerSideProps(context) {
    
    const res = await fetch(`${baseurl}api/product/${context.params.id}`)
    const data = await res.json();
    return {
      props: {product:data},
    }
}