const express = require("express");
const { isAuthenticated } = require("../Auth/IsAuthenticated");
const {
  createClient,
  getOwnClients,
  getSingleClientData,
  deleteClient,
  getAllClientsByUser,
  getAllclients,
} = require("../controller/clientController");
const router = express.Router();

router.route("/create-client").post(isAuthenticated, createClient);
router.route("/get-own-clients").get(isAuthenticated, getOwnClients);
router.route("/client/details/:id").get(isAuthenticated, getSingleClientData);
router.route("/client/delete/:id").delete(isAuthenticated, deleteClient);
router.route("/user/client/:id").get(isAuthenticated, getAllClientsByUser);
router.route("/all/clients").get(isAuthenticated, getAllclients);

module.exports = router;
