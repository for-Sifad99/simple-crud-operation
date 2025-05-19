import './App.css'
import Users from './components/Users'

const usersPromise = fetch('http://localhost:3002/users').then(res => res.json());
function App() {
  return (
    <>
      <h1>Simple Crud Operation</h1>
      <Users usersPromise={usersPromise}/>
    </>
  )
}

export default App
