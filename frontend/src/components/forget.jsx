import React, { useState } from 'react';
import axios from 'axios'

const Forget=()=>{
    const [email,setEmail]=useState('')
    const[message,setMessage]=useState('')

    const handleSubmit = async(e)=>{
        try{
         e.preventDefault();
         const res=await axios.post('http://localhost:3000/api/v1/user/forget',{email})
         setMessage(res.data.message)
        }
        catch(err){
            setMessage(err.res.data.message)
        }
    }
    return (
        <div>
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
export default Forget