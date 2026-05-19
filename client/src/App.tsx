import { useEffect } from 'react'
import './App.css'
import { useUser } from './store/user.store'

function App() {
  const userId = useUser((state) => state.userId)

  useEffect(() => {
    if(userId) return
    
  },[userId])

  return (
    <>

    </>
  )
}

export default App
