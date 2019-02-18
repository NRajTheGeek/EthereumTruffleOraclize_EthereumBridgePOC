var PaintingCompetetion = artifacts.require("./PaintingCompetetion.sol");

module.exports = function(deployer) {
  deployer.deploy(PaintingCompetetion);
};