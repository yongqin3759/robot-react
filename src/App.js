import './App.css';
import {useState,useEffect, useCallback} from 'react'

import {Field} from './components/field/field'

const App = ()=> {
  const [fieldDimensions, changeFieldDimensions]= useState({
    fieldWidth: 9,
    fieldHeight: 9,
  })

  const [robotLocation, setRobotLocation]= useState({
    xPixel:0,
    yPixel:0,
  })

  const [isAnimationComplete, setIsAnimationComplete] = useState(true);

  let updatedFieldDimensions={};

  let coordinatesArray =[]

  useEffect(()=>{
    updatedFieldDimensions=fieldDimensions
  },[fieldDimensions]);

  const nextLocationToPixels = (newCoordinates)=>{
    let xPixel;
    let yPixel;
    xPixel = newCoordinates.shift()*68;
    yPixel = newCoordinates.shift()*63;
    setRobotLocation({xPixel, yPixel});
  }

  

  const handleSubmitCoordinate = (e)=>{
    e.preventDefault()
    const coordinates= e.target.querySelector('textarea').value
    setValidatedCoordinate(validateCoordinates(coordinates));
  }
  

  const [validatedCoordinate,setValidatedCoordinate] = useState([]);

  const moveRobot = () => {
    if(Number(validatedCoordinate[0])<=(fieldDimensions.fieldWidth-1) || Number(validatedCoordinate[1])<=(fieldDimensions.fieldHeight-1)){
      nextLocationToPixels(validatedCoordinate)
    }
  }

  useEffect(()=>{
    moveRobot();
  }, [validatedCoordinate])
  
  useEffect(()=>{
    if(isAnimationComplete){
      moveRobot();
    }
  }, [isAnimationComplete])
  useEffect(()=>{
    setIsAnimationComplete(false)
  },[robotLocation])

  const validateBrackets=(string)=>{
    if(string.charAt(0)!=="(" && string.charAt(-1)!==")")return true
    return !string.split("").reduce((previous,char)=>{
      if(previous<0){return previous}
      if(char==="("){return ++previous}
      if(char===")"){return --previous}
      return previous
    },0);
  }

  const validateCoordinates =(coordinates)=>{
    validateBrackets(coordinates)
    if(validateBrackets(coordinates)){
      coordinatesArray=coordinates.replace(/\(/g,'').replace(/\)/g,'').split(",");
    }
    return coordinatesArray
  }

  const handleSubmitFieldSize = (e)=>{
    e.preventDefault()
    let coordinates= e.target.querySelector('textarea').value.split(",")
    changeFieldDimensions({fieldWidth:coordinates[0], fieldHeight:coordinates[1]})
  }

  const parentRestCallback = useCallback(() => {
    setIsAnimationComplete(true);
  }, [isAnimationComplete]);

  const [robotSpeed, setRobotSpeed] = useState(90);

  const handleRobotSpeed = e => {
    e.preventDefault()
    const speed = e.target.querySelector('textarea').value
    setRobotSpeed(speed)
  }

  return (
    <div className="App">
      <header className="App-header">
          <Field
            onRestCallback={parentRestCallback}
            isAnimationComplete={isAnimationComplete}
            totalWidth={fieldDimensions.fieldWidth}
            totalHeight={fieldDimensions.fieldHeight}
            xPixels={robotLocation.xPixel}
            yPixels={robotLocation.yPixel}
            robotSpeed={robotSpeed}
            />
        <form className="submit-field-size" onSubmit={(e)=>{handleSubmitFieldSize(e)}}>
          <label>
            Field Size:<br/>
            <textarea>9,9</textarea>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        <form className="submit-button"onSubmit={(e)=>{handleSubmitCoordinate(e)}}>
          <label>
            Coordinates:<br/>
            <textarea className="coordinates">(6,3), (2,2), (0,8)</textarea>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        <form className="submit-robot-speed"onSubmit={(e)=>{handleRobotSpeed(e)}}>
          <label>
            Robot Speed:<br/>
            <textarea className="robot-speed">90</textarea>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
