qx.Class.define("calc.Presenter",
{
  extend : qx.core.Object,

  construct : function(view, model) 
  {
    this.base(arguments);
    this.setView(view);
    this.setModel(model);
  },
  
  properties :
  {
    view :
    {
      check : "calc.view.ICalculator",
      apply : "_applyViewModel"
    },
    
    model :
    {
      apply : "_applyViewModel",
      init : null
    }
  },
  
  members :
  {
    _applyViewModel : function(value, old)
    {
      if (old) {
        throw new Error("The view and model cannot be changed!");
      }
      
      var model = this.getModel();
      var view = this.getView();
      
      if (!model || !view) {
        return;
      }
      
      this.__bindView();
      this.__bindModel();
    },
    
    
    __bindView : function() {
      this.getView().addListener("buttonPress", this._onButtonPress, this);
    },
    
    
    _onButtonPress : function(e) {
      this.getModel().readToken(e.getData());
    },
    
    
    __bindModel : function() 
    {
      var model = this.getModel();
      var view = this.getView();
      
      model.bind("operator", view, "operation");
      
      model.addListener("changeState", this._updateDisplay, this);
      model.addListener("changeInput", this._updateDisplay, this);
      model.addListener("changeValue", this._updateDisplay, this);
      model.addListener("changeErrorMessage", this._updateDisplay, this);
    },
    
    
    _updateDisplay : function(e)
    {
      var displayValue;
      var model = this.getModel();
      
      switch(this.getModel().getState())
      {
        case "number":
          displayValue = model.getInput();
          break;
        
        case "waitForNumber":
          displayValue = model.getValue() + "";
          break;
          
        case "error":
          displayValue = model.getErrorMessage();
          break;
      }
      
      this.getView().setDisplay(displayValue || "");
    }
  } 
});