import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../services/LoginService";

const QUOTE = "Where Inventory meets Intelligence";

const LoginPage = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  /* ================= TYPING ANIMATION ================= */
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (index < QUOTE.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + QUOTE[index]);
        setIndex((prev) => prev + 1);
      }, 80);
    } else {
      timer = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 4500);
    }

    return () => clearTimeout(timer);
  }, [index]);
  /* ==================================================== */

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((v) => ({ ...v, [name]: value }));
    setLoginError("");
  };

  const handleValidation = async (e) => {
    e.preventDefault();

    let temp = {};
    let ok = true;

    if (!loginData.username.trim()) {
      temp.username = "User Name is required";
      ok = false;
    }
    if (!loginData.password.trim()) {
      temp.password = "Password is required";
      ok = false;
    }

    setErrors(temp);
    if (!ok) return;

    try {
      const role = await validateUser(
        loginData.username,
        loginData.password
      );

      if (role === "ADMIN") navigate("/admin");
      else if (role === "MANAGER") navigate("/manager");
      else if (role === "VENDOR") navigate("/vendor");
      else setLoginError("Invalid username or password");
    } catch {
      setLoginError("Login failed. Check credentials.");
    }
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center px-6">

      {/* ================= MAIN LAYOUT ================= */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT : QUOTE ================= */}
        <div className="text-center lg:text-left">
          <h1
            className="
              font-outfit
              font-extrabold
              tracking-tight
              leading-tight
              text-4xl sm:text-5xl md:text-6xl
             text-slate-950

            "
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="mt-6 text-Green-600 max-w-xl">
            SmartShelfX helps businesses track inventory efficiently,
            reduce losses, and make data-driven decisions with confidence.
          </p>
        </div>

        {/* ================= RIGHT : LOGIN CARD ================= */}
        <div className="flex justify-center">
          <div
            className="
              w-full max-w-md
              bg-white/15
              backdrop-blur-xl
              border border-gray-300/40
              shadow-2xl
              rounded-2xl
              p-8
              text-gray-900
            "
          >
            <h1 className="text-center text-3xl font-bold mb-1 text-orange-600">
              Sign In
            </h1>

            <p className="text-center text-sm text-gray-600 mb-6">
              Secure access to your dashboard
            </p>

            <form onSubmit={handleValidation} className="space-y-4">

              {/* USERNAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={onChangeHandler}
                  placeholder="Enter username"
                  className="
                    w-full rounded-lg
                    border border-gray-400
                    bg-white/30
                    px-3 py-2
                    focus:border-blue-500
                    focus:ring-2 focus:ring-orange-400/40
                    outline-none
                  "
                />
                {errors.username && (
                  <p className="text-xs text-orange-600 mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={onChangeHandler}
                  placeholder="Enter password"
                  className="
                    w-full rounded-lg
                    border border-gray-400
                    bg-white/30
                    px-3 py-2
                    focus:border-blue-500
                    focus:ring-2 focus:ring-orange-400/40
                    outline-none
                  "
                />
                {errors.password && (
                  <p className="text-xs text-orange-600 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="
                  w-full mt-2
                  rounded-lg
                  bg-blue-600 hover:bg-blue-700
                  px-4 py-2.5
                  text-sm font-semibold text-white
                  shadow-lg shadow-blue-900/40
                  transition-all
                "
              >
                Sign In
              </button>

              {loginError && (
                <p className="text-center text-orange-600 text-sm mt-1">
                  {loginError}
                </p>
              )}
            </form>

            {/* REGISTER */}
            <div className="mt-6 border-t border-gray-400/40 pt-4 text-center">
              <p className="text-xs text-gray-700 mb-2">
                Don't have an account?
              </p>

              <button
                onClick={() => navigate("/register")}
                className="
                  inline-flex items-center justify-center
                  rounded-lg
                  border border-gray-500
                  bg-orange-500 hover:bg-orange-600
                  px-4 py-2
                  text-xs font-semibold text-white
                  shadow-md
                  transition-all
                "
              >
                Register New User
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
