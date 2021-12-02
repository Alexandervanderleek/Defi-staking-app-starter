import React, {Component} from 'react'


class Airdrop extends Component{
    //airdrop to have a timer that counts down
    //only initilze after customer have staked certain amount...50
    //timer func, start, countdown, state - for time to work...

    constructor(){ //instatiate for stat
        super() //subclasses instatiate
        this.state ={
            time: {},
            seconds: 20
        };
        this.timer = 0;
        this.startTime = this.startTime.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}


export default Airdrop