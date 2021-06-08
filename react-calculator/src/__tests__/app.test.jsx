
// // test('adds 1 + 2 to equal 3', () => {
// //     expect(sum(1, 2)).toBe(3);
// // });

import React from 'react'
// // import { rest } from 'msw'
// // import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from '../components/App/App'
// import '@testing-library/jest-dom/extend-expect'

// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//         return res(ctx.json({ greeting: 'hello there' }))
//     })
// )
// beforeEach(() => render(BasicCalculator))
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('loads and displays greeting', async () => {
    // render(<Fetch url="/greeting" />)
    render(<App></App>)
    //use this when you are trying to select by aria-label

    //use this when seleceting by class name
    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('heading'))
    screen.debug()
    expect(screen.getByText('+')).toBeInTheDocument();
    // expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
    // server.use(
    //     rest.get('/greeting', (req, res, ctx) => {
    //         return res(ctx.status(500))
    //     })
    // )

    // render(<Fetch url="/greeting" />)

    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('alert'))

    // expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    // expect(screen.getByRole('button')).not.toBeDisabled()
})