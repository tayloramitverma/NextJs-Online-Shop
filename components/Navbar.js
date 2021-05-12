import Link from 'next/link'
import {useRouter} from 'next/router';

const NavBar = () => {
    const router =  useRouter();

    const isActive = (route) => {
        if(route==router.pathname){
            return 'active'
        }else{
            return ''
        }
    }

    return(
        <nav>
            <div className="nav-wrapper #0288d1 light-blue darken-2">
                <Link href="/"><a className="brand-logo">Logo</a></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className={isActive('/')}><Link href="/"><a>Home</a></Link></li>
                    <li className={isActive('/profile')}><Link href="/profile"><a>Profile</a></Link></li>
                    <li className={isActive('/aboutus')}><Link href="/aboutus"><a>About Us</a></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;