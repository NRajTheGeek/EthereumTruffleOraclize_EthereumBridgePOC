"use strict";

var express = require("express");
var router = express.Router();
var contractService = require("../utils/contractService");

router.post("/setRegisterationLastDateInMinute", function(req, res, callback) {
  var lastDateInMinutes = req.body.lastDateInMinutes;
  var senderAddress = req.body.senderAddress;

  contractService.setRegisterationLastDateInMinute(
    lastDateInMinutes, 
    senderAddress,
    res
  );
});

router.post("/registerYourSelf", function(req, res, callback) {
  var name = req.body.name;
  var email = req.body.email;
  var paintingURL = req.body.paintingURL;
  var senderAddress = req.body.senderAddress;
  var registerationFeeInWie = req.body.registerationFeeInWie;

  contractService.registerYourSelf(
    name, 
    email, 
    paintingURL, 
    senderAddress, 
    registerationFeeInWie,
    res
  );
});

router.post("/setVotingDeadLine", function(req, res, callback) {
  var startTimeInMinutes = req.body.startTimeInMinutes;
  var endTimeInMinutes = req.body.endTimeInMinutes;
  var senderAddress = req.body.senderAddress;
  var votigDeadlineFee = req.body.votigDeadlineFee;

  contractService.setVotingDeadLine(
    startTimeInMinutes, 
    endTimeInMinutes, 
    senderAddress, 
    votigDeadlineFee,
    res
  );
});

router.post("/voteForPainting", function(req, res, callback) {
  var registererAddress = req.body.registererAddress;
  var _paintingURLSHA256 = req.body._paintingURLSHA256;
  var senderAddress = req.body.senderAddress;

  contractService.voteForPainting(
    registererAddress, 
    _paintingURLSHA256, 
    senderAddress, 
    res
  );
});

router.post("/validateRegisteration", function(req, res, callback) {
  var registererAddress = req.body.registererAddress;
  var paintingURLSHA256 = req.body.paintingURLSHA256;
  var senderAddress = req.body.senderAddress;

  contractService.validateRegisteration(
    registererAddress, 
    paintingURLSHA256, 
    senderAddress,
    res
  );
});

router.get("/isRegisterationValid/registererAddress/:registererAddress/senderAddress/:senderAddress", async function(req, res, callback) {
  var registererAddress = req.params.registererAddress;
  var senderAddress = req.params.senderAddress;

  contractService.isRegisterationValid(
    registererAddress, 
    senderAddress,
    res
  );
});

router.get("/registeredBy/paintingURLSHA/:paintingURLSHA", async function(req, res, callback) {
  var paintingURLSHA = req.params.paintingURLSHA;
  contractService.registeredBy(
    paintingURLSHA,
    res
  );
});

router.get("/whoIsWinner", async function(req, res, callback) {
  var EthAddress = req.params.EthAddress;
  contractService.whoIsWinner(
    res
  );
});

router.get("/getRegisterationLastDate", async function(req, res, callback) {

  contractService.lastDate(
    res
  );
});

router.get("/getOwner", async function(req, res, callback) {

  contractService.getOwner(
    res
  );
});

router.get("/getRegisterationFee", async function(req, res, callback) {

  contractService.getOwner(
    res
  );
});

router.get("/getHighestVotes", async function(req, res, callback) {

  contractService.getHighestVotes(
    res
  );
});
router.get("/getWinnerPaintingSHA256", async function(req, res, callback) {

  contractService.getWinnerPaintingSHA256(
    res
  );
});
router.get("/getWinnerDetails", async function(req, res, callback) {

  contractService.getWinnerDetails(
    res
  );
});
router.get("/getVotingStartDateInMinutes", async function(req, res, callback) {

  contractService.getVotingStartDateInMinutes(
    res
  );
});
router.get("/getVotingEndDateInMinutes", async function(req, res, callback) {

  contractService.getVotingEndDateInMinutes(
    res
  );
});
module.exports = router;
