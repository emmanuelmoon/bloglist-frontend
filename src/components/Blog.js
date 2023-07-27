import { useState } from "react"

const Blog = ({blog}) => {
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

  console.log(blog)

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} {' '}
    <button onClick={toggleVisibility}>{buttonText}</button>
    <div style={allVisible}>
      {blog.url} <br />
      likes {blog.likes} <button>like</button> <br />
      {blog.user.username} <br />
    </div>
  </div>)
}

export default Blog