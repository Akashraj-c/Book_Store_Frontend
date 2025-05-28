import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextShare'
import { toast, ToastContainer } from 'react-toastify'

const Home = () => {

  const [homeBook, setHomeBook] = useState([])
  const { searchKey, setSearchKey } = useContext(searchKeyContext)
  console.log(searchKey);
  
  const navigate = useNavigate()

  const getAllHomeBook = async () => {
    const result = await homeBookApi()
    console.log(result);
    if (result.status == 200) {
      setHomeBook(result.data)
    }
  }
  // console.log(homeBook);


  const handleSearch = ()=>{
    console.log('inside searchKey');
    const token = sessionStorage.getItem("token")

    if(searchKey == ""){
      toast.info("please enter the title of the book")
    }
    else if(!token){
            toast.info("please login")
            setTimeout(()=>{
              navigate('/login')
            },2500)
    }
    else if(token && searchKey){
      navigate('allbooks')
    }
    else{
      toast.error('something went wrong')
    }
    
  }

  useEffect(() => {
    setSearchKey("")
    getAllHomeBook()
  }, [])

  return (
    <>
      <Header />

      <header className='flex justify-center items-center'>
        <div id='main' className='flex justify-center items-center w-full'>
          <div className='md:grid grid-cols-3 w-full'>
            <div></div>
            <div className='text-white flex justify-center items-center flex-col px-5'>
              <h1 className='text-5xl font-bold'> Wonderful gifts</h1>
              <p>Give your family and friends a book</p>

              <div className='flex mt-10 w-full'>
                <input type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='Search books' className='p-2 bg-white rounded-3xl placeholder-gray-400 w-full text-black outline-gray-300' />
                <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='text-blue-800' style={{ marginTop: '11px', marginLeft: '-30px' }} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* new Arrivals */}
      <section className='flex justify-center items-center flex-col md:p-10 p-5'>
        <h1 className='text-center text-3xl font-medium'>NEW ARRIVALS</h1>
        <h6 className='text-center'>Explore Our Latest Collection</h6>

        <div className='md:grid grid-cols-4 w-full mt-5 '>

          {
            homeBook.length > 0 ?
              homeBook?.map((item, index) => (
                <div key={index} className='p-5 '>
                  <div className='p-3 shadow-2xl rounded-lg'>
                    <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} className='rounded-lg' />
                    <div className='flex justify-center items-center flex-col mt-3'>
                      <p className='font-bold'>{item?.publisher}</p>
                      <h3>{item?.title}</h3>
                      <p>{item?.price}</p>
                    </div>
                  </div>
                </div>
              ))
              :
              <p>Loading....</p>
          }

        </div>

        <div className='flex justify-center items-center my-5'>
          <Link to='/allbooks'><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
        </div>
      </section>

      {/* author */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2'>
          <div>
            <div className='flex justify-center items-center flex-col'>
              <h3 className='text-3xl font-medium'>FEATURED AUTHORS</h3>
              <h3>Captivates with every word</h3>
            </div>
            <p className='text-justify mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti excepturi possimus assumenda! Consequuntur, omnis modi numquam asperiores eligendi facilis, vero impedit ipsum rerum perspiciatis sunt officia. Voluptatum iste commodi inventore!
              Facere voluptas a ullam sit possimus odio iusto? Totam consectetur sit reiciendis voluptate sed necessitatibus commodi illum aspernatur alias voluptatem explicabo sapiente dolorem soluta eius quasi, placeat velit iusto tempore.</p>

            <p className='text-justify mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti excepturi possimus assumenda! Consequuntur, omnis modi numquam asperiores eligendi facilis, vero impedit ipsum rerum perspiciatis sunt officia. Voluptatum iste commodi inventore!
              Facere voluptas a ullam sit possimus odio iusto? Totam consectetur sit reiciendis voluptate sed necessitatibus commodi illum aspernatur alias voluptatem explicabo sapiente dolorem soluta eius quasi, placeat velit iusto tempore.</p>
          </div>

          <div className='px-10 pt-8'>
            <img src="https://img.freepik.com/premium-photo/executive-elegance-business-people-photo_960396-71415.jpg" alt="no image" className='w-full' />
          </div>
        </div>
      </section>

      {/* testimonial */}
      <div className='flex justify-center items-center flex-col md:py-10 md:px-40 p-6'>
        <h3 className='text-3xl font-medium'>TESTIMONIAL</h3>
        <h3 >See What Others Are Saying</h3>
        <img src="https://tse2.mm.bing.net/th?id=OIP.kP38llwxOXh-Xpa8aLocegHaLG&pid=Api&P=0&h=180" alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} className='mt-5' />
        <h6>Bruce wayne</h6>
        <p className='mt-3 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio voluptate repudiandae consequuntur a vel blanditiis culpa dolore. Qui doloremque doloribus quasi eaque saepe illum inventore id, impedit ratione asperiores.
          Mollitia illum expedita recusandae voluptates? Nulla totam odit dolores necessitatibus aliquam expedita repellat eum fugiat consequatur, obcaecati modi nesciunt ipsum cupiditate quae iusto impedit voluptatem? Amet, exercitationem. Officiis, nostrum in.</p>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={1000} />

      <Footer />
    </>
  )
}

export default Home