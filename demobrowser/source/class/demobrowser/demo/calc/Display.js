qx.Class.define("demobrowser.demo.calc.Display",
{
  extend : demobrowser.demo.DemoTestRunner,

  members :
  {
    main : function()
    {
      this.base(arguments);
      this.initializeTestClass(calc.test.view.Display);
    }
  }
});
