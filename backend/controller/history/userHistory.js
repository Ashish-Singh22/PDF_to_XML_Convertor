const historyModel = require('../../models/historyModel')

const userHistoryController = async(req,res)=>{

    try{

        const userId  = req.userId

        const userHistory = await historyModel.find({userId}).sort({ createdAt : -1})


        res.json({
            message : "All History",
            error : false,
            success : true,
            data : userHistory
        })

    }catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })

    }

}

module.exports = userHistoryController