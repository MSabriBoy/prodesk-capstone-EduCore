import { useEffect } from "react";

import { useNavigate } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

  }, []);


  return (
    <div>

      <h1>Welcome to EduCore Dashboard</h1>

    </div>
  );
}

export default Dashboard;