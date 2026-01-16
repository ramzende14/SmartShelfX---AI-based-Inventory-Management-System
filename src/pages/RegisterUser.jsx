// src/pages/RegisterUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../services/LoginService";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInventoryUser((prev) => ({ ...prev, [name]: value }));
  };

  const createNewUser = async () => {
    const response = await registerNewUser(inventoryUser);
    if (response.status === 200 || response.status === 201) {
      alert("User registered successfully. Please login.");
      navigate("/");
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    let temp = {};
    let ok = true;

    if (!inventoryUser.username.trim()) {
      temp.username = "User Name is required";
      ok = false;
    }

    if (!inventoryUser.password.trim()) {
      temp.password = "Password is required";
      ok = false;
    } else if (
      inventoryUser.password.length < 5 ||
      inventoryUser.password.length > 10
    ) {
      temp.password = "Password must be 5-10 characters long";
      ok = false;
    } else if (inventoryUser.password !== confirmPassword) {
      temp.password = "Passwords do not match";
      ok = false;
    }

    if (!inventoryUser.personalName.trim()) {
      temp.personalName = "Personal Name is required";
      ok = false;
    }

    if (!inventoryUser.email.trim()) {
      temp.email = "Email is required";
      ok = false;
    } else if (!emailPattern.test(inventoryUser.email)) {
      temp.email = "Invalid email format";
      ok = false;
    }

    if (!inventoryUser.role.trim()) {
      temp.role = "Role is required";
      ok = false;
    }

    if (!confirmPassword.trim()) {
      temp.confirmPassword = "Confirm password is required";
      ok = false;
    }

    setErrors(temp);

    if (ok) {
      try {
        await createNewUser();
      } catch (err) {
        console.error(err);
        alert("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="register-bg min-h-screen w-full flex items-center justify-center px-4">

      {/* Glass Card */}
      <div className="
        w-full max-w-2xl 
        bg-white/15 backdrop-blur-xl
        border border-gray-300/40 
        rounded-2xl shadow-2xl 
        p-10
      ">
        <h2 className="text-center text-3xl font-bold text-orange-600 mb-1">
          Register New User
        </h2>
        <p className="text-center text-gray-700 text-sm mb-6">
          Create an account to access inventory system
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleValidation}>

          {/* USERNAME */}
          <div>
            <label className="text-sm font-semibold text-gray-700">User Name</label>
            <input
              name="username"
              value={inventoryUser.username}
              onChange={onChangeHandler}
              placeholder="Enter username"
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            {errors.username && <p className="text-xs text-orange-600">{errors.username}</p>}
          </div>

          {/* PERSONAL NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Personal Name</label>
            <input
              name="personalName"
              value={inventoryUser.personalName}
              onChange={onChangeHandler}
              placeholder="Full name"
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            {errors.personalName && <p className="text-xs text-orange-600">{errors.personalName}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={inventoryUser.password}
              onChange={onChangeHandler}
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            {errors.password && <p className="text-xs text-orange-600">{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            {errors.confirmPassword && <p className="text-xs text-orange-600">{errors.confirmPassword}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              name="email"
              value={inventoryUser.email}
              onChange={onChangeHandler}
              placeholder="Email address"
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            {errors.email && <p className="text-xs text-orange-600">{errors.email}</p>}
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Role</label>
            <input
              list="roleTypes"
              name="role"
              value={inventoryUser.role}
              onChange={onChangeHandler}
              placeholder="Select Role"
              className="
                w-full bg-white/40 border border-gray-400 rounded-lg 
                px-3 py-2 text-gray-900 placeholder-gray-500
                focus:ring-2 focus:ring-orange-400/40 focus:border-blue-500
              "
            />
            <datalist id="roleTypes">
              <option value="Admin" />
              <option value="Manager" />
              <option value="Vendor" />
            </datalist>
            {errors.role && <p className="text-xs text-orange-600">{errors.role}</p>}
          </div>

          {/* BUTTONS */}
          <div className="col-span-2 flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                px-4 py-2 rounded-lg border border-gray-500 bg-white/20 
                text-gray-800 font-semibold hover:bg-gray-300/40
              "
            >
              Back to Login
            </button>

            <button
              type="submit"
              className="
                px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold
                shadow-lg hover:bg-blue-700 shadow-blue-900/40
              "
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
