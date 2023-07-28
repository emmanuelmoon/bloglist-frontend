import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappuser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const increaseLike = async (updatedBlog) => {
    try {
      const response = await blogService.update(updatedBlog)
      console.log(response)
      setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? response : blog))
    } catch (e) {
      console.error(e)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()

  const handleAddBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blog)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // })
    }
  }

  const addBlog = (event) => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm addBlog={handleAddBlog}/>
    </Togglable>
  )

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappuser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
      <Notification message={errorMessage} messageClass='error' />
        {loginForm()}
      </div>
    )
  }

  const compareFn = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} messageClass='success' />
      <p>{user.name} logged in</p>
      <form onSubmit={logout}>
        <button type="submit">logout</button>
      </form>

      <h2>create new</h2>
      {addBlog()}
      {blogs.sort(compareFn).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likePost={increaseLike}/>
      )}
    </div>
  )
}

export default App