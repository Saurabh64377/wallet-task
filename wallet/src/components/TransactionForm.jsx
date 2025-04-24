import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Addmoney({ fetchData,isTransction, setIsTransction }) {
  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [form, setForm] = useState({
    name: "",
    bank: "",
    amount: "",
    time: '',
    type: "",
    date: new Date().toDateString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, bank, amount, type } = form;

    if (!name || !bank || !amount) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      // 👉 Get current time at submission
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const payload = {
        ...form,
        amount: Number(amount),
        time: currentTime, // Override with current time
      };

      const endpoint = type === "in" ? "add" : "withdrwa";

      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, payload);

      if (response.data?.success) {
        toast.success(response.data.message);
        fetchData();

        // Reset form with fresh current time
        setForm({
          ...form,
          name: "",
          bank: "",
          amount: "",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setIsTransction(false)
        
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server error occurred!")
      
    } finally {
      setLoading(false);
    }
  };


  return (
   <>
   {
    isTransction &&(
      <form
      data-aos="zoom-in"
      onSubmit={handleSubmit}
      className=" shadow-md rounded-2xl p-6 space-y-5 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700">Transction</h2>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Enter name"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="bank" className="text-sm font-medium text-gray-600 mb-1">Bank </label>
        <input
          list="bank-options"
          id="bank"
          name="bank"
          value={form.bank}
          onChange={handleChange}
          type="text"
          placeholder="e.g. SBI, HDFC, UPI"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <datalist id="bank-options">
          <option value="SBI" />
          <option value="HDFC" />
          <option value="UNION" />
          <option value="PUNJAB" />
          <option value="NATIONAL" />
        </datalist>

      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="flex flex-col sm:flex-1">
          <label htmlFor="amount" className="text-sm font-medium text-gray-600 mb-1">Amount</label>
          <input
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            type="number"
            placeholder="₹ Amount"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>


      </div>

      <div className="flex flex-col">
        <label htmlFor="type" className="text-sm font-medium text-gray-600 mb-1">Transaction Type</label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option disabled value="">Select Type</option>
          <option value="in">Add </option>
          <option value="out">Withdraw</option>
        </select>
      </div>

     <div className="flex justify-around">
     <button
        type="submit"
        disabled={loading}
        className={` bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
      >
        {loading ? "Submitting..." : "Submit Transaction"}
      </button>
      <button onClick={()=>setIsTransction(false)} className="bg-red-600 text-white py-2 px-4 rounded-lg  hover:bg-red-700 transition duration-200">Cancel</button>
     </div>
    </form>
    )
   }
   </>
  );
}

export default Addmoney;
