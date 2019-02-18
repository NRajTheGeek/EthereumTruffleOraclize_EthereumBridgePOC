const Web3 = require("web3");
const contract = require("truffle-contract");
const path = require("path");
const fs = require("fs");

const sha256 = require("js-sha256").sha256;

let PaintingCompetetionABI = require(path.join(
  __dirname,
  "../../build/contracts/PaintingCompetetion.json"
));

let provider = new Web3.providers.HttpProvider("http://localhost:9545");
let web3 = new Web3();

let PaintingCompetetion = contract(PaintingCompetetionABI);
PaintingCompetetion.setProvider(provider);

const setRegisterationLastDateInMinute = function(lastDateInMinutes, senderAddress, res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      console.log(lastDateInMinutes, senderAddress);
            
      return instance.setRegisterationLastDateInMinute(lastDateInMinutes, {
        from: senderAddress
      });
    })
    .then(function(result) {
      console.log("successfully set Registeration Last Date In Minute");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const registerYourSelf = function(name, email, paintingURL, senderAddress, registerationFeeInWie, res) {
  var URL_SHA256 = _getSHA256OfData(paintingURL);
  var valInWie = web3.toWei(registerationFeeInWie);
  console.log(valInWie);
  
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.registerYourSelf(name, email, paintingURL, URL_SHA256, {
        from: senderAddress,
        value: valInWie,
        gas: 10000000
      });
    })
    .then(function(result) {
      console.log("successfully set Registeration Last Date In Minute");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const registeredBy = function(paintingURLSHA, res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.registeredBy(paintingURLSHA);
    })
    .then(function(result) {
      console.log("successfully registeredBy");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const isRegisterationValid = function(registererAddress, senderAddress, res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.isRegisterationValid(registererAddress, {
        from: senderAddress
      });
    })
    .then(function(result) {
      console.log("successfully isRegisterationValid");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const validateRegisteration = function(registererAddress, _paintingURLSHA256, senderAddress, res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.validateRegisteration(registererAddress, _paintingURLSHA256, {
        from: senderAddress,
        gas: 10000000
      });
    })
    .then(function(result) {
      console.log("successfully validateRegisteration");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const setVotingDeadLine = function(startTimeInMinutes, endTimeInMinutes, senderAddress, votigDeadlineFee,  res) {
  votigDeadlineFee = web3.toWei(votigDeadlineFee);
  console.log(votigDeadlineFee);
  
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.setVotingDeadLine(startTimeInMinutes, endTimeInMinutes, {
        from: senderAddress,
        value: votigDeadlineFee,
        gas: 100000000
      });
    })
    .then(function(result) {
      console.log("successfully validateRegisteration");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const voteForPainting = function(registererAddress, _paintingURLSHA256, senderAddress, res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.voteForPainting(registererAddress, _paintingURLSHA256, {
        from: senderAddress,
        gas: 10000000
      });
    })
    .then(function(result) {
      console.log("successfully voteForPainting");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const whoIsWinner = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.whoIsWinner();
    })
    .then(function(result) {
      console.log("successfully whoIsWinner");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const lastDate = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.lastDate();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const getOwner = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.owner();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const getRegisterationFee = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.registerationFee();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const getVotingEndDateInMinutes = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.votingEndDateInMinutes();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

const getVotingStartDateInMinutes = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.votingStartDateInMinutes();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

 const getWinnerDetails = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.winnerDetails();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

 const getWinnerPaintingSHA256 = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.winnerPaintingSHA256();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

 const getHighestVotes = function(res) {
  PaintingCompetetion.deployed()
    .then(function(instance) {
      return instance.highestVotes();
    })
    .then(function(result) {
      console.log("successfully lastDate");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
};

var _getSHA256OfData = function(textData) {
  return sha256(textData);
};

module.exports = {
  setRegisterationLastDateInMinute,
  registerYourSelf,
  registeredBy,
  isRegisterationValid,
  validateRegisteration,
  setVotingDeadLine,
  voteForPainting,
  whoIsWinner,
  lastDate,
  getOwner,
  getRegisterationFee,
  getVotingEndDateInMinutes,
  getVotingStartDateInMinutes,
  getWinnerDetails,
  getWinnerPaintingSHA256,
  getHighestVotes
};
