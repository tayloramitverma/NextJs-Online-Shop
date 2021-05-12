import {useState} from 'react'

function Create() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [media, setMedia] = useState('')

    const createProduct = (e) =>{
        e.preventDefault()
        
    }

    return (
        <div className="container">
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
