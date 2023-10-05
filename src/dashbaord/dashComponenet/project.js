import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Project() {
    const [projectData, setProjectData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({
        projectimage1: "",
        link1: "",
        projectimage2: "",
        link2: "",
        description: "",
    });
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [showImageUpload, setShowImageUpload] = useState(false);

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:5000/project/getproject")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data && data.data.length > 0) {
                    setProjectData(data.data[0]);
                    setEditedData(data.data[0]);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        setShowImageUpload(true);
    };

    const handleSaveClick = () => {
        // Perform the update to the API with the edited data
        fetch(`http://localhost:5000/project/update/${projectData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Update the local projectData with the edited data
                    setProjectData(editedData);
                    setEditMode(false);
                    setShowImageUpload(false);
                } else {
                    console.error("Error updating data:", data.message);
                }
            })
            .catch((error) => console.error("Error updating data:", error));
    };

    const handleCancelClick = () => {
        // Exit edit mode without saving changes
        setEditMode(false);
        setShowImageUpload(false);
        // Reset edited data to the original data
        setEditedData(projectData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedData({ ...editedData, projectimage1: file });
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", editedData.projectimage1);

        try {
            const response = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.imageUrl;
                setUploadedImageUrl(imageUrl);
                setEditedData({ ...editedData, projectimage1: imageUrl });
            } else {
                console.error("Error uploading the file.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="Projects">
            <div className="project-details">
                {projectData && (
                    <div>
                        <h1 className="title">{projectData.title}</h1>
                        <p>{projectData.description}</p>
                        <a href={projectData.link1} target="_blank" rel="noopener noreferrer">
                            <img
                                className="coffee"
                                src={projectData.projectimage1}
                                alt="image1"
                            />
                        </a>
                        <a href={projectData.link2} target="_blank" rel="noopener noreferrer">
                            <img
                                className="coffee"
                                src={projectData.projectimage2}
                                alt="image2"
                            />
                        </a>
                    </div>
                )}
            </div>

            {!editMode && !showImageUpload && (
                <button className="edit-button" onClick={handleEditClick}>
                    Edit
                </button>
            )}

            {showImageUpload && (
                <div className="image-upload-form">
                    <h2>Upload an Image</h2>
                    <form encType="multipart/form-data">
                        <input type="file" onChange={handleFileChange} />
                        <button type="button" onClick={handleImageUpload}>
                            Upload
                        </button>
                    </form>

                    {uploadedImageUrl && (
                        <div>
                            Image URL:{" "}
                            <a
                                href={uploadedImageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "blue" }}
                            >
                                {uploadedImageUrl}
                            </a>
                        </div>
                    )}
                </div>
            )}

            {editMode && (
                <div className="edit-mode">
                    <input
                        type="text"
                        placeholder="Image 1 Source"
                        value={editedData.projectimage1}
                        onChange={(e) =>
                            setEditedData({ ...editedData, projectimage1: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Link 1"
                        value={editedData.link1}
                        onChange={(e) =>
                            setEditedData({ ...editedData, link1: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Image 2 Source"
                        value={editedData.projectimage2}
                        onChange={(e) =>
                            setEditedData({ ...editedData, projectimage2: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Link 2"
                        value={editedData.link2}
                        onChange={(e) =>
                            setEditedData({ ...editedData, link2: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Description"
                        value={editedData.description}
                        onChange={(e) =>
                            setEditedData({ ...editedData, description: e.target.value })
                        }
                    ></textarea>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Project;