const historyModel = require('../../models/historyModel');
const addHistoryPermission = require('../../helpers/permission');

async function deleteHistoryController(req, res) {
    try {
        const sessionUserId = req.userId;
        console.log("Session User ID:", sessionUserId);

        if (!addHistoryPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const { historyId } = req.body; // Get the history ID from request params
        console.log("Deleting history ID:", historyId);

        // Find and delete the history entry
        const deletedHistory = await historyModel.findOneAndDelete({
            _id: historyId,
            userId: sessionUserId, // Ensure the user is deleting their own history
        });

        if (!deletedHistory) {
            return res.status(404).json({
                message: "History entry not found or you don't have permission to delete it.",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "History deleted successfully",
            error: false,
            success: true,
            data: deletedHistory
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteHistoryController;
