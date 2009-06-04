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

qx.Class.define("calc.test.Presenter",
{
  extend : qx.dev.unit.TestCase,
  
  members :
  {
    setUp : function() 
    {
      this.view = new calc.test.ViewMock();
      this.model = new calc.test.ModelMock();
      this.presenter = new calc.Presenter(this.view, this.model);
    },
    
    
    testOperator : function()
    {
      this.model.set({
        state : "number",
        operator : null
      });
      
      this.assertEquals("", this.view.getOperation());

      this.model.setOperator("*");
      this.assertEquals("*", this.view.getOperation());

      this.model.setOperator(null);
      this.assertEquals("", this.view.getOperation());
    },
    
    
    testNumberState : function()
    {
      this.model.set({
        state : "number",
        input : "123"
      });
      
      this.assertEquals("123", this.view.getDisplay());
    },
    
    
    testWaitForNumberState : function()
    {
      this.model.set({
        value : 456,
        state : "waitForNumber"
      });
      
      this.assertEquals("456", this.view.getDisplay());
    },
    
    
    testErrorState : function()
    {
      this.model.set({
        state : "error",
        errorMessage : "Doofer Fehler"
      });
      
      this.assertEquals("Doofer Fehler", this.view.getDisplay());
    },
    
    
    testMemory : function()
    {
      this.model.set({
        memory : null
      });
      
      this.assertEquals(false, this.view.getMemory());      

      this.model.setMemory(0);
      this.assertEquals(true, this.view.getMemory());      

      this.model.setMemory(12);
      this.assertEquals(true, this.view.getMemory());      

      this.model.setMemory(null);
      this.assertEquals(false, this.view.getMemory());      
    },
    
    
    testChangeState : function()
    {
      this.model.set({
        state : "number",
        input : "123",
        value : 456,
        errorMessage : "doofer Fehler"
      });
      
      this.assertEquals("123", this.view.getDisplay());
      
      this.model.setState("waitForNumber");      
      this.assertEquals("456", this.view.getDisplay());      

      this.model.setState("error");      
      this.assertEquals("doofer Fehler", this.view.getDisplay());      
      
      this.model.setState("number");      
      this.assertEquals("123", this.view.getDisplay());      
    },
    
    
    testButtonPress : function()
    {
      this.view.pressButtons("1");
      this.assertEquals("1", this.model.tokens[0]);
    }
  }
});