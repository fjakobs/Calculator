/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Calculator class
 * 
 * This is an example, which demonstrates some of qooxdoo's key techniques like
 * 
 * * Custom themes
 * * Working with layouts
 * * Working with events
 * * Using sub widgets
 */
qx.Class.define("calc.Calculator",
{
  extend : qx.ui.window.Window,
  
  construct : function()
  {
    this.base(arguments, "Calculator");    
    
    // configure window
    this.set({
      showMinimize: false,
      showMaximize: false,
      showClose : false
    });
    
    // set window layout
    this.setLayout(new qx.ui.layout.VBox());

    // add display and buttons
    this._initButtons();
    this.add(this._getChildControl("display"));      
    this.add(this._createButtonContainer(), {flex: 1});

    // attach key event listeners
    this._initKeyIdentifier();
    this.addListener("keydown", this._onKeyDown, this);
    this.addListener("keyup", this._onKeyUp, this);
    this.addListener("keypress", this._onKeyPress, this);
    
    // attach button execute listeners
    for (var i=0; i<=9; i++) {
      this._buttons[i+""].addListener("execute", this._onDigitPress, this);
    }

    this._buttons["C"].addListener("execute", this.clear, this);
    this._buttons["sign"].addListener("execute", this._onSignPress, this);
    this._buttons["."].addListener("execute", this._onDotPress, this);
    
    this._buttons["+"].addListener("execute", this._onBinaryOperandPress, this);
    this._buttons["-"].addListener("execute", this._onBinaryOperandPress, this);
    this._buttons["*"].addListener("execute", this._onBinaryOperandPress, this);
    this._buttons["/"].addListener("execute", this._onBinaryOperandPress, this);

    this._buttons["="].addListener("execute", this._onEqualsPress, this);
    
    this._buttons["MC"].addListener("execute", this._onMemoryClearPress, this);
    this._buttons["M+"].addListener("execute", this._onMemoryAddPress, this);
    this._buttons["M-"].addListener("execute", this._onMemorySubPress, this);
    this._buttons["MR"].addListener("execute", this._onMemoryGetPress, this);    

    // reset calculator
    this.clear();
  },
  
  
  properties : 
  {
    appearance :
    {
      refine : true,
      init : "calculator"
    }  
  },
  
  
  members :
  {
    /** {Map} Maps button ids to the button instances */
    _buttons : null,
    
    /** {Map} Maps the button's key identifier to the button instances */
    _keyIdentifier : null,
    
    /** The button, which is currently pressed using the keyboard */    
    _pressedButton : null,
    
    
    /**
    * {Integer} The content of the calculator's memory as managed by the 
    *     memory keys
    */
    _memory : 0,
    
    /** {Integer} The current value as shown in the display */
    _value : "0",
    
    /** 
     * {Integer} This is computed value after the "equals" key is pressed. The
     *    value becomes active if the equals key is followed by an operand key.
     */
    _transientValue : null,
    
    /** {Integer} Accumulator for the last performed computation */
    _computation : 0,
    
    /** {String} The pending operation */
    _pendingOperation : null,
    
    /** {Boolean} Whether the calculator waits for an operand */
    _waitForOperand : true,
        
            
    /*
    ---------------------------------------------------------------------------
      INITIALIZATION
    ---------------------------------------------------------------------------
    */
        
    /**
     * Initialize the buttons and store them in the "_buttons" map.
     */    
    _initButtons : function()
    {    
      this._buttons =
      {
        "MC": new calc.Button("MC", 0, 0),
        "M+": new calc.Button("M+", 0, 1),
        "M-": new calc.Button("M-", 0, 2),
        "MR": new calc.Button("MR", 0, 3),

        "C": new calc.Button("C", 1, 0),
        "sign": new calc.Button("&plusmn;", 1, 1),
        "/": new calc.Button("&divide;", 1, 2, null, null, "/"),
        "*": new calc.Button("*", 1, 3, null, null, "*"),

        "7": new calc.Button("7", 2, 0, null, null, "7"),
        "8": new calc.Button("8", 2, 1, null, null, "8"),
        "9": new calc.Button("9", 2, 2, null, null, "9"),
        "-": new calc.Button("-", 2, 3, null, null, "-"),

        "4": new calc.Button("4", 3, 0, null, null, "4"),
        "5": new calc.Button("5", 3, 1, null, null, "5"),
        "6": new calc.Button("6", 3, 2, null, null, "6"),
        "+": new calc.Button("+", 3, 3, null, null, "+"),
        
        "1": new calc.Button("1", 4, 0, null, null, "1"),
        "2": new calc.Button("2", 4, 1, null, null, "2"),
        "3": new calc.Button("3", 4, 2, null, null, "3"),
        "=": new calc.Button("=", 4, 3, 2, null, "Enter"),

        "0": new calc.Button("0", 5, 0, null, 2, "0"),
        ".": new calc.Button(
          qx.locale.Number.getDecimalSeparator(),
          5, 2, null, null,
          qx.locale.Number.getDecimalSeparator()
        )
      };
    },
    
    
    /**
     * Configures a map, which maps the button's key identifiers to the button.
     * The map is stored in the protected member "_keyIdentifier".
     */
    _initKeyIdentifier : function()
    {
      this._keyIdentifier = []
      for (var name in this._buttons)
      {
        var key = this._buttons[name].getKeyIdentifier();
        if (key) {
          this._keyIdentifier[key] = this._buttons[name];
        }
      }
    },     
    
    
    /*
    ---------------------------------------------------------------------------
      WIDGET CREATION
    ---------------------------------------------------------------------------
    */    

    
    //overridden
    _applyAppearance : function(value, old)
    {
      this.base(arguments, value, old);
      
      // forward appearance name to the buttons
      for (var name in this._buttons) {
        this._buttons[name].setAppearance(value + "-button");
      }
    },
    
    
    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "display":
          var control = new qx.ui.container.Composite();
          control.setLayout(new qx.ui.layout.Canvas());
          
          control.add(this._getChildControl("label"), {top: 0, right: 0});
          control.add(this._getChildControl("memory"), {bottom: 0, left: 0});
          control.add(this._getChildControl("operation"), {bottom: 0, left: 0});
          break;

        case "label":
          control = new qx.ui.basic.Label("0");
          break;
          
        case "memory":
          control = new qx.ui.basic.Label("M");
          control.exclude();
          break;

        case "operation":
          control = new qx.ui.basic.Label("");
          control.setRich(true);
          break;
      }

      return control || this.base(arguments, id);
    },
    
    
    /**
     * Creates the button container and configures it with a flexible grid
     * layout. Further it adds the buttons to the container.
     */      
    _createButtonContainer : function()
    {
      var container = new qx.ui.container.Composite();
        
      // configure button container with a grid layout
      var grid = new qx.ui.layout.Grid(5, 5);
      container.setLayout(grid);
        
      // make grid resizeable
      for (var row=0; row<6; row++) {
        grid.setRowFlex(row, 1);
      }
      for (var col=0; col<6; col++) {
        grid.setColumnFlex(col, 1);
      }
      
      // add buttons
      for (var name in this._buttons)
      {
        var button = this._buttons[name];
        //button.setAppearance(this._isThemed ? "calc-button" : "button");   
        button.setAppearance(this.getAppearance() + "-button");
        container.add(button)      
      }      
      return container;
    },   
    
        
    /*
    ---------------------------------------------------------------------------
      CALCULATOR LOGIC
    ---------------------------------------------------------------------------
    */        
    
    /**
     * Show the given text in the display
     * 
     * @param text {String} The text to display
     */
    display : function(text) {
      this._getChildControl("label").setContent(text.toString());
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
      this._getChildControl("operation").setContent("");
      
      this._waitForOperand = false;
      this.display(this._computation.toString());
    },
    
    
    /**
     * Handles the execution of the digit buttons
     * 
     * @param e {qx.event.type.Event} Execute event
     */
    _onDigitPress : function(e)
    {
      var digit = e.getTarget().getLabel();
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
     *
     * @param e {qx.event.type.Event} Execute event
     */
    _onBinaryOperandPress : function(e)
    {
      var button = e.getTarget();
      var name = qx.lang.Object.getKeyFromValue(this._buttons, button);

      if (this._pendingOperation) {
        this.compute();
      } else if (this._transientValue !== null) {
        this._computation = this._transientValue;
      } else {
        this._computation = parseFloat(this._value);
      }
      this._value = "0";
      this._pendingOperation = name; 
      this._getChildControl("operation").setContent(button.getLabel());         
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
    _onMemoryClearPress : function()
    {
      this._memory = 0;
      this._excludeChildControl("memory");
    },

    
    /**
     * Adds the current value to the memory
     */
    _onMemoryAddPress : function() 
    {
      this._memory += parseFloat(this._value);
      this._showChildControl("memory");
    },

    
    /**
     * Substracts the current value from the memory
     */
    _onMemorySubPress : function() {
      this._memory -= parseFloat(this._value);
    },

    
    /**
     * Replaces the current value with the memory
     */
    _onMemoryGetPress : function()
    {
      this._value = this._memory;
      this._waitForOperand = false;
      this._transientValue = null;
      this.display(this._value);
    },
    
    
    /*
    ---------------------------------------------------------------------------
      KEY EVENT HANDLING
    ---------------------------------------------------------------------------
    */
    
    /**
     * Key down event handler. Visually presses the button associated with the
     * pressed key.
     * 
     * @param e {qx.event.type.KeySequence} Key event object
     */
    _onKeyDown : function(e)
    {
      var button = this._keyIdentifier[e.getKeyIdentifier()];
      if (!button) {
        return;
      }
      
      button.press();      
      
      if (this._pressedButton && this._pressedButton !== button) {
        this._pressedButton.release();
      }      
      this._pressedButton = button;
      
      e.stop();
    },
    
    
    /**
     * Key up event handler. Visually releases the button associated with the
     * released key.
     * 
     * @param e {qx.event.type.KeySequence} Key event object
     */
    _onKeyUp : function(e)
    {
      var button = this._keyIdentifier[e.getKeyIdentifier()];
      if (!button) {
        return;
      }
      
      button.release();
      e.stop();
    },
    
    
    /**
     * Key press event handler. Executes the button associated with the pressed
     * key.
     * 
     * @param e {qx.event.type.KeySequence} Key event object
     */    
    _onKeyPress : function(e)
    {
      var button = this._keyIdentifier[e.getKeyIdentifier()];
      if (!button) {
        return;
      }
      
      button.execute();
      e.stop();
    }    
  }
});
