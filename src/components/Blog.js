import { useState } from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const allVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'view' ? 'hide': 'view')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = (blog) => {
    console.log(blog)
    const updatedBlog = {
      user: blog.user.id !== undefined ? blog.user.id: user.id,
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    likeBlog(updatedBlog)
  }

  const deleteBlog = (blog) => {
    const username = blog.user.username !== undefined ? blog.user.username: user.username
    if((username === user.username) && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
    }

  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} {' '}
      <button id='view' onClick={toggleVisibility} className='toggleVisibility'>{buttonText}</button>
      <div style={allVisible} className='blogInside'>
        <a href={blog.url}>{blog.url}</a> <br />
      likes {blog.likes} <button id='like' onClick={() => increaseLike(blog)}>like</button> <br />
        {blog.user.name === undefined ? user.name: blog.user.name} <br />
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>)
}

export default Blog