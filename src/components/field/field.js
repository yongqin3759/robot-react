import React from 'react'
import classes from './field.module.css'
import {Robot} from '../robot/robot'
export const Field = (props) => {
    const rowBlocks = []
    let rowHeightInPixels = (props.totalHeight) * 67;
    let rowWidthInPixels = (props.totalWidth) * 68;
    
    (()=>{for(let i=0; i<props.totalWidth;i++){
        for(let j=0; j<props.totalHeight; j++){
            rowBlocks.push(<div className={classes.Block}>{i},{j}</div>)
        }
        }
    })()    
    return (
        <div className={classes.Field} style={{width:rowWidthInPixels+'px', height:rowHeightInPixels+'px'}}>
            {rowBlocks}
            <Robot
                onRestCallback={props.onRestCallback}
                xPixels={props.xPixels}
                yPixels={props.yPixels}
            />
        </div>
    )
}