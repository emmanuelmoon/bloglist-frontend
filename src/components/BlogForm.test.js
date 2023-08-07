import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('tests for blogForm', () => {
  test('Like button is clicked twice', async () => {
    const createBlog = jest.fn()
    const userE = userEvent.setup()

    render(<BlogForm addBlog={createBlog}/>)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await userE.type(inputs[0], 'Snow White and the seven dwarves')
    await userE.type(inputs[1], 'Disney')
    await userE.type(inputs[2], 'www.disney.com')

    await userE.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toMatchObject({
      title: 'Snow White and the seven dwarves',
      author: 'Disney',
      url: 'www.disney.com',
    })
  })
})
