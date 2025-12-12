import Router from './Router.tsx'
import { BrowserRouter} from 'react-router-dom'
import './App.css'

function Root() {
  
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default Root
