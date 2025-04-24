import React from "react";

const WalletHeader = ({ balance , setIsTransction  }) => {

  const handleTransction = ()=>{
    setIsTransction(true)
  }

  return (
    <div data-aos="zoom-in" className="bg-blue-600  duration-500 text-white p-6 rounded-3xl relative overflow-hidden">
      <h2 className="text-xl font-medium mb-2">Saurabh-Wallet</h2>
    <div className="text-center">
    <p className="text-sm">Your Earnings</p>
    <h1 className="text-4xl font-bold my-2">${balance.toFixed(2)}</h1>
    </div>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={()=>handleTransction()} className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg font-medium shadow">Add Money</button>
        <button onClick={()=>handleTransction()} className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg font-medium shadow">Withdraw</button>
      </div>
      {/* Decorative pattern (optional, mock it or use bg image) */}
      <div className="absolute top-0 right-0 h-full w-1/3 opacity-20">
        <div className="bg-indigo-400 h-full w-full rounded-l-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default WalletHeader;
