import React from 'react'
import robotImage from './robot.png'

import classes from './robot.module.css'

export const Robot = (props) => {
    const robotPositionStyle = {left:props.xPixels+'px',bottom:props.yPixels+'px'}
    return (
        <div className={classes.Robot} style={robotPositionStyle}>
            <img className={classes.Robot} src={robotImage} alt=""/>
        </div>
    )
}