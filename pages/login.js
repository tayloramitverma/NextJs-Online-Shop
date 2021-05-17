import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import baseurl from '../helpers/baseUrls'
import cookie from 'js-cookie'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const loginUser = async (e) =>{
        e.preventDefault()

        const res = await fetch(`${baseurl}api/user`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "requestType": "loginUser"
            },
            body:JSON.stringify({
                email,
                password
            })
        })

        const resData = await res.json()

        if(resData.err){
            M.toast({html:resData.err,classes:'red'})
        }else{
            cookie.set('token',resData.token)
            cookie.set('userdata',resData.user)
            M.toast({html:resData.message,classes:'green'})
            router.push('/profile')
        }
    }

    return (
        <div className="container user-auth-card card center">
            <h1>Login</h1>
            <form onSubmit={(e)=>loginUser(e)}>
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

                <button className="btn waves-effect waves-light blue" type="submit">Login
                    <i className="material-icons right">forward</i>
                </button>
                <Link href="/register"><a><h5>Don't have an Account ?</h5></a></Link>
            </form>
        </div>
    )
}

export default Login
