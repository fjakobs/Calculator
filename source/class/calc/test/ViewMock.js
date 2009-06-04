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

qx.Class.define("calc.test.ViewMock",
{
  extend : qx.core.Object,
  implement : [calc.view.ICalculator],
  
  events : {
    "buttonPress" : "qx.event.type.Data"
  },
  
  properties : 
  {
    display :
    {
      init : "0",
      event : "changeDisplay"
    },
    
    memory :
    {
      check : "Boolean",
      init : false,
      event : "changeMemory"
    },
    
    operation :
    {
      check : "String",
      init : "",
      event : "changeOperation"
    }    
  },
  
  members : 
  {
    pressButtons : function(varargs)
    {
      for (var i=0; i<arguments.length; i++) {
        this.fireDataEvent("buttonPress", arguments[i]);
      }
    }
  }
});