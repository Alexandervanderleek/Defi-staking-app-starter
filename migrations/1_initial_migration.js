const Migrations = artifacts.require('Migrations'); // this is truffle stuff

module.exports = function (deployer){   //module plain js object refer to current module 
    deployer.deploy(Migrations)
};



//this entire step can be replaced by running truffle init this will create migration.sol and the initial migrations folder