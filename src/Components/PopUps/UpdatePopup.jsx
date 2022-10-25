import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePopup = () => {
    const navigate = useNavigate()
    return (
        <div>
            Updated
            <button onClick={() => navigate(`/`)}>OK </button>
        </div>
    );
};

export default UpdatePopup;