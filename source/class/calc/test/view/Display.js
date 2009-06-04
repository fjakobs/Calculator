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

qx.Class.define("calc.test.view.Display",
{
  extend : calc.test.view.DemoTestCase,

  members :
  {
    _createDemoContainer : function()
    {
      var container = this.base(arguments);
      container.setWidth(200);
      return container;
    },

    
    _add : function(widget) {
      this.getRoot().add(widget);
    },
    
    
    setUp : function()
    {
      this.base(arguments);
      
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
      this.display.setDisplay("Juhu Kinners");
      this.assertEquals("Juhu Kinners", this.display.getChildControl("label").getValue());

      this.display.setDisplay(12);
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