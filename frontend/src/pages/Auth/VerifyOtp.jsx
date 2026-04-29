import React, { useState } from "react";

const VerifyOtp = () => {
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");

  const verify = async () => {
    const res = await fetch("http://localhost:8080/index.php?r=auth/verify-otp",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email,otp})
    });

    const data = await res.json();

    if(data.status==="success"){
      alert("Verified");
      window.location.href="/login";
    }else{
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} className="border p-2"/>
      <input placeholder="OTP" onChange={e=>setOtp(e.target.value)} className="border p-2 mt-2"/>
      <button onClick={verify} className="bg-blue-500 text-white px-4 py-2 mt-3">
        Verify
      </button>
    </div>
  );
};

export default VerifyOtp;