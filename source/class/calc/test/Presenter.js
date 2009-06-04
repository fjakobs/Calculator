qx.Class.define("calc.test.Presenter",
{
  extend : qx.dev.unit.TestCase,
  
  members :
  {
  
    setUp : function() 
    {
      this.view = new calc.test.ViewMock();
      this.presenter = new calc.Presenter(this.view);
    },
    
    testSetDisplay : function()
    {
      this.presenter.display("123");
      this.assertEquals("123", this.view.getDisplay());
    },
    
    testInputDigits : function()
    {
      this.view.pressButtons("1", "2", "3");
      this.assertEquals("123", this.view.getDisplay());
    },
    
    testInputZeros : function()
    {
      this.view.pressButtons("0");
      this.assertEquals("0", this.view.getDisplay());

      this.view.pressButtons("0", "0", "1", "0");
      this.assertEquals("10", this.view.getDisplay());
    },
    
    
    testInputSign : function()
    {
      this.view.pressButtons("sign");
      this.assertEquals("0", this.view.getDisplay());
      
      this.view.pressButtons("1", "sign");
      this.assertEquals("-1", this.view.getDisplay());
      
      this.view.pressButtons("sign", "0");
      this.assertEquals("10", this.view.getDisplay());
    },
    
    
    testInputDot : function()
    {
      this.view.pressButtons(".");
      this.assertEquals("0.", this.view.getDisplay());
      
      this.view.pressButtons(".", ".", ".");
      this.assertEquals("0.", this.view.getDisplay());
      
      this.view.pressButtons("1", ".", ".", ".", "2");
      this.assertEquals("0.12", this.view.getDisplay());      
    },
    
    
    testBinaryOperation : function()
    {
      this.view.pressButtons("+");
      this.assertEquals("+", this.view.getOperation());

      this.view.pressButtons("*");
      this.assertEquals("*", this.view.getOperation());
      
      this.view.pressButtons("/");
      this.assertEquals("/", this.view.getOperation());
      
      this.view.pressButtons("-");
      this.assertEquals("-", this.view.getOperation());
    },
    
    
    testEqualPress : function()
    {
      this.view.pressButtons("1", "+", "2", "=");
      this.assertEquals("", this.view.getOperation());
      this.assertEquals("3", this.view.getDisplay());
    },

    
    testMemory : function()
    {
      this.view.pressButtons("1", "M+");
      this.assertEquals(1, this.presenter.getMemory());
      this.assertEquals(true, this.view.getMemory());

      this.view.pressButtons("5", "M+");
      this.assertEquals(6, this.presenter.getMemory());
      this.assertEquals(true, this.view.getMemory());
      
      this.view.pressButtons("3", "M-");
      this.assertEquals(3, this.presenter.getMemory());
      this.assertEquals(true, this.view.getMemory());
      
      this.view.pressButtons("MR");
      this.assertEquals("3", this.view.getDisplay());
      this.assertEquals(true, this.view.getMemory());
      
      this.view.pressButtons("MC");
      this.assertEquals(null, this.presenter.getMemory());
      this.assertEquals(false, this.view.getMemory());
    }
  }
})