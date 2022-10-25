import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdatePopup from './PopUps/UpdatePopup';
import Display from './Display';

const UpdateTodo = () => {
    const navigate = useNavigate()

    //get Updating Id from url
    const { updatingID } = useParams();

    const [popup, setpopup] = useState(0);

    const [dbdata, getDbdata] = useState([]);

    // Get information about updating Data from Database
    useEffect(() => {
        axios.get(`http://localhost:3001/view-update/${updatingID}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // update Database Immediately after setting the status value
    const SubmitOnchange = (value) => {
        const object = { dodoID: updatingID, Status: value }
        axios.put('http://localhost:3001/update', object)
            .then(() => {
                console.log("Value Updated");
            })
            .catch((err) => { console.log(err) });

        setpopup(1);
        // navigate(`/`);
    }

    return (
        <div>
            <form onSubmit={UpdateTodo}>
                {dbdata.map((dbdata, key) => {
                    return <ul>
                        <li><input type="text" value={dbdata.Title} disabled /></li>
                        <li> <select name="desig" id="desig" value={dbdata.Status} onChange={(event) => { SubmitOnchange(event.target.value) }}>
                            <option value={"Pending"}>Pending</option>
                            <option value={"In-Progress"}>In-Progress</option>
                            <option value={"Completed"}>Completed</option>
                        </select></li>
                    </ul>
                })}
            </form>
            <button onClick={() => { navigate(`/`) }}>Back to List</button>
            <div>
                <UpdatePopup />
            </div>

        </div>
    );
};

export default UpdateTodo;