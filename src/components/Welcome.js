import React, { useEffect, useState } from 'react'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'


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
      <h1 className='title is-1 has-text-centered'>Přihlášení</h1>
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet
is-half-desktop
is-one-third-widescreen
is-one-quarter-fullhd">
          <div className='box'>
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
                <button onClick={handleRegister} type="submit" className="button">
                  Register
                </button>
                <button onClick={() => setIsRegistering(false)} type="submit" className="button">
                  Back
                </button>
              </>
            ) : (
              <>
                <div className="field">
                  <label for="login" className="label">Email</label>
                  <div className="control"><input
                    type="email"
                    name="login"
                    id="login"
                    onChange={handleEmailChange}
                    value={email}
                    className="input"
                  /></div>

                </div>
                <div className="field">
                  <label for="password" className="label">Password</label>
                  <div className="control"><input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    value={password}
                    className="input"
                  /></div>

                </div>
                <button onClick={handleSignIn} type="submit" className="button is-primary">
                  Sign in
                </button>
                <button onClick={() => setIsRegistering(true)} type="submit" className="button is-warning">
                  Create an account
                </button>

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
