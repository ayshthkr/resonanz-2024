"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800", "700"],
});

export default function SIGNINForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setMessage(null);
    if (!email || !password) {
      setMessage({
        type: "error",
        message: "Please fill all the fields",
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
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(email, password);
      if (res == undefined) {
        setMessage({
          type: "error",
          message: "Invalid Credentials",
        });
        setLoading(false);
        return;
      }
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await res.user.getIdToken()}`,
        },
      });

      if (response.status === 200) {
        router.push("/dashboard");
      }

      setEmail("");
      setPassword("");

      setLoading(false);
      return;
    } catch (e) {
      console.error(e);
      setMessage({
        type: "error",
        message: "Invalid Credentials",
      });
      setLoading(false);
      return;
    }
  }, [email, password]);

  return (
    <div
      className={cn(
        "w-11/12 mx-auto flex justify-center items-center min-h-screen pb-4",
        poppins.className
      )}
    >
      <div className="w-full mx-auto max-w-[500px] px-4 transition-all duration-300 ease-in-out">
        <h1 className="text-5xl md:text-[77.71px] md:leading-[116.57px] text-white font-poppins font-[800] uppercase">
          SIGN IN
        </h1>
        <p className="text-white text-sm mt-2 font-poppins font-[700]">
          Sign in with email address
        </p>
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
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign In"}
        </button>
        <hr className="mt-4 md:mt-8 border-t border-[#727272]" />
        {/* <p className="mt-4 md:mt-8  text-white text-sm font-poppins font-[700]">
          Or continue with
        </p>
        <button className="bg-[#3B2063] text-white w-full py-4 mt-4 rounded-lg text-lg font-poppins font-[800] transition-all duration-300 hover:opacity-80 active:opacity-100 focus:outline-2 focus:outline-white focus:outline-offset-2 active:outline-none active:scale-95 flex items-center justify-center gap-2">
          <svg
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7589 8.95782H18.0017V8.91635H9.54117V12.9133H14.8539C14.0788 15.2401 11.9961 16.9103 9.54117 16.9103C6.4263 16.9103 3.90084 14.2259 3.90084 10.9149C3.90084 7.60384 6.4263 4.91936 9.54117 4.91936C10.979 4.91936 12.2871 5.49592 13.2831 6.43772L15.942 3.61134C14.2631 1.94809 12.0173 0.922363 9.54117 0.922363C4.34972 0.922363 0.140625 5.3965 0.140625 10.9149C0.140625 16.4332 4.34972 20.9073 9.54117 20.9073C14.7326 20.9073 18.9417 16.4332 18.9417 10.9149C18.9417 10.2449 18.8769 9.59085 18.7589 8.95782Z"
              fill="#FFC107"
            />
            <path
              d="M9.5412 20.9074C11.9694 20.9074 14.1757 19.9197 15.8438 18.3134L12.9343 15.6964C11.9588 16.485 10.7668 16.9115 9.5412 16.9104C7.09612 16.9104 5.02001 15.2532 4.23788 12.9404L1.17236 15.451C2.72815 18.6871 5.88768 20.9074 9.5412 20.9074Z"
              fill="#4CAF50"
            />
            <path
              d="M18.7587 8.95797H18.0015V8.9165H9.54102V12.9135H14.8537C14.483 14.0209 13.8151 14.9885 12.9327 15.6969L12.9341 15.6959L15.8436 18.3129C15.6377 18.5118 18.9416 15.9112 18.9416 10.915C18.9416 10.245 18.8767 9.591 18.7587 8.95797Z"
              fill="#1976D2"
            />
            <path
              d="M1.22461 6.26385L4.31316 8.67154C5.14887 6.47219 7.1728 4.91936 9.54127 4.91936C10.9791 4.91936 12.2872 5.49592 13.2832 6.43772L15.9421 3.61134C14.2632 1.94809 12.0174 0.922363 9.54127 0.922363C5.93052 0.922363 2.7992 3.08923 1.22461 6.26385Z"
              fill="#FF3D00"
            />
          </svg>

          <span className="ml-2">Sign in with Google</span>
        </button> */}
        <p className="text-white text-xs font-poppins font-[700] mt-4">
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
