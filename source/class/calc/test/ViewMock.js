qx.Class.define("calc.test.ViewMock",
{
  extend : qx.core.Object,
  implement : [calc.view.ICalculator],
  
  events : {
    "buttonPress" : "qx.event.type.Data"
  },
  
  properties : 
  {
    display :
    {
      init : "0",
      event : "changeDisplay"
    },
    
    memory :
    {
      check : "Boolean",
      init : false,
      event : "changeMemory"
    },
    
    operation :
    {
      check : "String",
      init : "",
      event : "changeOperation"
    }    
  },
  
  members : 
  {
    pressButtons : function(varargs)
    {
      for (var i=0; i<arguments.length; i++) {
        this.fireDataEvent("buttonPress", arguments[i]);
      }
    }
  }
});