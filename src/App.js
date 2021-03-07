import './App.css';
import {useState,useEffect} from 'react'

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

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  let updatedFieldDimensions={};
  let animationComplete = false
  let coordinatesArray =[]

  useEffect(()=>{
    updatedFieldDimensions=fieldDimensions
  },[fieldDimensions]);

  const nextLocationToPixels = (newCoordinates)=>{
    let xPixel;
    let yPixel;
    
    console.log(newCoordinates)
    xPixel = newCoordinates.shift()*68;
    yPixel = newCoordinates.shift()*63;
    
    console.log('is animation complete? ',isAnimationComplete)
    robotNextLocation({xPixel, yPixel});
    
    
    
  }

  const handleSubmitCoordinate = (e)=>{
    e.preventDefault()
    const coordinates= e.target.querySelector('textarea').value
    const validatedCoordinates = validateCoordinates(coordinates);
    setIsAnimationComplete(false)
    animationComplete=false
    if(Number(validatedCoordinates[0])<=(fieldDimensions.fieldWidth-1) || Number(validatedCoordinates[1])<=(fieldDimensions.fieldHeight-1)){
      nextLocationToPixels(validatedCoordinates)
    }  
  }

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

  const parentRestCallback = () => {
    setIsAnimationComplete(true)
    console.log(isAnimationComplete)
    if(isAnimationComplete===true){
      console.log(isAnimationComplete)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <Field
            onRestCallback={parentRestCallback}
            isAnimationComplete={isAnimationComplete}
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
            <textarea className="coordinates">(4,6),(2,2)</textarea>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;