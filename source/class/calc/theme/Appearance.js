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
    "black-calculator" : 
    {
      style : function(states)
      {
        return {
          backgroundColor : "black-window-bg",
          decorator : "calc-window",
          shadow : "shadow-window",
          contentPadding : [6, 8, 8 ,8]
        }
      }
    },    
    "black-calculator/pane" : "widget",
    "black-calculator/captionbar" : "widget",
    
    "black-calculator/title" :
    {
      style : function(states)
      {
        return {
          alignY : "middle",
          textAlign : "center",
          font : "bold",
          textColor : "black-window-caption"
        };
      }
    },    
    
    "black-calculator/icon" :
    {
      style : function(states)
      {
        return {
          margin : [3, 8, 0, 8]
        };
      }
    },     
  
    "black-calculator/display" :
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
    
    "black-calculator/label" :
     {
      style : function(states)
      {
        return {
          font : "bold",
          marginLeft: 5
        }
      }
    },       

    "black-calculator/memory" :
     {
      style : function(states)
      {
        return {
          marginLeft: 5
        }
      }
    },       
        
    "black-calculator/operation" :
     {
      style : function(states)
      {
        return {
          marginLeft: 50
        }
      }
    },       
    
    "black-calculator-button" :
    {
      alias: "button",
      
      style : function(states)
      {
       return {
         textColor : states.pressed ? 
           "black-button-text-pressed" :
           "black-button-text",
         decorator : states.pressed ?
           "calc-button-pressed" :
           "calc-button",
         center: true,
         padding : states.pressed ? [1, 8, 3, 8] : [2, 8]
       }
     }
   },
   

   /*
   ---------------------------------------------------------------------------
     STANDARD LOOK
   ---------------------------------------------------------------------------
   */      
   
    "calculator" : "window", 
    "calculator-button" : "button",
   
    "calculator/display" :
    {
      style : function(states)
      {
        return {
          decorator: "main",
          height : 40,
          padding: 3,
          marginBottom: 3
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

    "calculator/memory" : {
      style : function(states) {
        return {
          marginLeft: 5
        } 
      }
    },       
       
    "calculator/operation" : {
      style : function(states) {
        return {
          marginLeft: 50
        }
      }
    }
  }
});