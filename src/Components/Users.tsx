import './Users.css'
import axios from 'axios';
import Modal from "react-modal";

import { BsArrowDownShort } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiDownloadCloud } from 'react-icons/fi'
import { useEffect, useState } from 'react';

function Users() {
    const [userData, setUserData] = useState([])
    const [errMsg, setErrMsg] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editModalIsOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(0)
    const [startPage, setStartPage] = useState(0)
    const [addUserData, setAddUserData] = useState({
        userName: "",
        userId: "",
        status: "",
        role: "",
        date: "",
        time: ""
    })

    function getUserList() {
        axios.get(`http://localhost:3000/userData?_start=${startPage}&_limit=6`).then((res) => {
            setUserData(res.data)
        }).catch((error) => {
            setErrMsg("Data Not Found")
        })
    }

    function deleteUser(id: number) {
        axios.delete('http://localhost:3000/userData/' + id).then((res) => {
            getUserList()
        })
    }
    function addUser() {
        axios.post('http://localhost:3000/userData/', addUserData).then((res) => {
            console.log(res.data)
            getUserList();
        }).catch((error) => {
            console.log(error);

        })
    }

    function openModal() {
        setIsOpen(true);
       setAddUserData({
        userName: "",
        userId: "",
        status: "",
        role: "",
        date: "",
        time: ""
       })
    }
    function openEditModal() {
        setIsEditOpen(true);
       
    }


    function closeModal() {
        setIsOpen(false);

    }

    function closeEditModal() {
        setIsEditOpen(false);

    }

    function onTextFieldChange(e: any) {
        const { name, value } = e.target;

        setAddUserData((prev) => {
            return {
                ...prev, [name]: value
            }
        })


    }

    function submitData() {
        const { userName, userId, status, role, date, time } = addUserData
        if (userName === "" || userId === "" || status === "" || role === "" || date === "" || time === "") {
            alert("All fields are mandatory")
        } else {
            addUser()
            setIsOpen(false);

        }
    }

    function editUser(id: number) {
        openEditModal()
        setEditId(id)
        setAddUserData({
            userName: "",
            userId: "",
            status: "",
            role: "",
            date: "",
            time: ""
           })
    }

    function submitEditData() {
        axios.put('http://localhost:3000/userData/' + editId, addUserData).then((res) => {
            console.log(res.data);
            getUserList();
            setIsEditOpen(false)
        }).catch((error) => {
            console.log(error);

        })
    }

    function nextPage() {
        if (startPage <= userData.length) {

            setStartPage((prevCount) => prevCount + 6);
        }
    }
    function prevPage() {
        if (startPage >= userData.length) {

            setStartPage((prevCount) => prevCount - 6)
        }
    }

    useEffect(() => {
        getUserList()
    }, [startPage])
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

                        <button onClick={() => { openModal() }} className='btnAddUser'>
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
                        userData.length === 0 && <div className='errContainer'><p>{errMsg}</p></div>
                    }
                    {
                        userData.map((ele) => {
                            const { id, userName, userId, status, role, date, time } = ele
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
                                            <p>{date}</p>
                                            <p className='grayColor'>{time}</p>
                                        </div>

                                        <div className='grayColor' style={{ paddingLeft: "10px", }}>
                                            <span style={{ margin: "0 15px" }}> <button onClick={() => deleteUser(id)} className='deleteIcon'> <RiDeleteBinLine /></button></span>
                                            <span> <button onClick={() => editUser(id)} className='editIcon'><FiEdit2 /> </button> </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>


            </div>
            <div className='paginationBtn' >
                <button onClick={() => prevPage()} className='btnPrev'>Previous</button>
                <button onClick={() => nextPage()} className='btnNext'>Next</button>
            </div>
            <div >
                <Modal
                    isOpen={modalIsOpen}
                    className="modalStyle"
                    onRequestClose={closeModal}
                >
                    <div className='formContainer'>
                        <div>
                            <input placeholder='user name' type="text" name='userName' onChange={onTextFieldChange} value={addUserData.userName} />
                        </div>
                        <div>
                            <input placeholder='user id' type="text" name='userId' onChange={onTextFieldChange} value={addUserData.userId} />
                        </div>
                        <div>
                            <input placeholder='status' type="text" name='status' onChange={onTextFieldChange} value={addUserData.status} />
                        </div>
                        <div>
                            <input placeholder='role' type="text" name='role' onChange={onTextFieldChange} value={addUserData.role} />
                        </div>
                        <div>
                            <input type="date" name="date" onChange={onTextFieldChange} value={addUserData.date} />
                        </div>
                        <div>
                            <input type="time" name="time" onChange={onTextFieldChange} value={addUserData.time} />
                        </div>
                        <button onClick={() => submitData()} className='btnSubmit' >Submit</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={editModalIsOpen}
                    className="modalStyle"
                    onRequestClose={closeEditModal}
                >
                    <div className='formContainer'>
                        <div>
                            <input placeholder='user name' type="text" name='userName' onChange={onTextFieldChange} value={addUserData.userName} />
                        </div>
                        <div>
                            <input placeholder='user id' type="text" name='userId' onChange={onTextFieldChange} value={addUserData.userId} />
                        </div>
                        <div>
                            <input placeholder='status' type="text" name='status' onChange={onTextFieldChange} value={addUserData.status} />
                        </div>
                        <div>
                            <input placeholder='role' type="text" name='role' onChange={onTextFieldChange} value={addUserData.role} />
                        </div>
                        <div>
                            <input type="date" name="date" onChange={onTextFieldChange} value={addUserData.date} />
                        </div>
                        <div>
                            <input type="time" name="time" onChange={onTextFieldChange} value={addUserData.time} />
                        </div>
                        <button onClick={() => submitEditData()} className='btnSubmit' >Submit</button>
                    </div>
                </Modal>
            </div>

        </div>
    );
}

export default Users;
