import React, {Component} from "react";
import bank from '../bank.png';

//curly is js normally, {this.props.account is parsed from app.js}

class Navbar extends Component{

    render(){ //nav is like div but is special from bootstrap for navbars
        return(  
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black',height:'50px'}}> 
                <a className="navbar-brand col-sm-3 col-md-2 mr-0"
                style ={{color:'white'}}>  
                <img src={bank} width='50' height='30s' className="d-inline-block align-top" alt='bank img'/>  &nbsp;
                DAPP Yield Staking
                </a>
                <ul className='navbar-nav px-3'>
                    <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                        <small style={{color:'white'}}> Account number: {this.props.account}
                            
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }


}

export default Navbar;


// classname for navbar explaination - jsx, dark, fix to top of page, add a shadow, style background to black and fix height
// a tag generally used for hyperlinks 
// ul defines unordered bulleted list   
// li tag defines the list item so e.g for the above ul tag
// small tag is actually just for smaller text think of copyright for e.g