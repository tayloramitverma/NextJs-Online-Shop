import {useState,useEffect} from 'react'
import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrls'

function UserRoles(){
    const [users,setUsers] = useState([])
    const {token} = parseCookies()

    useEffect(()=>{
       fetchUser()
    },[])

    const fetchUser = async ()=>{
    const res =  await fetch(`${baseUrl}api/user`,{
        headers:{
            'requestType':'getUsers',
            'Authorization':`Bearer ${token}`
        }
      })
      const data = await res.json()
      setUsers(data)
    }

    const handleRole = async (id,role)=>{
        const res =  await fetch(`${baseUrl}api/user`,{
            method:"PUT",
            headers:{
                'requestType':'updateRole',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                id,
                role
            })
        })
        const data = await res.json()
        const updatedUsers =  users.map(user=>{
            if((user.role !== data.role) && (user.email === data.email)){
                return data
            }else{
                return user
            }
        })
        setUsers(updatedUsers)
    }

    return(
    <>
        <ul className="collection with-header">
            <li className="collection-header"><h4>User Roles</h4></li>
            <li>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                            {users.map(item=>{
                                return(
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td className="update-role" onClick={()=>handleRole(item._id,item.role)}>{item.role}</td>
                                    </tr>  
                                )
                            })}
                     </tbody>
                </table>
            </li>
        </ul>
    </>
    )
}

export default UserRoles