qx.Class.define("calc.view.Display",
{
  extend : qx.ui.core.Widget,
  
  construct : function()
  {
    this.base(arguments);
    
    this._setLayout(new qx.ui.layout.Canvas());
    
    this._add(this.getChildControl("label"), {top: 0, right: 0});
    this._add(this.getChildControl("memory"), {bottom: 0, left: 0});
    this._add(this.getChildControl("operation"), {bottom: 0, left: 0});    
  },
  
  properties :
  {
    appearance : 
    {
      refine : true,
      init : "display"
    },
    
    display : 
    {
      init : "0",
      apply : "_applyDisplay"
    },
    
    memory :
    {
      check : "Boolean",
      init : false,
      apply : "_applyMemory"
    },
    
    operation :
    {
      check : "String",
      init : "",
      apply : "_applyOperation"
    }
  },
  
  members : 
  {
    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "label":
          control = new qx.ui.basic.Label(this.getDisplay());
          break;
          
        case "memory":
          control = new qx.ui.basic.Label("M");
          control.exclude();
          break;

        case "operation":
          control = new qx.ui.basic.Label(this.getOperation());
          control.setRich(true);
          break;
      }

      return control || this.base(arguments, id);
    },
    
    
    _applyDisplay : function(value, old) {
      this.getChildControl("label").setValue(value.toString());
    },
    
    
    _applyMemory : function(value, old) 
    {
      if (value) {
        this._showChildControl("memory");
      } else {
        this._excludeChildControl("memory");
      }
    },
    
    
    _applyOperation : function(value, old)
    {
      this.getChildControl("operation").setValue(value.toString());
    }
  }
});