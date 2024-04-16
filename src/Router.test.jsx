import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router, Route, Link } from './index.jsx'
import { getCurrentPath } from './utils/getCurrentPath.js'

vi.mock('./utils/getCurrentPath.js', () => ({ getCurrentPath: vi.fn() }))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should work without crashing', () => {
    render(<Router />)
    expect(true).toBeTruthy()
  })

  it('should render the default component', () => {
    render(<Router defaultComponent={() => <h1>Default Component</h1>} />)
    expect(screen.getByText('Default Component')).toBeTruthy()
  })

  it('should render the component from the route', () => {
    getCurrentPath.mockReturnValue('/test')
    const routes = [{ path: '/test', Component: () => <h1>Test Component</h1> }]
    render(<Router routes={routes} />)
    expect(screen.getByText('Test Component')).toBeTruthy()
  })

  it('should render the proper component when using Link to navigate', async () => {
    getCurrentPath.mockReturnValueOnce('/')
    render(
      <>
        <Router>
          <Route path='/' Component={() => <Link to='/test'>Link</Link>} />
          <Route path='/test' Component={() => <h1>Test Component</h1>} />
        </Router>
      </>
    )
    const button = screen.getByText('Link')
    fireEvent.click(button)

    const testComponent = await screen.findByText('Test Component')

    expect(testComponent).toBeTruthy()
  })
})
