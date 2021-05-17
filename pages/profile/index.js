import Link from 'next/link'
import { parseCookies } from 'nookies'

const Profile =()=>{
    return (
        <div>
            <h1>Profile Page</h1>
            <Link href="/"><a>Go to Home!</a></Link>
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

    return{
        props:{}
    }
}