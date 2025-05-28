import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
    return (
        <>
            <Header />

            <div className='flex justify-center items-center flex-col md:px-40'>
                <h1 className='my-5 text-3xl font-medium'>Contacts</h1>
                <p className='md:text-center text-justify p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsam debitis quam, amet explicabo deserunt dolores odio distinctio asperiores quae dolorum, assumenda temporibus sed possimus perspiciatis ipsum veniam at iure?
                    Libero rem rerum totam tempora, dolor explicabo ipsa delectus maxime numquam odio sapiente cum laboriosam ex aut quas maiores vitae? Impedit repudiandae mollitia obcaecati amet ab fugit similique quibusdam ipsa?</p>
            </div>

            <div className='py-10 md:flex justify-evenly items-center '>
                <div className='flex  items-center justify-center md:mb-0 mb-10'>
                    <div className='bg-gray-300 w-12 h-12 flex justify-center items-center rounded-4xl me-2'>
                        <FontAwesomeIcon icon={faLocationDot} className='text-2xl' />
                    </div>
                    <p>123 Main Street. Apt 4B, <br /> Anytown, CA 91234</p>
                </div>

                <div className='flex items-center  justify-center md:mb-0 mb-10 md:me-0 me-20'>
                    <div className='bg-gray-300 w-12 h-12 flex justify-center items-center rounded-4xl me-2'>
                        <FontAwesomeIcon icon={faPhone} className='text-2xl ' />
                    </div>
                    <p>98474561230</p>
                </div>

                <div className='flex items-center justify-center'>
                    <div className='bg-gray-300 w-12 h-12 flex justify-center items-center rounded-4xl me-2'>
                        <FontAwesomeIcon icon={faEnvelopeOpenText} className='text-2xl' />
                    </div>
                    <p>Bookstore@gmail.com</p>
                </div>
            </div>

            <div className='md:flex justify-evenly my-10 w-full'>
                <div className='flex flex-col justify-center items-center  '>
                    <form className='bg-gray-300 p-5 md:w-md w-sm rounded-md flex flex-col items-center h-full '>
                        <h1 className='font-bold'>Send me Message</h1>
                        <input type="text" placeholder='Name' className='bg-white w-full px-3 py-2 rounded-md mt-8 outline-gray-300' />
                        <input type="text" placeholder='Email ID' className='bg-white w-full px-3 py-2 rounded-md mt-3  outline-gray-300' />
                        <textarea name="" id="" placeholder='Message' className='bg-white w-full px-3 py-2 mt-3 rounded-md h-1/2  outline-gray-300'></textarea>
                        <button className='bg-gray-900 w-full mt-5 px-3 py-2 text-white rounded-md'>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className=' md:w-md w-sm rounded-md md:mt-0 mt-10'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.541959175935!2d76.30948087813945!3d10.008897991648862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1745418712097!5m2!1sen!2sin" style={{ border: '0px' }} width={'100%'} height={'350px'} className='rounded-md' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Contact