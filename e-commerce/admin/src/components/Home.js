import React, { Component } from 'react'
import axios from 'axios';


export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts : []
    }
  }

  componentDidMount(){
    this.retrievePosts();
  }

  retrievePosts(){
    axios.get("/posts/get").then(res =>{
      if(res.data.code === "00"){
        this.setState({
          posts:res.data.content
        });

      console.log(this.state.posts, " this.state.posts")

      };
    });
  }

  handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Send the API call to delete the post here
      axios.delete(`/posts/delete/${postId}`).then((res) => {
        if (res.data.code === '00') {
          // Post deleted successfully, refresh the list
          this.retrievePosts();
        } else {
          // Handle the error if necessary
        }
      });
    }
  };

  render() {
    return (
      <div className="container">

<div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded heading ">
<h3>Manage Products with Ease - Your Complete Product Details Table</h3>
</div>
        

        <table class="table table-success ttable-sm">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Prev Price (LKR)</th>
                <th scope='col'>New Price (LKR)</th>
                <th scope='col'>Color</th>
                <th scope='col'>Category</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
            {this.state.posts.map((posts,index) =>(
                <tr key={index}>
                  <th scope='row'>{index+1}</th>
                  <td><a  style={{textDecoration: 'none', color : 'black'}}>{posts.title}</a></td>
                  <td><a style={{textDecoration: 'none', color : 'black'}}>{posts.prevPrice}</a></td>
                  <td><a style={{textDecoration: 'none', color : 'black'}}>LKR {posts.newPrice}</a></td>
                  <td><a style={{textDecoration: 'none', color : 'black'}}>{posts.color}</a></td>
                  <td><a style={{textDecoration: 'none', color : 'black'}}>{posts.category}</a></td>

                  <td>
                    <a className="btn btn-warning" href={`/post/${posts.title}`}>
                      <i className='fas fa-edit'></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className='btn btn-danger' onClick={() => this.handleDeletePost(posts._id)}>
                      <i className='far fa-trash-alt'></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
            ))}
            </tbody>
        </table>


        <button className='btn btn-success'><a href='/add' style={{textDecoration: 'none', color :'white' }}>Creat New Post++</a></button>
      </div>
    )
  };
};
