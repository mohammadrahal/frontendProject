// update
const updateData = async (id, updatedData) => {
    try {
        const response = await fetch(`https://localhost-000.onrender.com/Experience/updateExp/${id}`, {
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
        const response = await fetch(`https://localhost-000.onrender.com/Experience/delete/${_id}`, {
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




export default { updateData, deleteData };