qx.Class.define("calc.test.Model",
{
  extend : qx.dev.unit.TestCase,
  
  members :
  {
    setUp : function() 
    {
      this.model = new calc.Model();
    },
    
    
    readTokens : function(varargs)
    {
      for (var i=0; i<arguments.length; i++) {
        this.model.readToken(arguments[i]);
      }
    },
    
    
    testReadNumber : function()
    {
      this.readTokens("1", "0");
      this.assertEquals("10", this.model.getInput());
    },
    
    
    testReadZeros : function()
    {
      this.readTokens("0");
      this.assertEquals("0", this.model.getInput());

      this.readTokens("0", "0", "1", "0");
      this.assertEquals("10", this.model.getInput());
    },
    
    
    testReadSign : function()
    {
      this.readTokens("sign");
      this.assertEquals("0", this.model.getInput());
      
      this.readTokens("1", "sign");
      this.assertEquals("-1", this.model.getInput());
      
      this.readTokens("sign", "0");
      this.assertEquals("10", this.model.getInput());
    },
    
    
    testReadDot : function()
    {
      this.readTokens(".");
      this.assertEquals("0.", this.model.getInput());
      
      this.readTokens(".", ".", ".");
      this.assertEquals("0.", this.model.getInput());
      
      this.readTokens("1", ".", ".", ".", "2");
      this.assertEquals("0.12", this.model.getInput());      
    },
    
    
    testReadBinaryOperator : function()
    {
      this.readTokens("1", "+");
      this.assertEquals("+", this.model.getOperator());
      this.assertEquals("waitForNumber", this.model.getState());
    },
    
    
    testReadClear : function()
    {
      this.readTokens("1", "+", "1", "=", "C");
      this.assertEquals(null, this.model.getOperator());
      this.assertEquals("number", this.model.getState());
    },
    
    
    testSum : function()
    {
      this.readTokens("1", "+", "2", "+");
      this.assertEquals(3, this.model.getValue());
    },
    
    
    testDifference : function()
    {
      this.readTokens("1", "-", "2", "=");
      this.assertEquals(-1, this.model.getValue());
    },
    
    
    testProduct : function()
    {
      this.readTokens("2", "*", "3", "=");
      this.assertEquals(6, this.model.getValue());
    },
    
    
    testDivision : function()
    {
      this.readTokens("1", "0", "/", "2");
      this.readTokens("=");
      this.assertEquals(5, this.model.getValue());
    },
    
    
    testDivisionByZero : function()
    {
      this.readTokens("1", "0", "/", "0", "=");
      this.assertEquals("error", this.model.getState());
      this.assertEquals("Division by zero!", this.model.getErrorMessage());
      this.assertEquals(null, this.model.getOperator());
      this.assertEquals(null, this.model.getValue());      
    },
    
    
    testReadEqualsInError : function()
    {
      this.readTokens("1", "0", "/", "0", "=", "=");
      this.assertEquals("error", this.model.getState());
      this.assertEquals("Division by zero!", this.model.getErrorMessage());
      this.assertEquals(null, this.model.getOperator());
      this.assertEquals(null, this.model.getValue());            
    },
    
    
    testSumAfterError : function()
    {
      this.readTokens("8", "/", "0", "=");
      this.readTokens("1", "+", "3", "=");
      this.assertEquals(4, this.model.getValue());       
    },
    
    
    testReadOperatorInError : function()
    {
      this.readTokens("1", "0", "/", "0", "=", "+");
      this.assertEquals("error", this.model.getState());
      this.assertEquals("Division by zero!", this.model.getErrorMessage());
      this.assertEquals(null, this.model.getOperator());
      this.assertEquals(null, this.model.getValue());            
    },    
    
    
    testReadEquals : function()
    {
      this.readTokens("1", "+", "2");
      this.assertEquals("number", this.model.getState());
      this.assertEquals(1, this.model.getValue());
      this.assertEquals("+", this.model.getOperator());

      this.readTokens("=");
      this.assertEquals(3, this.model.getValue());
    },
    
    
    testMultipleAdd : function()
    {
      this.readTokens("1", "+", "=");
      this.assertEquals(2, this.model.getValue());

      this.readTokens("=", "=");
      this.assertEquals(4, this.model.getValue());
    }
  }
});