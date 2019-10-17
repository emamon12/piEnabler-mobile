import React, { Component } from 'react';
import "./frickenlazorbeams.scss";

class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ship : [0,0],
            speed : 15,
            dir : "stop",
            last : 0,
            bullets : [],
            firing: true,

        }
    }
    componentDidMount() {

        
        // listen for shit
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("touchmove", this.handleMouseMove);
        // run
        this.animate();
    }
    animate = (now) => {
        let drawVisual = requestAnimationFrame(this.animate);
        if (!this.state.last || now - this.state.last >= 1) {
            this.setState ({
                last : now
            })
            this.renderCanvas();
        }    
    }
    handleKeyUp = (event) => {
        let _dir = this.state.dir,
            _arr = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
        
        console.log(_arr.includes(event.code));
        
        if (_arr.includes(event.code)) {
            _dir = null;
        }
        
        this.setState({
            dir : _dir
        })
    }
    handleKeyDown = (event) => {
        let _speed = this.state.speed,
            _dir = event.code;
        
        console.log(event.code);
        
        this.setState({
            dir : _dir,
            speed : _speed
        })
    }            

    handleMouseMove = (event) => {
        //event.preventDefault();
        console.log(event);
        let _x = event.clientX || event.touches[0].clientX,
            _y = event.clientY || event.touches[0].clientY;
            
        this.setState ({
            ship: [_x, _y] 
        })
        
    }
    handleMouseDown = (event) => {
        console.log("pew pew");
        
        this.setState({
            firing : true
        })
       
    }
    handleMouseUp = (event) => {
        this.setState({
            //firing : false,
            bullets : []
        })
       
    }
    handleCollision = (el1, el2) => {
        let rect1 = el1.getBoundingClientRect(),
            rect2 = el2.getBoundingClientRect();
        let overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
        
        //console.log("collision -- " + el2.className  + ": " + overlap);
        
        return overlap;
    }
    handleBullet = (x, y) => {
        // drop the bass
        let _bullets = this.state.bullets;
        
        _bullets.push({x : x, y : y});
        
        if (_bullets.length > 15) {
            _bullets.splice(0, _bullets.length - 15);
        } else {
            //_bullets.push({x : x, y : y});
        }
        this.setState({
            bullets : _bullets
        })
    }
    
// ##########
    
    renderCollection = (items) => {
        return (
        
         items.map( item => 
            <div
                className={item.alive ? "junk" : "junk on"}
                style={{
                    "top" :  item.y + "px", 
                    "left" : item.x + "px"
                }}
            ></div>
        ));
    }
    renderBullets = () => {
        return (
        
        this.state.bullets.map((bullet, index) => 
            <div
                className={"bullet"}
                style={{
                    "top" :  bullet.y + "px", 
                    "left" : bullet.x + "px"
                }}
            ></div>
        ));
    }
    
    renderShip = () =>
        <div
            id="ship"
            className={this.state.bullets ? "ship on" : "ship"} 
            style={{
                "top" : this.state.ship[1] + "px", 
                "left" : this.state.ship[0] + "px"
            }}
        ></div>
    
    renderCanvas = () => {
        
        // CHECK FOR COLLISIONS
        const   _ship = document.getElementById("ship"),
                _bullets = this.state.bullets;
                
/*
        this.state.aliens.map((alien, indexJunk) => {
            let _alive = this.handleCollision(_ship, document.getElementsByClassName("junk")[indexJunk]);
            if (_alive) {
                alien.alive = false;
            } else {
                alien.alive = true;
            }
            return alien;
        });
*/

        // MOVE SHIP
        let _dir = this.state.dir,
            _y = this.state.ship[1],
            _x = this.state.ship[0],
            _speed = this.state.speed;
        
        if (_y > (window.innerHeight + 20))
            _y = -20;
        if (_y < -20)
            _y = window.innerHeight + 20;
        
        if (_x > (window.innerWidth + 20))
            _x = -20;
        if (_x < -20)
            _x = window.innerWidth + 20;
        
        if(_dir === 'ArrowUp'){
            _y = _y - _speed;
        }
        if(_dir === 'ArrowDown'){
            _y = _y + _speed;
        }
        if(_dir === 'ArrowRight'){
            _x = _x + _speed;
        }
        if(_dir === 'ArrowLeft'){
            _x = _x - _speed;
        }
        
        // FIRING
        if (this.state.firing)
            this.handleBullet(_x, _y);
                
        this.setState ({
            ship: [_x, _y]
        })
    }
    render() {
        return (
            <main>
                <section>
                    <div>
                        <h1>emptycan.com</h1>
                    </div>
                </section>
                
                { this.renderShip() }
                { 
                    //this.renderCollection(this.state.aliens) 
                }
                { this.renderBullets() }
            </main>
        );
    }
}

export default test;
