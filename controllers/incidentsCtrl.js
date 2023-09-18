const Incident = require("../models/incidentReport");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const addIncident = async (req, res) => {
  try {
    const newIncident = await Incident.create(req.body);
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: "Error creating incident" });
  }
};

const getAnIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      res.status(404).json({ error: "Incident not found" });
      return;
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving incident" });
  }
};

// Get all Incidents
const getAllIncidents = asyncHandler(async (req, res) => {
  try {
    const allIncidents = await Incident.find();
    if (!allIncidents) {
      res.status(404).json({ error: "No incidents found" });
      return;
    }
    res.json(allIncidents);
  } catch (error) {
    console.error("Error retrieving incidents:", error);
    res.status(500).json({ error: "Error retrieving incidents" });
  }
});

// update a incident
const updateIncident = asyncHandler(async (req, res) => {
  const { id } = req.params; // Change to 'id' from 'req.params.id'
  validateMongoDbId(id);

  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      id, // Use 'id' here
      {
        incidentType: req?.body?.incidentType,
        incidentLocation: req?.body?.incidentLocation,
      },
      {
        new: true,
      }
    );

    if (!updatedIncident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    res.json(updatedIncident);
  } catch (error) {
    // Handle the error properly, don't throw a new error
    console.error("Error updating incident:", error);
    res.status(500).json({ error: "Error updating incident" });
  }
});

module.exports = {
  addIncident,
  getAnIncident,
  getAllIncidents,
  updateIncident,
};
