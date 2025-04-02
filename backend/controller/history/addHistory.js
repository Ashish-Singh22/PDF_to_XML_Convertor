const historyModel = require('../../models/historyModel')
const addHistoryPermission = require('../../helpers/permission')

async function addHistoryController(req,res){
    try{
       
        const sessionUserId = req.userId
        console.log(sessionUserId)
        
        if(!addHistoryPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        console.log("history body",req.body)
        const addHistory = new historyModel(req.body)
        const saveHistory = await addHistory.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveHistory
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addHistoryController