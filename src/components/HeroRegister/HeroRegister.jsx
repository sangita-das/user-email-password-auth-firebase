import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const HeroRegister = () => {

  const auth = getAuth(app);
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
          console.log(email, password);


          // add validation
          signInWithEmailAndPassword(auth, email, password)
          .then(result => {
            console.log(result.usesr)
            setSuccess('user created successfully.')
          })
          .catch(error => {
            console.log(error)
            setRegisterError(error.message)
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
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        registerError && <p className="text-red-700">{registerError}</p>
      }
      {
        success && <p className="text-green-700">{success}</p>
      }
    </div>
  </div>
</div>
        </div>
    );
};

export default HeroRegister;