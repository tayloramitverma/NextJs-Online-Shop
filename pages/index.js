import Link from 'next/link'

const Home = (props) => {
  return (
    <div>
        <div className="rootcard">
          {
            props.products.map(product=>{
              return(
                <div className="card" key={product._id}>
                  <div className="card-image">
                    <img src={product.mediaURL} className="pimage"/>
                    <span className="card-title">{product.name}</span>
                  </div>
                  <div className="card-content">
                    <p>{product.description}</p>
                  </div>
                  <div className="card-action">
                    <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View Product</a></Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      <Link href="/profile"><a>Go to Profile!</a></Link>
      <style jsx>
        {
          `
            h1{
              color:green;
            }
            .pimage{
              width:200px;
              height:300px;
            }
            .rootcard{
              display:flex;
              flex-warp:warp
            }
            .card{
              max-width:45%;
              margin:20px;
            }
          `
        }
      </style>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  return {
    props: {products:data}, // will be passed to the page component as props
  }
}

export default Home;