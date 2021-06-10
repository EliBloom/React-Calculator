import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import BasicCalculator from '../components/BasicCalculator/BasicCalculator'
import { render, fireEvent, waitFor, screen, debug } from '@testing-library/react'

beforeEach(() => render(<BasicCalculator />))
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

test('The buttons of the Basic Calculator should be rendered', async () => {
    // await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByText('+')).toBeInTheDocument();
    // expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {

    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('alert'))

    // expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    // expect(screen.getByRole('button')).not.toBeDisabled()
})