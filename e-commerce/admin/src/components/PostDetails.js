import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./file.css"

const PostDetails = () => {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null); // New state variable for original post data
  const [isEditing, setIsEditing] = useState(false); // New state variable for edit mode

  useEffect(() => {
    retrievePost(title);
  }, [title]);

  const retrievePost = (title) => {
    axios.get(`/post/getById/${title}`).then((res) => {
      if (res.data.code === '00') {
        setPost(res.data.content);
        setOriginalPost(res.data.content); // Set originalPost when data is fetched

      }
    });
  };

  // Event handler to update the post state when input values change
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [id]: value,
    }));
  };

  // Event handler for the "Save Changes" button
  const handleSaveChanges = () => {
    axios.put(`/posts/update/${post._id}`, post) // Assuming you have an API endpoint for updating posts
      .then((res) => {
        // Handle success response if needed
        console.log('Post updated successfully!');
        setIsEditing(false); // Disable edit mode after saving changes
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error updating post:', error);
      });
  };

  // Event handler for the "Cancel" button
  const handleCancel = () => {
    setPost(originalPost); // Reset post data to the original data
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="container">
<div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded heading ">
<h3>Update Product Details</h3>
</div>
      
      {post ? (
        <div className='container-md'>
        
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              value={post.title}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input fields if not in edit mode
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="company"
              placeholder="Company"
              value={post.company}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input fields if not in edit mode
            />
            <label htmlFor="company">Company</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            type="text" 
            className="form-control" 
            id="category" 
            placeholder="Category" 
            value=	{post.category} 
            onChange={handleInputChange}
              disabled={!isEditing}
              />
              <label htmlFor="category">Category</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number"
            className="form-control" 
            id="prevPrice" 
            placeholder="previousPrice" 
            value={post.prevPrice} 
            onChange={handleInputChange}
              disabled={!isEditing}/>
              <label htmlFor="previousPrice">previous Price</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" 
            className="form-control" 
            id="newPrice" 
            placeholder="NewPrice" 
            value={post.newPrice} 
            onChange={handleInputChange}
              disabled={!isEditing}/>
              <label htmlFor="NewPrice">New Price</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select"
              id="color"
              aria-label="Floating label select example"
              value={post.color}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable select field if not in edit mode
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="White">White</option>
            </select>
            <label htmlFor="color">Works with selects</label>
          </div>

          {/* Save Changes button */}
          {isEditing ? (
            <div>
            <button className="btn btn-primary me-2 position" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className="btn btn-secondary position" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          ) : (
            <button className="btn btn-primary position" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;