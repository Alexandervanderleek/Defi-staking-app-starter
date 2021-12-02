//main application where render everything core output (mothership)
import React, {Component} from "react";
import './App.css';
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json"
import RWD from "../truffle_abis/RWD.json"
import DecentralBank from "../truffle_abis/DecentralBank.json"
import Main from "./main.js"
import ParticleSettings from "./ParticleSettings"

class App extends Component{



    
    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){// check that eth open , aka the metamask is open
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            }else{
                window.alert('no eth browser detected, lookup meta mask')
            }
        }
    
    async loadBlockchainData(){
        const w3 = window.web3
        const account = await w3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await w3.eth.net.getId()
        
        //load the contract 
        const tetherData = Tether.networks[networkId] // pulled from the json
        if(tetherData){
            const tether = new w3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call() //make it a let var cause changing variable
            // also note methods keyword and call func due to web3
            this.setState({tetherBalance: tetherBalance.toString()})
            
            

        } else{
            window.alert("contract not deployed on network")
        }

        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new w3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
            
        }else{
            window.alert("issue with rwd")
        }

        const dBank = DecentralBank.networks[networkId] // pulled from the json
        if(tetherData){
            const decentralBank = new w3.eth.Contract(DecentralBank.abi, dBank.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call() //make it a let var cause changing variable
            // also note methods keyword and call func due to web3
            this.setState({stakingBalance: stakingBalance.toString()})
            
            

        } else{
            window.alert("the big d-bank has issues")
        }
        this.setState({loading: false})
    }

    async loadContracts(){

    }
    
    // two functions one stakes one that unstakes 
    // leverage already made func in decentralbank
    // staking func >> access decentral bank depo tokens, send transaction hash get it done
    // want to run the approval func before depo

    //staking func
    // grabbing decentral bank, then get dep fun, send over from account 
    stakeTokens = (amount) => {
        //know loading get loader just incase
        this.setState({loading: true})
        //just need to approve this ability to deposit as a third party
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) =>{
        // running the deposit tokens method
            this.state.decentralBank.methods.depositToken(amount).send({from: this.state.account}).on('transactionHash', (hash) =>{
            this.setState({loading: false})
        })
     })
    }

    unstakeToken = () => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unStakeTokens().send({from: this.state.account}).on('transactionhash', (hash)=>{
            this.setState({loading: false})
        })
    }

    //props part of react allow to parse over info
    constructor(props){
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true

        }
    }


    // we parse the this.state.account to navbar
    //react code goes in here
    //note that we pass our two balances through tho the main component in the next few lines same way as we did with the navbar and acc 
    render(){
        let content //below create variable content if loading load loading please otherwise we load the main this way doesnt break
        {this.state.loading ? content =
        <p id='loader' className="text-center" style={{margin:'30px', color:'white'}}>LOADING PLEASE...</p> : content = <Main
        tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance = {this.state.stakingBalance}
        stakeTokens = {this.stakeTokens}
        unstakeToken = {this.unstakeToken}
        />}
        return(  //divs are just containers that can include styles, e.g text-centre comes from bootstrap, // note the parsing of info to navbar
            <div className="App" style={{position: 'relative'}}>
                <div style = {{position: 'absolute'}}><ParticleSettings/></div>
                <Navbar account = {this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role = "main" className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'800px',minHeight: '100vm'}}>
                            <div>
                               {content}
                            </div>        
                        </main>
                    </div>
                </div>
            </div>
        )
    }


}

export default App;


//class name invokes bootstrap styles seen in index.js

/*   this way only the first hello world would be styled
<div>
<div className='text-center' style={{
    color:'green',
    fontSize: '30px'
    }}> 
    <h> Hello, world!</h>
</div>
<div>
    hello
</div>
</div>
)

this way everthing gets that style
<div style={{
                color:'green',
                fontSize: '30px' }}>
                <div className='text-center'>
                    <h> Hello, world!</h>
                </div>
                    <div>
                        hello
                    </div>
            </div>
*/