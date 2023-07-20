import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        'loggedBlogappuse', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // })
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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title, author, url, 
      }

      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (exception) {
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // })
    }
  }

  const addBlog = (event) => (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
        type="author"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
        type="url"
        value={url}
        name="URL"
        onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappuse')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <form onSubmit={logout}>
        <button type="submit">logout</button>
      </form>

      <h2>create new</h2>
      {addBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App