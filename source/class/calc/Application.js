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

/* ************************************************************************
#asset(calc/*)
************************************************************************ */

/**
 * This is the main application class
 */
qx.Class.define("calc.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
  
      // Call super class
      this.base(arguments);

      var c1 = new calc.Calculator();
      c1.moveTo(50, 70);
      c1.open();
      
      var c2 = new calc.Calculator();
      c2.setAppearance("black-calculator");
      c2.moveTo(300, 70);
      c2.open();      
    }
  }
});