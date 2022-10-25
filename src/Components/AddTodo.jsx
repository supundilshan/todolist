import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTodo = () => {
    const [tototitle, setTodototle] = useState("");
    const [ststus, setStatue] = useState("Pending");

    const AddTodo = (e) => {
        // e.preventDefault();

        // Create an object with the data
        const object = { Title: tototitle, Status: ststus }
        // Send Object to the Back end
        axios.post('http://localhost:3001/insert', object)
            .then(() => {
                console.log("Object send to Server");
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <div>
            <form onSubmit={AddTodo}>
                <input type="text" value={tototitle} onChange={(event) => { setTodototle(event.target.value) }} />
                <button>Add Task</button>
            </form>
        </div>
    );
};

export default AddTodo;