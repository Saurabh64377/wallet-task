import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const TransactionItem = ({ name, bank, time, amount, type }) => {
  const isIncome = type === "in";
  return (
    <div data-aos = "zoom-in" className="flex justify-between items-center px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isIncome ? "bg-green-100" : "bg-yellow-100"}`}>
          {isIncome ? (
            <ArrowUpRight className="text-green-500" size={18} />
          ) : (
            <ArrowDownLeft className="text-yellow-500" size={18} />
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{bank}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{time}</p>
        <p className={`text-sm font-semibold ${isIncome ? "text-green-500" : "text-yellow-500"}`}>
          ${amount}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
