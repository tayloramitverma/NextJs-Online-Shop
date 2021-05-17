import Link from 'next/link'
import baseurl from '../helpers/baseUrls'

const Home = (props) => {
  return (
        <div className="row">
          {
            props.products.map(product=>{
              return(
                <div className="col s3" key={product._id}>
                  <div className="card">
                    <div className="card-image">
                      <img src={product.mediaURI} className="pimage"/>
                      <span className="card-title">{product.name}</span>
                    </div>
                    <div className="card-content">
                      <p>Price: {product.price}</p>
                    </div>
                    <div className="card-action">
                      <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View Product</a></Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${baseurl}api/product/getproducts`, {
    method:'GET',
    headers:{
      'requestType':'getProducts'
    }
  });
  const data = await res.json();
  return {
    props: {products:data}, // will be passed to the page component as props
  }
}

export default Home;