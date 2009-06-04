qx.Class.define("calc.Presenter",
{
  extend : qx.core.Object,

  construct : function(view) 
  {
    this.base(arguments);
    this.setView(view);
    this.clear();
  },
  
  properties :
  {
    view :
    {
      check : "calc.view.ICalculator",
      apply : "_applyView"
    },
    
    memory :
    {
      check : "Number",
      nullable : true,
      event : "changeMemory"
    }
  },
  
  members :
  {
    _applyView : function(value, old)
    {
      if (old) {
        throw new Error("The view cannot be changed!");
      }
      
      value.addListener("buttonPress", this._onButtonPress, this);
      
      this.bind("memory", value, "memory", {
        converter : function(data) {
          return data !== null; 
        }
      });
    },
    
    
   /**
    * Show the given text in the display
    * 
    * @param text {String} The text to display
    */    
    display : function(text) {
      this.getView().setDisplay(text);
    },
    
    
    /**
     * Reset the calculator
     */
    clear : function()
    {
      this._value = "0";
      this._computation = 0;
      this._pendingOperation = null;
      this._transientValue = null;
      this.display(this._value);
    },    
    
    
    /**
     * Perform the pending operation
     */
    compute : function()
    {    
      if (this._waitForOperand || !this._pendingOperation) {
        return
      }
      var intValue = parseFloat(this._value);
      switch(this._pendingOperation)
      {
        case "+":
          this._computation += intValue;
          break;

        case "-":
          this._computation -= intValue;
          break;

        case "*":
          this._computation *= intValue;
          break;

        case "/":
          if (intValue == 0)
          {
            this.clear();
            this.display("Division by zero!");
            return;
          } else {
            this._computation /= intValue;
          }
          break;
      }
     
      this._value = "0";
      this._pendingOperation = null;  
      this.getView().setOperation("");
     
      this._waitForOperand = false;
      this.display(this._computation.toString());
    },
    
    
    _onButtonPress : function(e)
    {
      var key = e.getData();
      
      if (key.match(/[0123456789]/)) {
        this._onDigitPress(key);
      } else if (key == "M+") {
        this._onMemoryAddPress();
      } else if (key == "M-") {
        this._onMemorySubPress();
      } else if (key == "MC") {
        this._onMemoryClearPress();
      } else if (key == "MR") {
        this._onMemoryGetPress();
      } else if (key.match(/[\+\-\*\/]/)) {
        this._onBinaryOperandPress(key);
      } else if (key == "sign") {
        this._onSignPress();
      } else if (key == ".") {
        this._onDotPress();
      } else if (key == "=") {
        this._onEqualsPress();
      }
    },
    
    
    /**
     * Handles the execution of the digit buttons
     */
    _onDigitPress : function(digit)
    {
      if (digit == "0") 
      {
        if (this._value !== "0") {
          this._value += "0";            
        }        
      }
      else
      {
        if (this._value == "0") {
          this._value = digit;
        } else {
          this._value += digit;          
        }        
      }
      
      this._waitForOperand = false;
      this._transientValue = null;
      this.display(this._value);      
    },
    
    
    /**
     * Handles the press of the plus/minus sign
     */
    _onSignPress : function()
    {
      if (this._value == "0") {
        return;
      }
      var isNegative = this._value.charAt(0) == "-";
      if (isNegative) {
        this._value = this._value.substr(1);
      } else {
        this._value = "-" + this._value;
      }
      this._waitForOperand = false;
      this._transientValue = null;
      this.display(this._value);      
    },
    
    
    /**
    * Handles the press of the decimal separator
    */
   _onDotPress : function() 
    {
      var isFraction = this._value.indexOf(".") !== -1;
      if (!isFraction) {
        this._value += ".";
      }
      this._waitForOperand = false;
      this._transientValue = null;
      this.display(this._value);      
    },
    
    
    /**
     * Handles the press of any of the binary operators
     */
    _onBinaryOperandPress : function(operator)
    {
      if (this._pendingOperation) {
        this.compute();
      } else if (this._transientValue !== null) {
        this._computation = this._transientValue;
      } else {
        this._computation = parseFloat(this._value);
      }
      this._value = "0";
      this._pendingOperation = operator; 
      this.getView().setOperation(operator);
      this._waitForOperand = true;      
    },
    
    
    /**
     * Handles the press of the equals sign
     */    
    _onEqualsPress : function()
    {
      if (this._pendingOperation) {
        this.compute();
      } else {
        this._computation = parseFloat(this._value);
      } 
      this._transientValue = this._computation;
      this._value = "0";     
    },    
    
    
    /**
     * Clears the memory
     */      
    _onMemoryClearPress : function() {
      this.setMemory(null);
    },
    
    
    /**
     * Adds the current value to the memory
     */
    _onMemoryAddPress : function() 
    {
      this.setMemory((this.getMemory() || 0) + parseFloat(this._value));
      this._value = "0";
      this._waitForOperand = true; 
    },
    
    /**
     * Substracts the current value from the memory
     */
    _onMemorySubPress : function() 
    {
      this.setMemory((this.getMemory() || 0) - parseFloat(this._value));
      this._value = "0";
      this._waitForOperand = true; 
    },

   
    /**
     * Replaces the current value with the memory
     */
    _onMemoryGetPress : function()
    {
      this._value = this.getMemory();
      this._waitForOperand = false;
      this._transientValue = null;
    }    
  } 
});