# PIXISliderInput
Basic Slider Input class for PIXI js, with HTML input interface

##Properties
  1. ``` width ``` 
  2. ``` height ``` the axis to slide. Y by default
  3. ``` notCentered ``` 
  
##Methods

  1. ``` getSliderVal ``` - returns the value of the slider between 0 and 100
  2. ``` setSliderVal ``` - sets thevalueof the slider
  
```js  
Example Usage
  var slider = new Slider( 500, 4, false );
  
  slider.setVal( 43 );
  slider.getVal();
```  
