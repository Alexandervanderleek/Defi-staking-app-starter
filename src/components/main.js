import React, {Component} from "react";
import Web3 from "web3";
import tether from '../tether.png'

/*
have form wrapped as a card
form has spacing ect 
in form have label 
float left and right within the label
b tag is bold
*/

//main is a stateless component

class main extends Component{ //note createing a table with table head and table rows with table cells
    render(){
        return (
            <div id='content' className='mt-3'>
                <table className="table text-muted text-center">
                    <thead>
                    <tr style={{color:'white'}}>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Staking Balance</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr style={{color:'white'}}>
                        <th>{window.web3.utils.fromWei(this.props.stakingBalance,'ether')} USDT</th>
                        <th>{window.web3.utils.fromWei(this.props.rwdBalance,'ether')} RWD</th>
                    </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{opacity:'.9'}}>
                    <form onSubmit={(event) =>{
                        event.preventDefault() //stop default
                        let amount
                        amount = this.input.value.toString() //amount set to input as string
                        amount = Web3.utils.toWei(amount, 'Ether') //convert amount to ether
                        this.props.stakeTokens(amount) // call our function
                    }} className="mb-3">
                        <div style={{borderSpacing: '0 1em'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}><b>Stake Tokens</b>

                            </label>
                            <span className ='float-right' style={{marginRight:'8px'}}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance,'ether')}
                            </span>
                            <div className="input-group mb-4">
                                <input ref={(input)=>{this.input = input }} type="text" placeholder="0" required/>
                           

                            <div className="input-group-open">
                                <div className ="input-group-text">
                                    <img alt='tether' src={tether} height='32'/>
                                    &nbsp;&nbsp;&nbsp;USDT
                                </div>
                            </div>
                            </div>

                            <button type = 'submit' className='btn btn-primary btn-lg btn-block'>Deposit</button>
                            


                        </div>

                    </form>

                    <button type='submit' onClick={(event) =>{
                        event.preventDefault(
                            this.props.unstakeToken()
                        )
                    }} className='btn btn-primary btn-lg btn-block'>Withdraw</button>
                    <div className="card-body text-center" style={{color:'blue'}}>
                        <b>AIRDROP</b>
                    </div>


                </div>
            </div>
        )
    }
}




export default main;