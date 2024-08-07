
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

import app from "../../firebase/firebase.init";
import { useState } from "react";






const Login = () => {
    const [user, setUser] = useState(null)
     
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()


/* ---------google sign in------------ */
const handleGoogleSignIn = () => {

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }

const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
    }



/* ---------------Github Sign in--------------- */
 
  const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then( result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error)
        })
    }




    return (
        <div>
        <h2 className="text-3xl">Please login</h2>
        {/* user ? logout : sign in */}

        {
            user ?
            <button onClick={handleSignOut}>Sign Out</button>
            :
           <div>
             <button onClick={handleGoogleSignIn}>Google Login</button>
            <button onClick = {handleGithubSignIn}>Github login</button>
           </div>
        }
            
           {
            user && <div className="">
                 <h3>User: {user.displayName}</h3>
                 <p>Email: {user.email}</p>
                 <img src={user.photoURL} alt="" />
            </div>
           }
        </div>
    );
};

export default Login;