import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'

function App () {
  return (
    <>
      <Router>
        <Route path='/' Component={() => <h1>Home</h1>} />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    </>
  )
}

export default App
