import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewTodo = () => {
    const navigate = useNavigate();
    const [dbdata, getDbdata] = useState([]);
    const [searchtitle, setSearchtitle] = useState()

    const [Title, setTitle] = useState("Title");
    const [Status, setStatus] = useState("Status");

    // Get Data fromDatabase
    useEffect(() => {
        axios.get('http://localhost:3001/view')
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Delete Data From Database
    const deleteData = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                console.log("Deleting element sent to Server");
            })
            .catch((err) => { console.log(err) });
        // reload the current page after delete an element
        window.location.reload(false);
    }

    // Redirect to Update page
    const updateData = (id) => {
        navigate(`/update/${id}`);
    }

    // Get Searching Values
    const searchValue = (title) => {
        setSearchtitle(title)
        axios.get(`http://localhost:3001/view-search/${title}`)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Sort List According to Title or Status
    const SortList = (sortval) => {
        const object = { sortBy: sortval }
        axios.post(`http://localhost:3001/sortitem`, object)
            .then((res) => {
                getDbdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {/* Search bar */}
            <input type="text" value={searchtitle} onChange={(event) => { searchValue(event.target.value) }} />

            <table>
                <thead>
                    <tr>
                        <th>Title <button onClick={() => SortList(Title)}>Sort</button></th>
                        <th>Status <button onClick={() => SortList(Status)}>Sort</button></th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {dbdata.map((dbdata, key) => {
                        return <tr className='data-table'>
                            <td>{dbdata.Title}</td>
                            <td>{dbdata.Status}</td>
                            <td> <button onClick={() => updateData(dbdata.dodoID)}>Edit</button> </td>
                            <td> <button onClick={() => deleteData(dbdata.dodoID)}>Delete</button> </td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default ViewTodo;