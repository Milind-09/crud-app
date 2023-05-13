import './Users.css'
import axios from 'axios';
import { BsArrowDownShort } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiDownloadCloud } from 'react-icons/fi'
import { useEffect, useState } from 'react';
function Users() {
    const [userData, setUserData] = useState([])
    function getUserList() {
        axios.get('http://localhost:3000/userData').then((res) => {
            setUserData(res.data)
        })
    }
    useEffect(() => {
        getUserList()
    }, [])
    return (
        <div className='mainContainer'>
            <div >
                <div className='topContainer'>
                    <div>

                        <div className='titleContainer'>
                            <h1>Users</h1>
                            <p className='userStyle'>48 users</p>
                        </div>
                        <div className='descriptionStyle'>
                            <p>Manage your team members and their account permissions here</p>
                        </div>
                    </div>

                    <div className='btnContainer'>
                        <button className='btnDownload'>
                            <FiDownloadCloud />   Download CSV
                        </button>

                        <button className='btnAddUser'>
                            + Add user
                        </button>
                    </div>
                </div>

            </div>
            <div className='mainTableContainer'>
                <div>
                    <div className='tableTitleContainer'>
                        <div className='rowStyle'><p>Name <BsArrowDownShort /></p></div>
                        <div className='rowStyle'><p>Status <BsArrowDownShort /></p></div>
                        <div className='rowStyle'><p>Role <BsArrowDownShort /></p></div>
                        <div className='rowStyle'><p>Last Login <BsArrowDownShort /></p></div>
                    </div>


                    {
                        userData.map((ele) => {
                            const { id, userName, userId, status, role, lastLoginDate, lastLoginTime } = ele
                            return (
                                <div className='listContainer'>
                                    <div className='rowStyle'>
                                        <p>{userName}</p>
                                        <p className='grayColor'>{userId}</p>
                                    </div>
                                    <div className='rowStyle '>
                                        <p className='activeStatus'>{status}</p>
                                    </div>
                                    <div className='rowStyle'>
                                        <p className='grayColor'>{role}</p>
                                    </div>
                                    <div className='editDelContainer'>
                                        <div>
                                            <p>{lastLoginDate}</p>
                                            <p className='grayColor'>{lastLoginTime}</p>
                                        </div>

                                        <div className='grayColor' style={{ paddingLeft: "10px", }}>
                                            <span  style={{ margin: "0 15px" }}> <button className='deleteIcon'> <RiDeleteBinLine /></button></span>
                                            <span> <button className='editIcon'><FiEdit2 /> </button> </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }




                </div>
            </div>
        </div>
    );
}

export default Users;
