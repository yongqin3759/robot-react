import logo from './logo.svg';
import './App.css';
import react, {useState} from 'react'

import {Robot} from './components/robot/robot'
import {Field} from './components/field/field'

const App = ()=> {
  const [fieldDimensions, changeFieldDimensions]= useState({
    fieldWidth: 9,
    fieldHeight: 9,
  })

  const [robotCurrentLocation, robotNextLocation]= useState({
    xPixel:0,
    yPixel:0,
  })

  const nextLocationToPixels = (xCoordinate, yCoordinate)=>{
    let xPixel = xCoordinate*68;
    let yPixel = yCoordinate*63;
    robotNextLocation({xPixel, yPixel})
  }

  const handleSubmitCoordinate = (e)=>{
    e.preventDefault()
    let coordinates= e.target.querySelector('textarea').value.split(",")
    if(coordinates[0]>=fieldDimensions.fieldWidth||coordinates[1]>=fieldDimensions.fieldHeight)return
    nextLocationToPixels(coordinates[0], coordinates[1])
  }
  const handleSubmitFieldSize = (e)=>{
    e.preventDefault()
    let coordinates= e.target.querySelector('textarea').value.split(",")
    changeFieldDimensions({fieldWidth:coordinates[0], fieldHeight:coordinates[1]})
  }
  return (
    <div className="App">
      <header className="App-header">
          <Field
            totalWidth={fieldDimensions.fieldWidth}
            totalHeight={fieldDimensions.fieldHeight}
            xPixels={robotCurrentLocation.xPixel}
            yPixels={robotCurrentLocation.yPixel}
            />
        <form className="Submit-button"onSubmit={(e)=>{handleSubmitCoordinate(e)}}>
          <label>
            Coordinates:<br/>
            <textarea/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        <form className="submit-field-size" onSubmit={(e)=>{handleSubmitFieldSize(e)}}>
          <label>
            Field Size:<br/>
            <textarea/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;