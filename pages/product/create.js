import {useState} from 'react'
import {useRouter} from 'next/router'
import baseurl from '../../helpers/baseUrls'
import {parseCookies} from 'nookies'

function Create() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [media, setMedia] = useState('')

    const router = useRouter()

    const createProduct = async (e) =>{
        e.preventDefault()

        const data = new FormData();
        data.append("file", media)
        data.append("upload_preset", "instagram-clone")
        data.append("cloud_name", "beingidea123")

        const imageRes = await fetch("https://api.cloudinary.com/v1_1/beingidea123/image/upload", {
            method:"post",
            body:data
        })

        const imageData = await imageRes.json()
        
        const res = await fetch(`${baseurl}api/product/create`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "requestType": "createProduct"
            },
            body:JSON.stringify({
                name,
                price,
                mediaURI:imageData.url,
                description
            })
        })

        const resData = await res.json()

        if(resData.err){
            M.toast({html:resData.err,classes:'red'})
        }else{
            M.toast({html:resData.message,classes:'green'})
            router.push('/')
        }

        
    }

    return (
        <div className="container user-auth-card card center">
            <h1>Create Product</h1>
            <form onSubmit={(e)=>createProduct(e)}>
                <input 
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>File</span>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e)=>setMedia(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <img className="responsive-img" src={media?URL.createObjectURL(media):""}/>
                <textarea
                    name="description"
                    placeholder="Description" 
                    className="materialize-textarea"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                >
                </textarea>

                <button className="btn waves-effect waves-light blue" type="submit">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default Create


export async function getServerSideProps(context) {
    const cookie = parseCookies(context)

    const user = cookie.userdata ? JSON.parse(cookie.userdata) : ""

    if(user.role !== 'admin'){
        const {res} = context
        res.writeHead(302,{Location:'/profile'})
        res.end()
    }

    return{
        props:{}
    }
}