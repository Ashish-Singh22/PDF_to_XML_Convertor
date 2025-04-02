const historyModel = require("../../models/historyModel")

const historyDetailsController = async(req,res) => {
    try{

        const { historyId } = req.body

        const history = await historyModel.findById(historyId)
         
        res.json({
            data : history,
            message : "OK",
            success : true,
            error : false
        })


    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }

  


}

module.exports = historyDetailsController