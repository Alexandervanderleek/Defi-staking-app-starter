pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'DecentralBank';
    address public owner;
    RWD public rwd;
    Tether public tether;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public haveStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd,Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;

    }

    //staking function
    function depositToken(uint amount) public {
        require(amount > 0, 'amount cant be zero');
        //transfer token to address for staking
        tether.TransferFrom(msg.sender, address(this), amount);
        // send from the sender of contract to this contract address 
        stakingBalance[msg.sender] += amount;

        if(!haveStaked[msg.sender]){
            stakers.push(msg.sender);
        }
            isStaked[msg.sender] = true;
            haveStaked[msg.sender] = true;

    }

    function distubuteRwd() public {
        require(msg.sender == owner,'caller must be the owner');
            for(uint i =0 ; i<stakers.length; i++){
                uint balance = stakingBalance[stakers[i]]/9;
                if(balance>0){
                    rwd.transfer(stakers[i], balance);
                }
                
            }

    }

    function unStakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'cant unstake 0');

        //transfer back to address 

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaked[msg.sender] = false;

    }

}

