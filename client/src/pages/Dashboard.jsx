import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";


function Dashboard() {

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboard();

    fetchCourses();

  }, []);



  // DASHBOARD DATA
  const fetchDashboard = async () => {

    try {

      const response = await API.get("/api/dashboard");

      setDashboardData(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  // GET COURSES
  const fetchCourses = async () => {

    try {

      const response = await API.get("/api/courses");

      setCourses(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  // CREATE OR UPDATE COURSE
  const handleSubmit = async () => {

    try {

      const payload = {
        title,
        description,
        price
      };

      if (editingId) {

        await API.put(
          `/api/courses/${editingId}`,
          payload
        );

        alert("Course Updated");

      } else {

        await API.post(
          "/api/courses",
          payload
        );

        alert("Course Created");

      }

      setTitle("");
      setDescription("");
      setPrice("");
      setEditingId(null);

      fetchCourses();

    } catch (error) {

      alert("Something went wrong");

    }

  };



  // DELETE COURSE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/api/courses/${id}`
      );

      setCourses((prev) =>
        prev.filter(
          (course) => course._id !== id
        )
      );

    } catch (error) {

      alert("Delete failed");

    }

  };



  // EDIT COURSE
  const handleEdit = (course) => {

    setTitle(course.title);

    setDescription(course.description);

    setPrice(course.price);

    setEditingId(course._id);

  };



  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  // Payment handle
  const handlePayment = async (course) => {

    try {

      const response =
        await API.post(
          "/api/payment/create-checkout-session",
          {
            title: course.title,
            price: course.price
          }
        );

      window.location.href =
        response.data.url;

    } catch (error) {

      alert("Payment failed");

    }

  };



  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">


        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            EduCore Dashboard
          </h1>

          <div className="flex gap-3">



            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>



        {/* USER DASHBOARD */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Dashboard Overview
          </h2>

          <p className="mb-2">
            Name: {dashboardData?.name}
          </p>

          <p>
            Role: {dashboardData?.role}
          </p>

        </div>



        {/* COURSE FORM */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-4">

            {editingId
              ? "Edit Course"
              : "Add Course"}

          </h2>

          <input
            type="text"
            placeholder="Course Title"
            className="w-full border p-3 rounded-lg mb-4"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full border p-3 rounded-lg mb-4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded-lg mb-4"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {editingId
              ? "Update Course"
              : "Create Course"}
          </button>

        </div>



        {/* COURSE LIST */}
        <div className="grid md:grid-cols-2 gap-4">

          {courses.map((course) => (

            <div
              key={course._id}
              className="bg-white shadow rounded-xl p-5"
            >

              <h3 className="text-xl font-bold mb-2">
                {course.title}
              </h3>

              <p className="mb-2">
                {course.description}
              </p>

              <p className="font-semibold mb-4">
                ₹ {course.price}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleEdit(course)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(course._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    handlePayment(course)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Buy
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;