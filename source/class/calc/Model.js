qx.Class.define("calc.Model",
{
  extend : qx.core.Object,

  construct : function() 
  {
    this.base(arguments);
    
    this.initState();
  },
  
  properties :
  {
    state :
    {
      check : ["number", "waitForNumber", "error"],
      event : "changeState",
      init : "number",
      apply : "_applyState"
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
    
    operant : 
    {
      check : "Number",
      nullable : true,
      event : "changeOperant"
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
      if (token.match(/^[0123456789]$/)) {
        this.__readDigit(token);
      } else if (token == "M+") {
        this._onMemoryAddPress();
      } else if (token == "M-") {
        this._onMemorySubPress();
      } else if (token == "MC") {
        this._onMemoryClearPress();
      } else if (token == "MR") {
        this._onMemoryGetPress();
      } else if (token.match(/[\+\-\*\/]/)) {
        this.__readBinaryOperator(token);
      } else if (token == "sign") {
        this.__readSign();
      } else if (token == ".") {
        this.__readDot();
      } else if (token == "=") {
        this.__readEquals();
      } else if (token == "C") {
        this.__readClear();
      }     
    },
    
    
    __compute : function(operant1, operant2, operator)
    {
      switch (operator)
      {
        case "+": 
          return operant1 + operant2;
        case "-":
          return operant1 - operant2;
        case "*":
          return operant1 * operant2;
        case "/":
          if (operant2 == 0)
          {
            this.setErrorMessage("Division by zero!");
            this.setState("error");
            return null;
          } else {
            return operant1 / operant2;
          }
      }
    },
    
    
    _applyState : function(value, old)
    {
      if (value == "number") {
        this.setInput("0");
      } else if (value == "error") {
        this.setOperator(null);
      }
    },
    
    
    __readDigit : function(digit)
    {
      this.setState("number");
      var input = this.getInput();
      
      if (digit == "0") 
      {
        if (input !== "0") {
          input += "0";            
        }        
      }
      else
      {
        if (input == "0") {
          input = digit;
        } else {
          input += digit;          
        }        
      }
      
      this.setInput(input);
    },
    
    
    __readSign : function()
    {
      this.setState("number");
      var input = this.getInput();
      
      if (input == "0") {
        return;
      }
      var isNegative = input.charAt(0) == "-";
      if (isNegative) {
        input = input.substr(1);
      } else {
        input = "-" + input;
      }
      this.setInput(input);
    },
    
    
    __readDot : function()
    {
      this.setState("number");
      var input = this.getInput();
      
      var isFraction = input.indexOf(".") !== -1;
      if (!isFraction) {
        input += ".";
      }
      this.setInput(input);       
    },
    
    
    __readBinaryOperator : function(operator)
    {
      var state = this.getState();
      
      if (state == "error") {
        return;
      } else if (state == "waitForNumber") {
        this.setOperator(operator);
        return;
      }     
      this.setState("waitForNumber");
      
      var operant = parseFloat(this.getInput());     
      var value = this.getValue();
      
      if (value !== null) {
        this.setValue(this.__compute(value, operant, this.getOperator()));
      } else {
        this.setValue(operant);
      }

      this.setOperant(operant);
      this.setOperator(operator);
    },
    
    
    __readEquals : function()
    {
      var operator = this.getOperator();
      if (!operator) {
        return;
      }
      var value = this.getValue();

      if (this.getState() == "waitForNumber")
      {
        this.setValue(this.__compute(value, this.getOperant(), operator));
        return;
      }   
      
      this.setState("waitForNumber");
      
      var operant = parseFloat(this.getInput());
      this.setOperant(operant);  
      
      this.setValue(this.__compute(value, operant, operator));
    },
    
    
    __readClear : function()
    {
      this.setState("number");
      this.setOperator(null);
      this.setValue(null);
    }
  } 
});