import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

export default function User() {
  const [userInformations, setUserInformations] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLogged(true);
        setUserInformations(user.providerData[0]);
      } else {
        setIsLogged(false);
        setUserInformations({});
      }
    });
  }, []);
  const handleSignOut = (e) => {
    signOut(auth)
      .then(() => {})
      .catch((err) => alert(err.message));
  };
  return (
    <div>
      {isLogged ? (
        <>
          <p>{userInformations.email}</p>

          <button className="button button-danger" onClick={handleSignOut}>
            Odhlásit se
          </button>
        </>
      ) : (
        <p>Uzivatel není přihlášen</p>
      )}
    </div>
  );
}
