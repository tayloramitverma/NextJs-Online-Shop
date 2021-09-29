import Layout from '../components/Layout'
import '../styles/gallery-materialize.min.opt.css' 
import '../styles/style.css' 

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
