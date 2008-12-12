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

qx.Theme.define("calc.theme.Appearance",
{
  extend : qx.theme.modern.Appearance,

  appearances :
  {    
    "calculator" : 
    {
      style : function(states)
      {
        return {
          backgroundColor : "#969696",
          decorator : "calc-window",
          shadow : "shadow-window",
          contentPadding : [6, 8, 8 ,8]
        }
      }
    },
    
    "calculator/title" :
    {
      style : function(states)
      {
        return {
          alignY : "middle",
          textAlign : "center",
          font : "bold",
          textColor : "#DDD"
        };
      }
    },    
    
    "calculator/icon" :
    {
      style : function(states)
      {
        return {
          margin : [3, 8, 0, 8]
        };
      }
    },     
  
    "calculator/display" :
     {
      style : function(states)
      {
        return {
          decorator : "calc-display",
          marginBottom : 8,
          height: 51,
          padding : [0, 20]
        }
      }
    },    
    
    "calculator/label" :
     {
      style : function(states)
      {
        return {
          font : "bold",
          marginLeft: 5
        }
      }
    },       

    "calculator/memory" :
     {
      style : function(states)
      {
        return {
          marginLeft: 5
        }
      }
    },       
        
    "calculator/operation" :
     {
      style : function(states)
      {
        return {
          marginLeft: 50
        }
      }
    },       
    
    "calc-button" :
    {
      style : function(states)
     {
       return {
         textColor : states.pressed ? "#aaa" : "white",
         decorator : states.pressed ? "calc-button-pressed" : "calc-button",
         center: true,
         padding : states.pressed ? [1, 8, 3, 8] : [2, 8]
       }
     }
   }    
  }
});