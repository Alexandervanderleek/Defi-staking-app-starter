pragma solidity ^0.5.0;

contract RWD {
    string public name = 'reward token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,  
        address indexed _to,
        uint _value
        );//index keyword allows for filtering from outside but cost higher gas cost, only allowed 3 per event  

//events allow info to be stored and then can be emitted show to outside world
// e.g have decentralized exchange, need trader to be able to see the events not stored as mem therfore lower cost, allow outside store
//common practice is to start with capital


    event Approve(  
        address indexed _owner,
        address indexed _spender,
        uint value
    );

    mapping(address => uint256) public balanceOf; //just rember basically like any other var create key style table
    mapping(address => mapping(address => uint256)) public allowance; //mapping of [adress][adress] = int which is the allowance

    constructor () public{
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint amount ) public returns (bool success){
        require(balanceOf[msg.sender] >= amount);
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        //this will be visible through e.g web3 
        emit Transfer(msg.sender, to, amount); 
        return true;
    }

    //transfer from allow for third party to execute a trade

    function approve(address spender, uint256 amount) public returns (bool success) { // this is checking that person who connects has allow
        allowance[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender,amount);
        return true;

    }

    function TransferFrom(address from, address to , uint256 value) public returns (bool success){
        require(value <= balanceOf[from]);
        require(value <= allowance[from][msg.sender]);

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from,to,value); 
        return true;

    }
}

