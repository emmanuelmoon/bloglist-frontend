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
    if((blog.user.username === user.username) && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
    }

  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return <button id='delete' onClick={() => deleteBlog(blog)}>remove</button>
    }
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} {' '}
      <button id='view' onClick={toggleVisibility} className='toggleVisibility'>{buttonText}</button>
      <div style={allVisible} className='blogInside'>
        <a href={blog.url}>{blog.url}</a> <br />
      likes {blog.likes} <button id='like' onClick={() => increaseLike(blog)}>like</button> <br />
        {blog.user.name} <br />
        {removeButton()}
      </div>
    </div>)
}

export default Blog