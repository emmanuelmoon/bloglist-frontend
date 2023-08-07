import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('tests for display blog', () => {
  const blog = {
    title: 'Snow White and the seven dwarves',
    author: 'Disney',
    url: 'www.disney.com',
    likes: 1,
    user : {
      name: 'Emmanuel',
    }
  }

  const user = {
    name: 'Emmanuel',
  }

  test('only title and author are displayed by default ', async() => {

    const likeBlog = jest.fn()
    const removeBlog = jest.fn()
    const { container } = render(<Blog blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />)

    const blogDisp = container.querySelector('.blog')
    const blogInside = container.querySelector('.blogInside')

    expect(blogDisp).not.toHaveStyle('display: none')
    expect(blogInside).toHaveStyle('display: none')
  })

  test('URL and likes are displayed when the button is clicked', async() => {
    const likeBlog = jest.fn()
    const removeBlog = jest.fn()
    const { container } = render(<Blog blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />)

    const userE = userEvent.setup()
    const blogDisp = container.querySelector('.blog')
    const blogInside = container.querySelector('.blogInside')

    const button = screen.getAllByRole('button')
    await userE.click(button[0])

    expect(blogDisp).not.toHaveStyle('display: none')
    expect(blogInside).not.toHaveStyle('display: none')
  })

  test('Like button is clicked twice', async () => {
    const likeBlog = jest.fn()
    const removeBlog = jest.fn()
    render(<Blog blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />)
    const userE = userEvent.setup()

    const button = screen.getByText('like')
    console.log(button)
    await userE.click(button)
    await userE.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
