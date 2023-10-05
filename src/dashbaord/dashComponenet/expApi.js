// add
const postData = async (add) => {
    try {

        const response = await fetch('http://localhost:5000/Experience/addExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(add),
        });

        if (!response.ok) {
            console.error('Failed to add data.');
        }
    } catch (error) {
        console.error('Error adding data:', error);
    }
};


// update
const updateData = async (id, updatedData) => {
    try {
        const response = await fetch(`http://localhost:5000/Experience/updateExp/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            console.error('Failed to update data.');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};



const deleteData = async (_id) => {
    try {
        const response = await fetch(`http://localhost:5000/Experience/delete/${_id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Data deleted successfully.');
        } else {
            console.error('Failed to delete data.');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};




module.exports = { postData, updateData, deleteData };