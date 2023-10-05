import React, { useEffect, useState } from "react";

function Blogs() {
    const [blogData, setBlogData] = useState([]);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editedBlogContent, setEditedBlogContent] = useState({
        blogtitle: "",
        description: "",
        blogimage: "",
        imagedes: ""
    });
    const [fileInput, setFileInput] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    useEffect(() => {
        // Fetch data from your API
        fetch("http://localhost:5000/blog/getblog")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setBlogData(data.data);
                } else {
                    console.error("API response does not have the expected structure:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleEditClick = (blogId, blogContent) => {
        setEditingBlogId(blogId);
        setEditedBlogContent(blogContent);
    };

    const handleSaveClick = (blogId) => {
        // Send an API request to update the blog with the specified ID
        const updatedBlog = editedBlogContent;
        fetch(`http://localhost:5000/blog/update/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBlog),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // After successful update, fetch the updated data from the API
                fetchUpdatedData();
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });

        // Clear the editing state
        setEditingBlogId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBlogContent({
            ...editedBlogContent,
            [name]: value,
        });
    };

    const handleFileInputChange = (e) => {
        setFileInput(e.target.files[0]);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', fileInput);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.imageUrl;

                // Update the edited blog content with the uploaded image URL
                setEditedBlogContent({
                    ...editedBlogContent,
                    blogimage: imageUrl,
                });
            } else {
                console.error('Error uploading the file.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUpdatedData = () => {
        // Fetch updated data from your API after an update
        fetch("http://localhost:5000/blog/getblog")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setBlogData(data.data);
                } else {
                    console.error("API response does not have the expected structure:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching updated data: ", error);
            });
    };

    return (
        <div>
            <h1 className="titre1">Latest Blogs</h1>
            {blogData.map((blog, index) => (
                <div key={index} className={`B${index}`} style={{ border: '1px solid black' }}>
                    <img
                        className={`blog-image${index}`}
                        src={blog.blogimage}
                        alt={blog.imagedes}
                    />
                    {editingBlogId === blog._id ? (
                        <div className={`blog${index}`}>
                            <input
                                type="text"
                                name="blogtitle"
                                value={editedBlogContent.blogtitle}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="description"
                                value={editedBlogContent.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="blogimage"
                                value={editedBlogContent.blogimage}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="imagedes"
                                value={editedBlogContent.imagedes}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileInputChange}
                            />
                            <button onClick={() => handleSaveClick(blog._id)}>Save</button>
                            <button onClick={() => setEditingBlogId(null)}>Cancel</button>
                            <button onClick={handleImageUpload}>Upload Image</button>
                        </div>
                    ) : (
                        <div className={`blog${index}`}>
                            <div className="text">
                                <p>{blog.blogtitle}</p>
                                <p>{blog.description}</p>
                            </div>
                            <button onClick={() => handleEditClick(blog._id, blog)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Blogs;
