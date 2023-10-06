import React, { useState, useEffect } from 'react';
import '../dashComponenet/expStyle.css';
import {  updateData, deleteData } from './expApi';

const Experience = () => {
    const [data, setData] = useState([]);
    const [api, setApi] = useState('https://localhost-000.onrender.com/Experience/');
    const [newData, setNewData] = useState({
        title: '',
        firstblue: '',
        secondblue: '',
        firstblack: '',
        secondblack: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setData(data.data);
                console.log('Fetched data:', data);
            } else {
                console.error('Failed to fetch data from the API.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value,
        });
    };

    // const handleAddClick = () => {
    //     postData(newData);
    //     fetchData();
    //     setNewData({
    //         title: '',
    //         firstblue: '',
    //         secondblue: '',
    //         firstblack: '',
    //         secondblack: '',
    //     });
    // };
    const handleEditClick = (_id) => {
        setIsEditing(true);
        setEditItemId(_id);
        // console.log("edit", _id)
        const itemToEdit = data.find((data) => data._id === _id);
        if (itemToEdit) {
            setNewData(itemToEdit);
        }
    };

   const handleUpdateClick = async () => {
    const { _id, ...updatedDataWithoutId } = newData;
    // console.log("update", _id);
    // console.log("editItemId:", editItemId);
    //     console.log("newData:", newData);
    await updateData(editItemId, updatedDataWithoutId);
    await fetchData();

    setIsEditing(false);
    setEditItemId(null);
    setNewData({
        title: '',
        firstblue: '',
        secondblue: '',
        firstblack: '',
        secondblack: '',
    });
};

    
    const handleDeleteClick = (id) => {
        // console.log(id)
        deleteData(id);
        fetchData();
    };


    return (
        <div>
            <h2 className='exp-title'>Experience</h2>
            <div className="container-exp">
                <div className="item_exp">
                    {/* {console.log("data", data)} */}
                {data.length > 0 ? (
    data.map((data) => (
        <div key={data._id} className='item_list'>
            <p>{data.title}</p>
            <p>{data.firstblue}</p>
            <p>{data.secondblue}</p>
            <p>{data.firstblack}</p>
            <p>{data.secondblack}</p>
            {isEditing && editItemId === data._id ? (
                <button onClick={handleUpdateClick}>Update</button>
            ) : (
                <div className='exp_btns'>
                <button onClick={() => handleEditClick(data._id)}>Edit</button>
                <button onClick={() => handleDeleteClick(data._id)}>Delete</button>
                </div>
                )}
                
                
        </div>
    ))
) : (
    <p>No data available</p>
)}

<div className='list-data'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="firstblue"
                        placeholder="First Blue"
                        value={newData.firstblue}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="secondblue"
                        placeholder="Second Blue"
                        value={newData.secondblue}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="firstblack"
                        placeholder="First Black"
                        value={newData.firstblack}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="secondblack"
                        placeholder="Second Black"
                        value={newData.secondblack}
                        onChange={handleInputChange}
                    />
                    </div>
                    {/* {!isEditing && (
                        <button onClick={handleAddClick}>Add</button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Experience;