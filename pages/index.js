import Link from 'next/link'

const Home = (props) => {
  console.log(props.products)
  return (
    <div>
      <h1>Next.js is awesome</h1>
      <p>{props.message}</p>
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
                          <a href="#">This is a link</a>
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
  const res = await fetch('http://localhost:3000/api/test');
  const data = await res.json();

  return {
    props: {message:data.message,products:data.products}, // will be passed to the page component as props
  }
}

export default Home;