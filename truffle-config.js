require('babel-register');
require('babel-polyfill');

module.exports = {  //creating a export 
    networks:{
        development: {   // setting up ganache connection
            host:'127.0.0.1:7545',
            port:'7545',
            network_id:'*' //connect to any 
        },
    },

    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',
    compilers:{
        solc:{
            versions: '^0.5.0',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}

