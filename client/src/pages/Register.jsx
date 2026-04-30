import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");


  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert(response.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }

  };


  return (
    <div>

      <h1>Register</h1>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <select
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  );
}

export default Register;