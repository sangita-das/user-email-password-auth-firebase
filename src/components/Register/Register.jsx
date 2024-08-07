import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth(app);

    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        // console.log(typeof password);

          // reset error and success
        setRegisterError('');
        setSuccess('');

        if(password.length <6 ) {
            setRegisterError('password should be at least 6 character or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions.')
            return;
        }


      

        // create user
        createUserWithEmailAndPassword (auth, email, password)
        .then(result =>{
            console.log(result.user)
            setSuccess('user created successfully.')


          // update profile
                updateProfile(result.user, {
                    displayName: name, 
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then( () => console.log('profile updated'))
                .catch()

                // send verification email: 
                sendEmailVerification(result.user)
                .then( () =>{
                    alert('Please check your email and verify your account')
                })

            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    
    return (
        <div className=" ">
    <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl  mb-8">Please Register</h2>
            <form onSubmit={handleRegister} action="">
                <input className="mb-4 w-full py-2 px-4 border" type="text" name="name" id="" placeholder="Your Name" required />

                <input className="mb-4 w-full py-2 px-4 border" type="email" name="email" id="" placeholder="Your email address" required />


                <br />
                <div className="relative mb-4 ">
                    <input 
                        className="w-full py-2 px-4 border" 
                        type={ showPassword ? "text" : "password" }
                        name="password" id="" 
                        placeholder="Your password" required
                 />
                 <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                 {
                    showPassword ? <FaEyeSlash />  : <FaEye />
                 }
                 </span>
                </div>
                <div className="mb-2">
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="ml-2 " htmlFor="terms">Accept our <a href="">terms and conditions</a> .</label>
                </div>
                <br />
                <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
            <p>Already have an account? Please <Link className="text-blue-700" to="/heroLogin">Login</Link></p>
    </div>
        </div>
    );
};

export default Register;