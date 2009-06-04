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

qx.Class.define("demobrowser.demo.DemoTestRunner",
{
  extend : qx.application.Standalone,

  members :
  {
    initializeTestClass : function(testClass)
    {
      window.RUN_AS_DEMO = true;
      var result = new qx.dev.unit.TestResult();
      
      result.addListener("error", this._onError, this);
      result.addListener("failure", this._onFailure, this);
      
      var suite = new qx.dev.unit.TestClass(testClass);
      
      suite.run(result);
    },
    
    _onError : function(e)
    {
      var ex = e.getData().exception;
      var test = e.getData().test;
      this.error("Test '" + test.getFullName() + "' had an error: " + ex);
      this.error(qx.dev.StackTrace.getStackTraceFromError(ex).join("\n"));
    },
    
    _onFailure : function(e)
    {
      var ex = e.getData().exception;
      var test = e.getData().test;
      console.log(ex);
      this.error("Test '" + test.getFullName() + "' failed: " + ex.getMessage() + " - " + ex.getComment(), ex);      
      this.error(qx.dev.StackTrace.getStackTraceFromError(ex).join("\n"));
    }
  }
});
