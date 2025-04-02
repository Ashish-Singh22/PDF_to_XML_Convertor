const historyModel = require('../../models/historyModel')

const allHistoryController = async(req,res) => {

    try{

        const allHistory =await historyModel.find().sort({ createdAt : -1})

        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allHistory
        })

    }catch(err){
        res.status(404).json({
          
            message : err.message || err,
            error : true,
            success : false
        })
        
    }

}

module.exports = allHistoryController