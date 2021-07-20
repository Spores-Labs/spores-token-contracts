const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, network, accounts) {
  if (network == "test") return;
  deployer.deploy(Migrations);
};
