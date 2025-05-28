import React from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const AdminHome = () => {

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];

    return (
        <div>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex flex-col items-center p-5' style={{ marginTop: '-6px' }}>
                    <AdminSidebar />
                </div>

                <div className='p-10'>
                    <div className='md:grid grid-cols-3'>
                        <div className='px-5 md:mb-0 mb-5'>
                            <div className='flex md:px-10 px-5 py-10  rounded bg-blue-900 text-white'>
                                <FontAwesomeIcon icon={faBook} className='fa-3x' />
                                <div className='px-5 text-center'>
                                    <p >Total Number of Books</p>
                                    <h1 className='text-5xl'>100 +</h1>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 md:mb-0 mb-5'>
                            <div className='flex md:px-10 px-5 py-10  rounded bg-green-900 text-white'>
                                <FontAwesomeIcon icon={faUsers} className='fa-3x' />
                                <div className='px-5 text-center'>
                                    <p >Total Number of Users</p>
                                    <h1 className='text-5xl'>100 +</h1>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 md:mb-0 mb-2'>
                            <div className='flex md:px-10 px-5 py-10  rounded bg-yellow-500 text-white'>
                                <FontAwesomeIcon icon={faUserTie} className='fa-3x' />
                                <div className='px-2 text-center'>
                                    <p >Total Number of Employee</p>
                                    <h1 className='text-5xl'>100 +</h1>
                                </div>
                            </div>
                        </div>



                    </div>


                    <div className='md:grid grid-cols-2 mt-10'>
                        <div className='w-full h-80'>
                            <ResponsiveContainer width="100%" height="100%"> {/* To make the barchart responsive with the parent tag*/}
                                <BarChart data={data}> {/*indicate the chart  data-attribute(hold the data to be displayed) */}
                                    <CartesianGrid strokeDasharray="3 3" /> {/*grid dash - 3px 3px gap*/}
                                    <XAxis dataKey="name" /> {/* represent xaxis */}
                                    <YAxis />   {/* represent yaxis - related to the data displayed */}
                                    <Tooltip />{/* indicate the data -square */}
                                    <Legend />  {/* data fetch with the help of legend */}
                                    <Bar dataKey="pv" fill="#8884d8" /> {/* indicate bar datakey - data to display fill  -color*/}
                                    <Bar dataKey="uv" fill="#82ca9d" /> {/* indicate bar datakey*/}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='w-full h-80'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <PieChart width={730} height={250}>
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                </PieChart>
                            </ResponsiveContainer>
                            {/*cx - cy -50% - center vertically,horizontally */}
                        </div>
                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}

export default AdminHome