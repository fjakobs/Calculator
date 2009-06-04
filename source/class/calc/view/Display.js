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
    display : function(value) {
      this.getChildControl("label").setValue(value.toString());
    },
    
    
    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
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