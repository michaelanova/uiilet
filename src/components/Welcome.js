import React, { useEffect, useState } from 'react'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import Head from './Head.js'

export default function Welcome() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSignIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage')
      })
      .catch((err) => alert(err.message))
  }

  const handleRegister = () => {
    if (
      registerInformation.email !== registerInformation.confirmEmail ||
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert('Email or password does not match')
      return
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password,
    )
      .then(() => {
        navigate('/homepage')
      })
      .catch((err) => alert(err.message))
  }

  return (
    <div className="welcome">
      <Head />
      <h1>UiiLet</h1>
      <div className="login-container">
        {isRegistering ? (
          <>
            <label for="login">Email</label>
            <input
              type="email"
              name="login"
              id="login"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <label for="Confirmlogin">Email</label>
            <input
              type="email"
              name="Confirmlogin"
              id="Confirmlogin"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />

            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <label for="Comfirmpassword">Comfirmpassword</label>
            <input
              type="password"
              name="Comfirmpassword"
              id="Comfirmpassword"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={handleRegister} type="submit">
              Register
            </button>
            <button onClick={() => setIsRegistering(false)} type="submit">
              Back
            </button>
          </>
        ) : (
          <>
            <label for="login">Email</label>
            <input
              type="email"
              name="login"
              id="login"
              onChange={handleEmailChange}
              value={email}
            />
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button onClick={handleSignIn} type="submit">
              Sign in
            </button>
            <button onClick={() => setIsRegistering(true)} type="submit">
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  )
}
