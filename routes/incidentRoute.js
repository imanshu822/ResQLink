const express = require("express");
const {
  addIncident,
  getAnIncident,
  getAllIncidents,
  updateIncident,
} = require("../controllers/incidentsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMIddleware");
const router = express.Router();

router.post("/add-incident", authMiddleware, addIncident);
router.get("/:id", getAnIncident);
router.get("/get-all-incidents", authMiddleware, getAllIncidents);
router.put("/:id", authMiddleware, updateIncident);

module.exports = router;
