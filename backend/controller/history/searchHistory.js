const historyModel = require("../../models/historyModel");

const searchHistoryController = async(req,res)=>{

    try{

        const { query } = req.body
        const regex = new RegExp(query,'i','g')
        const history = await historyModel.find({
             fileName : regex
        })

        res.json({
            data : history ,
            message : "Search Product list",
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = searchHistoryController