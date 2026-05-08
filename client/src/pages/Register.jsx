import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");


  const handleRegister = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          role
        }
      );

      alert(response.data.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">
            Student
          </option>

          <option value="instructor">
            Instructor
          </option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-4">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;