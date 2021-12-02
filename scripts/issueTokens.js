const DecentralBank = artifacts.require('DecentralBank');


module.exports = async function issueRewards(callback){
    let decentralBank = await DecentralBank.deployed(); // this is getting deployed contract
    await decentralBank.distubuteRwd() // call function of contract
    console.log('tokens have been issued')
    callback() // callback function 
}