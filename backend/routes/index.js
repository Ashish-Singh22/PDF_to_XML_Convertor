const express = require("express")
const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const allUsers = require("../controller/user/allUsers")
const updateUser = require("../controller/user/updateUser")
const addHistoryController = require("../controller/history/addHistory")
const allHistoryController = require("../controller/history/allHistory")
const userHistoryController = require("../controller/history/userHistory")
const searchHistoryController = require("../controller/history/searchHistory")
const deleteHistoryController = require("../controller/history/deleteHistory")
const historyDetailsController = require("../controller/history/historyDetails")


const router = express.Router()




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//history 
router.post("/add-history",authToken,addHistoryController)
router.get("/all-history",allHistoryController)
router.get("/user-history",authToken,userHistoryController)
router.post("/search-history",searchHistoryController)
router.delete("/delete-history", authToken, deleteHistoryController); // DELETE route for history
router.post("/history-details",authToken,historyDetailsController)



module.exports = router