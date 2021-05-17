import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import baseurl from '../helpers/baseUrls'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const createUser = async (e) =>{
        e.preventDefault()

        const res = await fetch(`${baseurl}api/user`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "requestType": "createUser"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })

        const resData = await res.json()

        if(resData.err){
            M.toast({html:resData.err,classes:'red'})
        }else{
            M.toast({html:resData.message,classes:'green'})
            router.push('/login')
        }
    }

    return (
        <div className="container user-auth-card card center">
            <h1>Registration</h1>
            <form onSubmit={(e)=>createUser(e)}>
                <input 
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="validate"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="btn waves-effect waves-light blue" type="submit">Register
                    <i className="material-icons right">forward</i>
                </button>
                <Link href="/login"><a><h5>Already have an Account ?</h5></a></Link>
            </form>
        </div>
    )
}

export default Register
