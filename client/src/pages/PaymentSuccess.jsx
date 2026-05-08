import { useEffect, useState } from "react";

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

import API from "../api";


function PaymentSuccess() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const [receipt, setReceipt] =
    useState(null);


  useEffect(() => {

    fetchReceipt();

  }, []);


  const fetchReceipt = async () => {

    try {

      const sessionId =
        searchParams.get(
          "session_id"
        );

      const response =
        await API.get(
          `/api/payment/session/${sessionId}`
        );

      setReceipt(
        response.data.session
      );

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          EduCore Receipt 🎉
        </h1>

        {receipt && (

          <div className="space-y-3">

            <p>
              <strong>Transaction ID:</strong>{" "}
              {receipt.id}
            </p>

            <p>
              <strong>Course:</strong>{" "}
              {receipt.metadata.courseName}
            </p>

            <p>
              <strong>Amount Paid:</strong>{" "}
              ₹{receipt.amount_total / 100}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {receipt.payment_status}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                receipt.created * 1000
              ).toLocaleString()}
            </p>

          </div>

        )}

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="w-full mt-6 bg-black text-white py-3 rounded-lg"
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  );

}


export default PaymentSuccess;