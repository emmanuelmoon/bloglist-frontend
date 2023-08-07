import { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    addBlog({
      title, author, url,
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
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
}

export default BlogForm