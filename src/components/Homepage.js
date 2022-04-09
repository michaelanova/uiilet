import React, { useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/')
      }
    })
  }, [])

  const handleSignOut = (e) => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((err) => alert(err.message))
  }

  return (
    <div>
      <h1>UiiLet</h1>

      <button onClick={handleSignOut} type="submit">
        Sign out
      </button>
    </div>
  )
}
