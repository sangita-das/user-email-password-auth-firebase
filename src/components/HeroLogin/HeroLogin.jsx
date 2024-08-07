import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroLogin = () => {
    
      const auth = getAuth(app);
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
          console.log(email, password);


           // reset error and success
        setLoginError('');
        setSuccess('');


          // add validation
          signInWithEmailAndPassword(auth, email, password)
          .then(result => {
            console.log(result.user)
            if(result.user.emailVerified){
                setSuccess('user logged in successfully.')
            }
            else{
                alert('Please verify your email address.')
            }
          })
          .catch(error => {
            console.log(error)
            setLoginError(error.message)
          })
    }

    /* --------reset password-------------------- */
    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email', emailRef.current.value)
            return;
        }
        else if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test (email)){
            console.log('please write a valid email')
            return;
        }

        // send validation email
sendPasswordResetEmail (auth, email)
.then(() =>{
    alert ('Please check your email')
})
.catch(error =>{
    console.log(error)
})
    }



    return (
                        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
           name="email" 
           type="email" 
           ref = {emailRef}
           placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        loginError && <p className="text-red-700">{loginError}</p>
      }
      {
        success && <p className="text-green-700">{success}</p>
      }
      <p>New to this website? Please <Link  to="/register" className="text-green-700">Register</Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default HeroLogin;