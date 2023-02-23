const zakturToken = "0x40458494Ac87fAE9C4cC188E226D09F6D866129f";
const Str = require("@supercharge/strings");
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol");
var evaluator = artifacts.require("Evaluator.sol");
var ZakTur = artifacts.require("ZakTur.sol");
var exerciceSolution = artifacts.require("ExerciceSolution.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    /*     await deployTDToken(deployer, network, accounts); 
await deployEvaluator(deployer, network, accounts); 
await setPermissionsAndRandomValues(deployer, network, accounts); 
await deployRecap(deployer, network, accounts); 
await deployGivenERC20(deployer, network, accounts, ZakTur, "ZakTur", "23Yc8", "407788306000000000000000000"); */
    // await deploySolution(deployer, network, accounts);
  });
};

async function deployTDToken(deployer, network, accounts) {
  TDToken = await TDErc20.new(
    "TD-AMM-101",
    "TD-AMM-101",
    web3.utils.toBN("20000000000000000000000000000")
  );
  dummyToken = await ERC20.new(
    "dummyToken",
    "DTK",
    web3.utils.toBN("2000000000000000000000000000000")
  );
  uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
  wethAddress = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
}

async function deploySolution(deployer, network, accounts) {
  const uniSwapV2Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const uniLiquid = "0x1caEA8c0a8838B24CE15Ff00a165C1E4d167174e";
  const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const DummyToken = "0x2aF483edaE4cce53186E6ed418FE92f8169Ad74E";
  const ZakTurToken = "0x40458494Ac87fAE9C4cC188E226D09F6D866129f";
  solution = await exerciceSolution.new(
    uniSwapV2Router,
    WETH,
    uniLiquid,
    DummyToken,
    ZakTurToken
  );
  console.log("Deployed solution at " + solution.address);
}

async function addLiquidity(deployer, network, accounts, address) {
  const solution = await exerciceSolution.at(address);
  await solution.addLiquidity();
}

async function deployGivenERC20(
  deployer,
  network,
  accounts,
  contract,
  name,
  symbol,
  totalSupply
) {
  const token = await contract.new(name, symbol, web3.utils.toBN(totalSupply));
  console.log("Deployed " + name + " at " + token.address);
}

async function deployEvaluator(deployer, network, accounts) {
  Evaluator = await evaluator.new(
    TDToken.address,
    dummyToken.address,
    uniswapV2FactoryAddress,
    wethAddress
  );
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
  await TDToken.setTeacher(Evaluator.address, true);
  randomSupplies = [];
  randomTickers = [];
  for (i = 0; i < 20; i++) {
    randomSupplies.push(Math.floor(Math.random() * 1000000000));
    randomTickers.push(Str.random(5));
    // randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
    // randomTickers.push(Str.random(5))
  }

  console.log(randomTickers);
  console.log(randomSupplies);
  // console.log(web3.utils)
  // console.log(type(Str.random(5)0)
  await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
  console.log("TDToken " + TDToken.address);
  console.log("dummyToken " + dummyToken.address);
  console.log("Evaluator " + Evaluator.address);
}
