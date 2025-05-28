import { faHouse,faBook,faBagShopping,faScrewdriverWrench,faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/ContextShare'


const AdminSidebar = () => {
    const[sideBarStatus,setSideBarStatusStatus]=useState(false)

    const [HomeStatus, setHomeStatus] = useState(false)
    const [BooksStatus, setBookStatus] = useState(false)
    const [CareerStatus, setCareerStatus] = useState(false)
    const [SettingsStatus, setSettingsStatus] = useState(false)
    const [adminD , setAdminD] = useState({
        username:"",
        profile:""
    })
    const{adminProfileUpdateStatus}=useContext(adminProfileUpdateStatusContext)

    const navigate = useNavigate()

    const filter = (data)=>{
        if(data=='Home'){
            navigate('/adminhome')
        }
        else if(data=='Books'){
            navigate('/admin-books')
        }
        else if(data=='Careers'){
            navigate('/admin-careers')
        }
        else if(data=='Settings'){
            navigate('/admin-settings')
        }
        else{
            navigate('/*')
        }
    }

    useEffect(()=>{
        if(location.pathname=='/adminhome'){
            setHomeStatus(true)
        }
        else if(location.pathname=='/admin-books'){
            setBookStatus(true)
        }
        else if(location.pathname=='/admin-careers'){
            setCareerStatus(true)
        }
        else if(location.pathname=='/admin-settings'){
            setSettingsStatus(true)
        }
        else{
            console.log('no such page');
        }

        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setAdminD({username:user.username , profile:user.profile})
    },[adminProfileUpdateStatus])

  return (
    <>
        <div>
        <img src={adminD.profile==""? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : `${serverUrl}/uploads/${adminD.profile}`} alt="no img" style={{ width: '170px', height: '170px' ,borderRadius:'50%'}} />
        <h1 className='mt-5 text-center'>{adminD.username}</h1>

        <div className='md:hidden mt-2 flex justify-center' onClick={()=>setSideBarStatusStatus(!sideBarStatus)}><FontAwesomeIcon className='text-2xl ' icon={faBars} /></div>

       <div className={sideBarStatus ? 'md:my-5 mt-5 flex flex-col':'my-5 md:flex flex-col  hidden '}>
            <div className='mb-5'>
                <input type="radio" id='Home' name='sidebar' readOnly checked={HomeStatus}/>
                <label className='ms-3' htmlFor="Home" onClick={()=>filter('Home')}><FontAwesomeIcon icon={faHouse} className='me-2' /> Home</label>
            </div>
    
            <div className='mb-5'>
                <input type="radio" id='Books' name='sidebar' readOnly checked={BooksStatus}/>
                <label className='ms-3' htmlFor="Books" onClick={()=>filter('Books')}><FontAwesomeIcon icon={faBook} className='me-2' /> All Books</label>
            </div>
    
            <div className='mb-5'>
                <input type="radio" id='Careers' name='sidebar' readOnly checked={CareerStatus}/>
                <label className='ms-3' htmlFor="Careers" onClick={()=>filter('Careers')}><FontAwesomeIcon icon={faBagShopping} className='me-2'/> Careers</label>
            </div>
            
            <div className='mb-5'>
                <input type="radio" id='Settings' name='sidebar' readOnly checked={SettingsStatus}/>
                <label className='ms-3' htmlFor="Settings" onClick={()=>filter('Settings')}><FontAwesomeIcon icon={faScrewdriverWrench} className='me-2'/> Settings</label>
            </div>
       </div>
        
        </div>
    </>
  )
}

export default AdminSidebar