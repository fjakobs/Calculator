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

qx.Class.define("calc.test.ModelMock",
{
  extend : qx.core.Object,
  
  properties :
  {
    state :
    {
      check : ["number", "waitForNumber", "error"],
      event : "changeState",
      init : "number"
    },
    
    errorMessage : 
    {
      check : "String",
      init : "",
      event : "changeErrorMessage"
    },
    
    input : 
    {
      check : "String",
      nullable : true,
      event : "changeInput"
    },
    
    operator :
    {
      check : ["+", "-", "*", "/"],
      nullable : true,
      event : "changeOperator"
    },
    
    value : 
    {
      check : "Number",
      nullable : true,
      event : "changeValue"
    },
    
    memory : 
    {
      check : "Number",
      nullable : true,
      event : "changeMemory"
    }
  },
  
  members : 
  {
    readToken : function(token)
    {
      if (this.tokens) {
        this.tokens.push(token);
      } else {
        this.tokens = [token];
      }
    }
  }
});