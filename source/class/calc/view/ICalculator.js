qx.Interface.define("calc.view.ICalculator",
{
  events : {
    "buttonPress" : "qx.event.type.Data"
  },
  
  properties : 
  {
    display : {},
    
    memory : {
      check : "Boolean"
    },
    
    operation : {
      check : "String"
    }    
  }
});