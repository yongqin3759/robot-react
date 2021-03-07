import React from 'react'
import robotImage from './robot.png'
import{useSpring,animated} from'react-spring'


import classes from './robot.module.css'

export const Robot = (props) => {
    const {xyz} = useSpring({
        from: {xyz: [0, 0, 0]},
        xyz: [props.xPixels, -props.yPixels, 0],
        config: {mass:40, friction:100, tension:90, clamp:true},
        onRest: (arg) => {
        props.onRestCallback()
        console.log('This animaton has completed')
        }
    });
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