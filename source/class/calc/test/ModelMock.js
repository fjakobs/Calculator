qx.Class.define("calc.test.ModelMock",
{
  extend : qx.core.Object,
  
  properties :
  {
    state :
    {
      check : ["number", "waitForNumber", "error"],
      event : "changeState",
      init : "number"
    },
    
    errorMessage : 
    {
      check : "String",
      init : "",
      event : "changeErrorMessage"
    },
    
    input : 
    {
      check : "String",
      nullable : true,
      event : "changeInput"
    },
    
    operator :
    {
      check : ["+", "-", "*", "/"],
      nullable : true,
      event : "changeOperator"
    },
    
    value : 
    {
      check : "Number",
      nullable : true,
      event : "changeValue"
    }
  },
  
  members : 
  {
    readToken : function(token)
    {
      if (this.tokens) {
        this.tokens.push(token);
      } else {
        this.tokens = [token];
      }
    }
  }
});