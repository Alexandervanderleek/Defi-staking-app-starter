const Tether = artifacts.require('Tether'); //artifact.require tell truffle what want to work with 
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


// this is the func and what it is going to be taking in aka, the deployer network and our accounts 
module.exports = async function(deployer, network, accounts){ //async allow run funct send promise, aka wait for things to return
    await deployer.deploy(Tether); // deployer is truffle object for deploying works as deployer.deploy(contract)
    const tether = await Tether.deployed(); // all these var are holding the deployed contracts
    
    await deployer.deploy(RWD);
    const rewardToken = await RWD.deployed();

    await deployer.deploy(DecentralBank, rewardToken.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    //transfer all rwd to central bank

    await rewardToken.transfer(decentralBank.address,'1000000000000000000000000') // this is moving all of out rwd token to decentral bank

    await tether.transfer(accounts[1],'100000000000000000000');  // this line is giving first account on ganache 1 of the rwd tokems  

}