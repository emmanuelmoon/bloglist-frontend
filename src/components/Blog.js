import { useState } from "react"

const Blog = ({ blog, user, likePost }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const allVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'view' ? 'hide': 'view')
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
    likePost(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} {' '}
    <button onClick={toggleVisibility}>{buttonText}</button>
    <div style={allVisible}>
      <a href={blog.url}>{blog.url}</a> <br />
      likes {blog.likes} <button onClick={() => increaseLike(blog)}>like</button> <br />
      {blog.user.name === undefined ? user.name: blog.user.name} <br />
    </div>
  </div>)
}

export default Blog