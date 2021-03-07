import React from 'react'
import robotImage from './robot.png'
import{useSpring,animated,config} from'react-spring'


import classes from './robot.module.css'

export const Robot = (props) => {
    const {xyz} = useSpring({
        from: {xyz: [0, 0, 0]},
        xyz: [props.xPixels, -props.yPixels, 0],
        config: {mass:40, friction:50, tension:40},
        onFrame: (arg) => {
            if(arg.xyz && arg.xyz[0] === props.xPixels && arg.xyz[1] === -props.yPixels) {
                // do something 
                //  
                props.onRestCallback();
            }
            
        }
    });
    console.log(props.xPixels)
    return (
        <div className={classes.Robot}>
            <animated.img 
            style={{
                transform:  xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
            }}
            className={classes.Robot} src={robotImage} alt=""/>
        </div>
    )
}