import logo from './logo.svg';
import './App.css';
import react, {useState,useEffect} from 'react'

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

  let updatedFieldDimensions={};

  useEffect(()=>{
    updatedFieldDimensions=fieldDimensions
  },[fieldDimensions]);

  const nextLocationToPixels = (xCoordinate, yCoordinate)=>{
    let xPixel = xCoordinate*68;
    let yPixel = yCoordinate*63;
    robotNextLocation({xPixel, yPixel})
  }

  const handleSubmitCoordinate = (e)=>{
    e.preventDefault()
    const coordinates= e.target.querySelector('textarea').value
    const validatedCoordinates = validateCoordinates(coordinates);

    if(Number(validatedCoordinates[0])<=(fieldDimensions.fieldWidth-1) || Number(validatedCoordinates[1])<=(fieldDimensions.fieldHeight-1)){
      nextLocationToPixels(validatedCoordinates[0], validatedCoordinates[1])
    }  
  }

  const validateBrackets=(string)=>{
    if(string.charAt(0)!="(" && string.charAt(-1)!=")")return true
    return !string.split("").reduce((previous,char)=>{
      if(previous<0){return previous}
      if(char==="("){return ++previous}
      if(char===")"){return --previous}
      return previous
    },0);
  }

  const validateCoordinates =(coordinates)=>{
    validateBrackets(coordinates)
    let coordinatesArray
    if(validateBrackets(coordinates)){
      coordinatesArray=coordinates.replace(/\(/g,'').replace(/\)/g,'').split(",");
      console.log(coordinatesArray)
    }
    return coordinatesArray
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
        <form className="submit-field-size" onSubmit={(e)=>{handleSubmitFieldSize(e)}}>
          <label>
            Field Size:<br/>
            <textarea/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        <form className="Submit-button"onSubmit={(e)=>{handleSubmitCoordinate(e)}}>
          <label>
            Coordinates:<br/>
            <textarea>(4,5)</textarea>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;