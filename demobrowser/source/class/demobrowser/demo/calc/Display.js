qx.Class.define("demobrowser.demo.calc.Display",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);
      
      this._container = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({
        padding: 10,
        width: 200
      });
      this.getRoot().add(this._container);
      
      this.runAll();
    },
    
    run : function(name)
    {
      this.setUp();
      this[name]();
    },
    
    runAll : function()
    {
      for (var name in this) {
        if (name.indexOf("test") == 0 && typeof(this[name]) == "function") {
          this.run(name);
        }
      }
    },
    
    _add : function(widget)
    {
      this._container.add(widget);
    },
    
    setUp : function()
    {
      this.display = new calc.view.Display();
      this._add(this.display);
    },
     
    testModernDisplay : function()
    {
      this.display.set({
        appearance : "modern-display"
      });
      this._add(this.display);
    },
    
    testDisplay : function()
    {
      this.display.display("Juhu Kinners");
      this.assertEquals("Juhu Kinners", this.display.getChildControl("label").getValue());

      this.display.display(12);
      this.assertEquals("12", this.display.getChildControl("label").getValue());
    },
    
    testMemory : function()
    {
      this.assertFalse(this.display.getMemory());
      this.assertFalse(this.display._isChildControlVisible("memory"));
      
      this.display.setMemory(true);
      this.assertTrue(this.display._isChildControlVisible("memory"));
    },
    
    testOperation : function()
    {
      this.assertEquals("", this.display.getOperation());
      
      this.display.setOperation("+");
      this.assertEquals("+", this.display.getChildControl("operation").getValue("+"));
    }
  }
});
