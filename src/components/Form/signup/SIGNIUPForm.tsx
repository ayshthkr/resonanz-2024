"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useCallback } from "react";
import { auth } from "@/lib/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800", "700"],
});

export default function SIGNIUPForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    // Validate the form
    if (!name || !email || !phone || !password) {
      setMessage({
        type: "error",
        message: "All fields are required",
      });
      return;
    }

    // Checking for Name Validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setMessage({
        type: "error",
        message: "Please enter a valid name",
      });
      return;
    }

    // Checking for Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nsut\.ac\.in$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        message: "Please enter a valid NSUT email",
      });
      return;
    }

    // Checking for Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setMessage({
        type: "error",
        message: "Please enter a valid phone number",
      });
      return;
    }

    // Checking for Password Validation
    if (!password || password.length < 6) {
      setMessage({
        type: "error",
        message: "Password should be atleast 6 characters long",
      });
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res == undefined) {
        setMessage({
          type: "error",
          message: "Account cannot be created",
        });
        setLoading(false);
        return;
      }

      fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await res.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push("/dashboard");
        }
      });

      setEmail("");
      setPassword("");
      router.push("/dashboard");
      return;
    } catch (e) {
      console.error(e);
      setMessage({
        type: "error",
        message: "Account cannot be created",
      });
      setLoading(false);
      return;
    }
  }, [name, email, phone, password]);

  return (
    <div
      className={cn(
        "w-11/12 mx-auto flex justify-center items-center min-h-screen pb-4",
        poppins.className
      )}
    >
      <div className="w-full mx-auto max-w-[500px] px-4 transition-all duration-300 ease-in-out">
        <h1 className="text-5xl md:text-[77.71px] md:leading-[116.57px] text-white font-poppins font-[800] uppercase">
          SIGN UP
        </h1>
        <p className="text-white text-sm mt-2 font-poppins font-[700]">
          Sign up to create your account.
        </p>
        <div className="group flex items-center bg-[#261046] px-4 py-4 mt-4 rounded-lg text-lg group-hover:bg-[#1F0F2E] focus-within:outline-white focus-within:outline-offset-2 focus-within:outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A4A4A4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <label className="sr-only" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="bg-transparent text-white w-full focus:outline-none pl-4"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="group flex items-center bg-[#261046] px-4 py-4 mt-4 rounded-lg text-lg group-hover:bg-[#1F0F2E] focus-within:outline-white focus-within:outline-offset-2 focus-within:outline">
          <svg
            width="26"
            height="19"
            viewBox="0 0 26 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.51965 0.0380859H21.6715C22.7213 0.0380859 23.728 0.434251 24.4703 1.13943C25.2126 1.84461 25.6296 2.80103 25.6296 3.7983V15.079C25.6296 16.0762 25.2126 17.0327 24.4703 17.7378C23.728 18.443 22.7213 18.8392 21.6715 18.8392H4.51965C3.46989 18.8392 2.46312 18.443 1.72083 17.7378C0.978539 17.0327 0.561523 16.0762 0.561523 15.079V3.7983C0.561523 2.80103 0.978539 1.84461 1.72083 1.13943C2.46312 0.434251 3.46989 0.0380859 4.51965 0.0380859ZM4.51965 1.29149C3.85996 1.29149 3.27944 1.50457 2.83085 1.88059L13.0956 8.18523L23.3603 1.88059C22.9117 1.50457 22.3312 1.29149 21.6715 1.29149H4.51965ZM13.0956 9.70185L2.05242 2.89585C1.94687 3.1716 1.8809 3.48495 1.8809 3.7983V15.079C1.8809 15.7438 2.15891 16.3814 2.65377 16.8515C3.14863 17.3217 3.81981 17.5858 4.51965 17.5858H21.6715C22.3714 17.5858 23.0425 17.3217 23.5374 16.8515C24.0323 16.3814 24.3103 15.7438 24.3103 15.079V3.7983C24.3103 3.48495 24.2443 3.1716 24.1388 2.89585L13.0956 9.70185Z"
              fill="#A4A4A4"
            />
          </svg>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="bg-transparent text-white w-full focus:outline-none pl-4"
            placeholder="Your NSUT Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="group flex items-center bg-[#261046] px-4 py-4 mt-4 rounded-lg text-lg group-hover:bg-[#1F0F2E] focus-within:outline-white focus-within:outline-offset-2 focus-within:outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A4A4A4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.11 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 1 4.18 2 2 0 0 1 3 2h4.09a2 2 0 0 1 2 1.72c.14 1.21.37 2.42.68 3.57a2 2 0 0 1-.45 1.94L8.09 10.91a16 16 0 0 0 6 6l1.68-1.68a2 2 0 0 1 1.94-.45c1.15.31 2.36.54 3.57.68a2 2 0 0 1 1.72 2.03z"></path>
          </svg>
          <label className="sr-only" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="bg-transparent text-white w-full focus:outline-none pl-4"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="group flex items-center bg-[#261046] px-4 py-4 mt-4 rounded-lg text-lg group-hover:bg-[#1F0F2E] focus-within:outline-white focus-within:outline-offset-2 focus-within:outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 50 50"
            fill="#A4A4A4"
          >
            <path d="M 25 2 C 17.832484 2 12 7.8324839 12 15 L 12 21 L 8 21 C 6.3550302 21 5 22.35503 5 24 L 5 47 C 5 48.64497 6.3550302 50 8 50 L 42 50 C 43.64497 50 45 48.64497 45 47 L 45 24 C 45 22.35503 43.64497 21 42 21 L 38 21 L 38 15 C 38 7.8324839 32.167516 2 25 2 z M 25 4 C 31.086484 4 36 8.9135161 36 15 L 36 21 L 14 21 L 14 15 C 14 8.9135161 18.913516 4 25 4 z M 8 23 L 42 23 C 42.56503 23 43 23.43497 43 24 L 43 47 C 43 47.56503 42.56503 48 42 48 L 8 48 C 7.4349698 48 7 47.56503 7 47 L 7 24 C 7 23.43497 7.4349698 23 8 23 z M 13 34 A 2 2 0 0 0 11 36 A 2 2 0 0 0 13 38 A 2 2 0 0 0 15 36 A 2 2 0 0 0 13 34 z M 21 34 A 2 2 0 0 0 19 36 A 2 2 0 0 0 21 38 A 2 2 0 0 0 23 36 A 2 2 0 0 0 21 34 z M 29 34 A 2 2 0 0 0 27 36 A 2 2 0 0 0 29 38 A 2 2 0 0 0 31 36 A 2 2 0 0 0 29 34 z M 37 34 A 2 2 0 0 0 35 36 A 2 2 0 0 0 37 38 A 2 2 0 0 0 39 36 A 2 2 0 0 0 37 34 z"></path>
          </svg>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="bg-transparent text-white w-full focus:outline-none pl-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A4A4A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? null : (
                <>
                  <path d="M17.94 17.94A10.97 10.97 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.55 2.83-4.73 5-6.12M1 1l22 22"></path>
                  <path d="M9.88 9.88A3 3 0 0 0 12 15c1.38 0 2.63-.56 3.54-1.46M21 21l-4.35-4.35"></path>
                </>
              )}
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        {message && (
          <div
            className={cn(
              "mt-4 py-2.5 px-4 text-sm rounded-lg flex items-center gap-2",
              message.type === "error" ? "bg-red-500/15" : "bg-green-500/20"
            )}
          >
            {message.type === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-red-500 inline-block mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-green-500 inline-block mr-2"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            )}
            <p
              className={cn(
                message.type === "error" ? "text-red-500" : "text-green-500"
              )}
            >
              {message.message}
            </p>
          </div>
        )}

        <button
          className="bg-gradient-to-r from-[#501794] to-[#3E70A1] text-white w-full py-4 mt-4 rounded-lg text-lg font-poppins font-[800] transition-all duration-300 hover:opacity-80 active:opacity-100 focus:outline-2 focus:outline-white focus:outline-offset-2 active:outline-none active:scale-95"
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign Up"}
        </button>
        <hr className="mt-4 mb-2 md:mt-8 md:mb-4 border-t border-[#727272]" />
        <p className="text-white text-xs font-poppins font-[700]">
          By registering you with our{" "}
          <Link href="/terms" className="text-[#a154ff]">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="w-full h-[44px]"
    >
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="15"
        r="15"
        cx="40"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="15"
        r="15"
        cx="100"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="15"
        r="15"
        cx="160"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
  );
}
