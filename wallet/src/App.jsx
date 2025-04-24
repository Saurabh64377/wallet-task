import React, { useEffect, useState } from "react";
import WalletHeader from "./components/WalletHeader";
import TransactionItem from "./components/TransactionItem";
import axios from 'axios'
import Addmoney from "./components/TransactionForm";
import {ToastContainer, Zoom} from 'react-toastify'
import AOS from 'aos'
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';



const App = () => {

  const [balance , setBalance] = useState(0)
  const [transactions , setTransactions] = useState([])
  const [isTransction , setIsTransction] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/");
      const data = response.data;
  
      if (data.success) {
        setBalance(data.data.balance);
        setTransactions(data.data.transactions);
        console.log("Transactions fetched successfully");
      } else {
        console.warn("Something went wrong while fetching data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data?.message || "Server error");
    }
  };
  

  useEffect(()=>{

    fetchData()

    AOS.init({
      offset:100,
      duration:800,
      easing:'ease-in-out',
      delay:100
    })

    AOS.refresh()

  } ,[])

  const grouped = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]){
      acc[tx.date] = [];
    } 
    acc[tx.date].push(tx);
    return acc;
  }, {});

  return (
    <div className="min-h-screen max-w-[550px] p-5 mx-auto bg-gray-50 font-sans">
      <WalletHeader  balance={balance} setIsTransction={setIsTransction}  />
      <Addmoney isTransction={isTransction} setIsTransction={setIsTransction} fetchData={fetchData} />

      <div className="mt-4 px-4">
        {Object.keys(grouped).length>0?  Object.keys(grouped).map((date) => (
          <div key={date} className="mb-4">
            <p className="text-center text-xs text-gray-400 mb-2">{date}</p>
            {grouped[date].map((tx, index) => (
              <TransactionItem key={index} {...tx} />
            ))}
          </div>
        )) :
        <div className="text-center text-xl text-gray-500">No tranction yet</div>
      }
      </div>

      <div className="p-4">
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-medium shadow-lg">
          Continue →
        </button>
      </div>
      <ToastContainer transition={Zoom} autoClose={1000}  />

    </div>
  );
};

export default App;
