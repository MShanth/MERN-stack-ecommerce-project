import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
         img:'',
        title:'',
        star:'',
        reviews:'',
        prevPrice:'',
        newPrice:'',
        company:'',
        color:'',
        category:''
    };
  }

  // Event handler for input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Event handler for form submission
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { img,title ,star,reviews,prevPrice,newPrice,company,color,category} = this.state;

    // Perform any validation if needed

    // Save the post using the API or any other method
    // For example, you can use axios to make a POST request to your backend API
    // Replace 'your-api-endpoint' with the actual endpoint to save posts
    axios
      .post('/post/save', {
        img:img,
        title:title,
        star:star,
        reviews:reviews,
        prevPrice:prevPrice,
        newPrice:newPrice,
        company:company,
        color:color,
        category:category
      }).then((response) => {
        // Handle success response if needed
        console.log('Post saved successfully!');
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error saving post:', error);
      });
  };

  render() {
    const { img,title ,star,reviews,prevPrice,newPrice,company,color,category } = this.state;
    return (
      <div>
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded heading ">
<h3>Add Product Details</h3>
</div>
        <form onSubmit={this.handleFormSubmit}>
          {/* <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={this.handleInputChange}
              required
            />
          </div> */}



          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Img Url" 
            id="img" 
            name="img"  
            value={img} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="img">img URL</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Title" 
            id="title" 
            name="title"  
            value={title} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="title">Title</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Star" 
            id="star" 
            name="star"  
            value={star} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="star">Star</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Reviews" 
            id="reviews" 
            name="reviews"  
            value={reviews} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="reviews">Reviews</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Prev Price" 
            id="prevPrice" 
            name="prevPrice"  
            value={prevPrice} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="prevPrice">Prev Price</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="New Price" 
            id="newPrice" 
            name="newPrice"  
            value={newPrice} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="newPrice">New Price</label>
          </div>

          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Company" 
            id="company" 
            name="company"  
            value={company} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="company">Company</label>
          </div>

          {/* <div class="form-floating">
            <input 
            class="form-control" 
            placeholder="Color" 
            id="color" 
            name="color"  
            value={color} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="color">Color</label>
          </div> */}


          <div className="form-floating mb-3">
            <select
              className="form-control"
              id="color"
              aria-label="Color"
              name="color"
              value={color}
              onChange={this.handleInputChange} 
              required
              >
                <option value="">Select a color</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="White">White</option>
            </select>
            <label htmlFor="color">Works with selects</label>
          </div>


          <div class="form-floating mb-3">
            <input 
            class="form-control" 
            placeholder="Category" 
            id="category" 
            name="category"  
            value={category} 
            onChange={this.handleInputChange} 
            required></input>
            <label for="category">Category</label>
          </div>


          <button type="submit" className="btn btn-outline-primary">Save Post</button>
        </form>
      </div>
    );
  }
}
