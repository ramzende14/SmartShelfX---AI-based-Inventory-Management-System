/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getRole } from "../services/LoginService";

const UserReport = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState("ALL"); // 🔥 DROPDOWN STATE

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    // logged-in role
    getRole()
      .then((r) => setRole(r))
      .catch(console.error);

    // users API
    axios
      .get("http://localhost:8080/invent/users")
      .then((res) => {
        setUsers(res.data || []);
        setFilteredUsers(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------- FILTER BY ROLE ---------- */
  useEffect(() => {
    if (selectedRole === "ALL") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((u) => u.role === selectedRole));
    }
  }, [selectedRole, users]);

  /* ---------- BACK ---------- */
  const returnBack = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "MANAGER") navigate("/manager");
    else navigate("/vendor");
  };

  /* ---------- ROLE BADGE ---------- */
  const roleBadge = (r) => {
    if (r === "ADMIN") return "bg-red-100 text-red-700";
    if (r === "MANAGER") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold">👤 User Report</h2>
            <p className="text-sm text-slate-500">
              View users role-wise
            </p>
          </div>

          <div className="flex gap-3 items-center">
            {/* 🔥 ROLE DROPDOWN */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="VENDOR">Vendor</option>
            </select>

            <button
              onClick={returnBack}
              className="px-4 py-2 border rounded-lg bg-white hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Personal Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3">{u.id}</td>
                    <td className="px-4 py-3 font-semibold">
                      {u.username}
                    </td>
                    <td className="px-4 py-3">
                      {u.personalName || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {u.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge(
                          u.role
                        )}`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default UserReport;
