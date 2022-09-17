const express = require("express");
const { isAuthenticated } = require("../Auth/IsAuthenticated");
const {
  createClient,
  getOwnClients,
  getSingleClientData,
  deleteClient,
  getAllClientsByUser,
  getAllclients,
  getSingleClients,
  updateClient,
} = require("../controller/clientController");
const router = express.Router();

router.route("/create-client").post(isAuthenticated, createClient);
router.route("/get-own-clients").get(isAuthenticated, getOwnClients);
router.route("/client/details/:id").get(isAuthenticated, getSingleClientData);
router.route("/client/delete/:id").delete(isAuthenticated, deleteClient);
router.route("/user/client/:id").get(isAuthenticated, getAllClientsByUser);
router.route("/all/clients").get(isAuthenticated, getAllclients);
router.route("/get/clients/details/:id").get(isAuthenticated, getSingleClients);
router.route("/update/client/:id").put(isAuthenticated, updateClient);

module.exports = router;
