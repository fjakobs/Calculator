qx.Class.define("calc.test.view.DemoTestCase",
{
  extend : qx.test.ui.LayoutTestCase,
  type : "abstract",

  members :
  {
    isDemoTest : function() {
      return !!window.RUN_AS_DEMO;
    },
  
  
    tearDown : function()
    {
      if (!this.isDemoTest()) {
        this.base(arguments);
      }
    },
    
    
    _createDemoContainer : function()
    {
      return new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({
        padding: 10
      });
    },
    
    
    getRoot : function()
    {
      if (!this.isDemoTest()) {
        return this.base(arguments);
      }

      var cls = qx.test.ui.LayoutTestCase;

      if (!cls._root)
      {
        cls._root = this._createDemoContainer();
        qx.core.Init.getApplication().getRoot().add(cls._root);
      }
      return cls._root;
    }
  }
});