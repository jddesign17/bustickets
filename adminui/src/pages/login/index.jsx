import React, { useEffect } from "react";

const OtplessLogin = () => {
  useEffect(() => {
    const loadOtplessScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://otpless.com/v3/auth.js";
        script.setAttribute("data-appid", "UNFDBESVQ2PQRXKHDO9G");
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadOtplessScript();

    window.otpless = (otplessUser) => {
      if (
        otplessUser.status === "SUCCESS" ||
        otplessUser.idToken !== undefined
      ) {
        finduser(otplessUser.idToken);
      }
    };

    
  }, []);


  async function finduser() {
    const response = await fetch("http://localhost:3000/api/auth/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "eyJraWQiOiJwazAxODMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJNTy01NjE4NzU0YjU3MTE0OTBlOTJjMjYwOWU1MDZjZDcxMiIsImF1ZCI6ImE3ZWN1aHRvNWw1aGRyM21samprYWwzb2RicmZhbmZ5LVVORkRCRVNWUTJQUVJYS0hETzlHIiwiY291bnRyeV9jb2RlIjoiKzkxIiwiYXV0aF90aW1lIjoiMTczNTQzNzkzOCIsImlzcyI6Imh0dHBzOi8vb3RwbGVzcy5jb20iLCJuYXRpb25hbF9waG9uZV9udW1iZXIiOiI4NDg5OTIxNzk4IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV9udW1iZXIiOiI5MTg0ODk5MjE3OTgiLCJleHAiOjE3MzU0MTg0MzgsImlhdCI6MTczNTQxODEzOCwidG9rZW4iOiJjZWQ2Njc3YmZkNWU0MjYxYmNlZmMzMDA2NzJjOTMxMyJ9.QT-ygATtY41xRT9_pj86Z4L-hOPzoAQK-WqN_4777nK-nZ9TnZVtu7LWyrrvFMcvq4NxvmtQjooWrCSamDV6N-Xz-GjNYbkuENRUK2fGQfXkZ4iOZrykX1GoXpsj7ek0nRwUL14Rc4mxhDtXEcs6-KeHv0djf27idcOJkLByaA8NZDx_J0eiC0X5uWJtvpcg9i58r7nOKI2UbFMPipTfT01qtx1Uxz03HCHl_avFs0YW1GDx9yHYFGskXcJB0msx4ht7lrOhfue0wLPMyT8z0nTYk5CArsaqbzkf-R-MkMmRtGRJKPM4jEpJ-BBfdJ_7baqjn9RGft_SuI1imOKvRQ"
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className=" w-full h-[100vh] flex justify-center items-center ">
      <div id="otpless-login-page"></div>
      <button onClick={finduser}>token</button>
    </div>
  );
};

export default OtplessLogin;
