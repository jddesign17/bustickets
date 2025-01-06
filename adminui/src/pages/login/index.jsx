import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtplessLogin = () => {
  const navigate = useNavigate();

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
        console.log(otplessUser);
        finduser(otplessUser.idToken);
      }
    };
  }, []);

  async function finduser(token) {
    const response = await fetch("http://localhost:3000/api/auth/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const data = await response.json();
    console.log(data.status);
    if (data.message==="Authorization successful") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <div className=" w-full h-[100vh] flex justify-center items-center ">
      <div id="otpless-login-page"></div>
    </div>
  );
};

export default OtplessLogin;
