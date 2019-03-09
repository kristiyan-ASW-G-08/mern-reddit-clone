import React,{useState} from 'react'
 const SignupForm = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [matchPassword,setMatchPassword] = useState('')
    return (
        <form>
              <input onChange={e => setUsername(e.target.value)} className="input " value={username} type="text" placeholder="Username" name="username" required/>
              <input onChange={e => setEmail(e.target.value)} className="input " value={email} type="email" placeholder="Email" name="email" required/>
              <input onChange={e => setPassword(e.target.value)} className="input " value={password} type="password" placeholder="Password" name="password" required/>
              <input onChange={e => setMatchPassword(e.target.value)} className="input " value={matchPassword} type="password" placeholder="Repeat your password" name="matchPassword" required/>
        </form>
    )
}
export default SignupForm