import NavBar from './Navbar'
import Head from 'next/head'

const Layout=({children})=>{
    return(
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
            <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <NavBar />
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}

export default Layout;