const walletModel = require("../model/walletModel");
const WalletModel = require("../model/walletModel");

// GET: All Transactions + Balance
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await WalletModel.find().sort({ createdAt: -1 });

    const balance = transactions.reduce((acc, tx) => {
      return tx.type === 'in' ? acc + tx.amount : acc - tx.amount;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: {
        transactions,
        balance,
      },
    });

  } catch (error) {
    console.error(" Error fetching transactions:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching transactions!",
    });
  }
};

// POST: Add New Transaction
exports.addMoney = async (req, res) => {
  try {
    const { name, bank, amount, time, type,date } = req.body;

    if (!name || !bank || !amount || !time || !type || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const newTxn = await WalletModel.create({
      name,
      bank,
      amount,
      time,
      type,
      date
    });

    res.status(201).json({
      success: true,
      message: "Money added successfully",
    });

  } catch (error) {
    console.error(" Error adding money:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add money",
    });
  }
};


exports.withdrwaMoney = async(req,res)=>{
    try {
      const { name, bank, amount, time, type,date } = req.body;

      if (!name || !bank || !amount || !time || !type || !date) {
        return res.status(400).json({
          success: false,
          message: "All fields are required!",
        });
      }

      const transactions = await WalletModel.find().sort({ createdAt: -1 });

      const totalBalance = transactions.reduce((acc, tx) => {
        return tx.type === 'in' ? acc + tx.amount : acc - tx.amount;
      }, 0);

    if(totalBalance<amount){
      return res.status(400).json({
        success: false,
        message: "Insufficent bank blance!",
      }); 
    }
    const newTxn = await WalletModel.create({
      name,
      bank,
      amount,
      time,
      type,
      date
    });

    res.status(201).json({
      success: true,
      message: "Money withdrawa successfully",
    });


      
    } catch (error) {
      console.error(" Error adding money:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to wihdrawa money",
    });
      
    }
}
