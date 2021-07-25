const BN = require("bn.js");
var config = require("../conf/config.mainnet");
const SporesToken = artifacts.require("SporesToken");
const SporesTokenVesting = artifacts.require("SporesTokenVesting");

const ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const MINTER_ROLE =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
const PAUSER_ROLE =
  "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a";
const newOwner = "0x482bE3Ec3A24eE4FEc390576473dbc9DaD2E6d66"; //replace new owner here

module.exports = async (deployer, network, accounts) => {
  if (network == "test") return;

  const _name = config.token.name; // Token name
  const _symbol = config.token.symbol; // Token symbol
  const _decimals = config.token.decimals; // Token decimals
  const _cap = new BN(config.token.cap); // Token total supply

  const seconds = 0; // Token listing date in seconds: 2PM 20/7/2021. Will be replace with mainnet setting
  //   const seconds = 1626764400; // Token listing date in seconds: 2PM 20/7/2021. Will be replace with mainnet setting
  const _tokenListingDate = new BN(seconds);

  // Add vesting beneficiary info
  const addBeneficiary = async (tokenContract, contract, info) => {
    const decimalsBN = new BN(_decimals);
    const multiplyBN = new BN(10);
    const amountBN = new BN(info.amount);
    const upfrontAmountBN = new BN(info.upfrontAmount);

    const sendAmount = amountBN.mul(multiplyBN.pow(decimalsBN));
    const sendUpfrontAmount = upfrontAmountBN.mul(multiplyBN.pow(decimalsBN));
    await contract.addBeneficiary(
      info.address,
      sendAmount,
      info.lockDuration,
      info.vestingDuration,
      sendUpfrontAmount,
      info.vestingInternal,
      { from: accounts[0] }
    );
    if (info.isSender) {
      console.log("info sender adddress:", info.address, info.isSender);
      await tokenContract.addSender(info.address, { from: accounts[0] });
    }
  };

  // Deploy token contract
  console.log(`Prepare to deploy ${_name} to ${network} ...`);
  await deployer.deploy(SporesToken, _name, _symbol, _decimals, _cap, {
    from: accounts[0],
  });
  let tokenInstance = await SporesToken.deployed();
  console.log(
    `${_name} deployed to ${network} at address ${tokenInstance.address}`
  );
  // Deploy token vesting contract
  console.log(
    `Prepare to deploy SporesTokenVesting contract to ${network} ...`
  );
  //   await deployer.deploy(
  //     SporesTokenVesting,
  //     tokenInstance.address,
  //     _tokenListingDate,
  //     { from: accounts[0] }
  //   );
  let tokenVestingInstance = await SporesTokenVesting.deployed();
  console.log(
    `SporesTokenVesting contract deployed to ${network} at address ${tokenVestingInstance.address}`
  );
  // Add role minter to vesting contract
  console.log(`Mint tokens to ${tokenVestingInstance.address}`);
  await tokenInstance.addSender(tokenVestingInstance.address);
  await tokenInstance.mint(tokenVestingInstance.address, _cap, {
    from: accounts[0],
  });
  const balance = await tokenInstance.balanceOf(tokenVestingInstance.address);
  console.log(`Vesting contract balance: ${balance.toString()}`);
  // Add preset beneficiaries
  if (network === "live") {
    // mainnet
    for (let index = 0; index < config.mainnetBeneficiaries.length; index++) {
      const info = config.mainnetBeneficiaries[index];
      try {
        await addBeneficiary(tokenInstance, tokenVestingInstance, info);
        console.log(
          `Added ${info.address} to vesting pool with information: total ${info.amount} ${_symbol}, lock ${info.lockDuration}, vesting duration ${info.vestingDuration}, upfront amount ${info.upfrontAmount} ${_symbol}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log("USE TESTNET CONFIG");
    for (let index = 0; index < config.tesnetBeneficiaries.length; index++) {
      const info = config.tesnetBeneficiaries[index];
      try {
        await addBeneficiary(tokenInstance, tokenVestingInstance, info);
        console.log(
          `Added ${info.address} to vesting pool with information: total ${info.amount} ${_symbol}, lock ${info.lockDuration}, vesting duration ${info.vestingDuration}, upfront amount ${info.upfrontAmount} ${_symbol}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  // grant role to new ownership revoke role
  //   await tokenInstance.grantRole(ADMIN_ROLE, newOwner);
  //   await tokenInstance.grantRole(MINTER_ROLE, accounts[0]);
  //   await tokenInstance.grantRole(PAUSER_ROLE, accounts[0]);
  //   await tokenInstance.transferOwnership(newOwner);
  //   await tokenInstance.renounceRole(MINTER_ROLE, accounts[0]);
  //   await tokenInstance.renounceRole(PAUSER_ROLE, accounts[0]);
  //   await tokenInstance.renounceRole(ADMIN_ROLE, accounts[0]);
};
