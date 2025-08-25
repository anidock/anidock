import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const fn = mode === "login" ? login : signup;
    const { error } = await fn(email, password);
    if(error) setMsg(error.message);
    else setMsg(mode === "login" ? "Logged in!" : "Check your email to confirm (if enabled).");
  };

  return (
    <div className="container">
      <div className="panel" style={{maxWidth:420, margin:"40px auto"}}>
        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
        <form onSubmit={onSubmit} className="grid" style={{marginTop:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          <div className="form-row">
            <button className="btn" type="submit">{mode === "login" ? "Login" : "Sign up"}</button>
            <button className="btn secondary" type="button" onClick={()=>setMode(mode==="login"?"signup":"login")}>
              {mode === "login" ? "Need an account?" : "Have an account?"}
            </button>
          </div>
          {msg && <p style={{color:"#fca5a5"}}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}
