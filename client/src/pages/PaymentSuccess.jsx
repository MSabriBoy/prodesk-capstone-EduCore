import { Link } from "react-router-dom";


function PaymentSuccess() {

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Course purchased successfully.
        </p>

        <Link
          to="/dashboard"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>

  );

}


export default PaymentSuccess;