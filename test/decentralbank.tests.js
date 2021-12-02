const Tether = artifacts.require('Tether'); //artifact.require tell truffle what want to work with 
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should();

contract('DecentralBank',([owner, customer]) => { //this is all mocha testing, [] this allows explicit access to the array accounts we name them

    let tether, rwd, decentralBank

    function tokens (number){
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => { //loading the contracts 
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        await rwd.transfer(decentralBank.address, tokens('1000000'))
        await tether.transfer(customer,tokens('100'),{from: owner})
    })
    
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () =>{
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

 
    describe('Reward Token', async () => {
        it('matches name successfully', async () =>{
            const name = await rwd.name()
            assert.equal(name, 'reward token')
        })
    })

    describe('decentral bank deployment', async () => {
        it('matches name successfully', async () =>{
            const name = await decentralBank.name()
            assert.equal(name, 'DecentralBank')
        })

        it('contract has tokens',async() =>{
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

    })

    describe('yield farm yield farming', async () => {
        it('rewards tokens for staking', async () =>{
            let result;
            result = await tether.balanceOf(customer)
            
            assert.equal(result.toString(), tokens('100'),'investor mock tether balance before stakings')
    
            await tether.approve(decentralBank.address,tokens('100'),{from:customer})

            await decentralBank.depositToken(tokens('100'), {from: customer})

            //now check updated balance of customer 

            result = await tether.balanceOf(customer);
            
            assert.equal(result.toString(),tokens('0'),'afterwards for customer') 

            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(),tokens('100'),'afterwards for bank')

            result = await decentralBank.isStaked(customer)
            assert.equal(result.toString(),'true','check correct status after')

            
            await decentralBank.distubuteRwd({from: owner})

            await decentralBank.distubuteRwd({from: customer}).should.be.rejected;

            //now unstake
            await decentralBank.unStakeTokens({from:customer})
            
            //new balance of customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'),'all tokens should be back')
            
            //staking profile of customer
            result = await decentralBank.isStaked(customer)
            assert.equal(result.toString(),'false','check correct status after')
            
            //decentral bank new balance 
            result = await tether.balanceOf(decentralBank.address);
            assert.equal(result.toString(),tokens('0'),'afterwards for bank')
  
        })

    })

})



/*
es6 arrow func 

normal is function add(a,b){does thing}

why arrow function 
easier syntax 

function sum(a,b){
    return a+b;
}

let sum2 =(a,b) => a+b;

for arrow the return is implicit and doesn't require the curly brackets

function isPostive(n){
    return n>=0;
}

let isPositive = n = n>=0; if one param dont need bracket

for anoymous funct just use () => no need define anything

why ? -> this keyword, arrow will globally take this , if normal func use this it will look locally within the func

anon func must be assigned to a var

*/