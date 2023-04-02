import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const [number, setnumber] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name,number,email, password)
  }

  return (
    <form className="signup text-center" onSubmit={handleSubmit}>
      <h3 className="m-3">Register & SignUp!</h3>
      
      <label>Name:</label>
      <input 
        type="name" 
        onChange={(e) => setname(e.target.value)} 
        value={name} 
      />
      <label>Number:</label>
      <input 
        type="number" 
        onChange={(e) => setnumber(e.target.value)} 
        value={number} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <div className="m-2">Already a user?
        <Link to='/login'> Login here!</Link>
      </div>
    </form>
  )
}

export default Signup