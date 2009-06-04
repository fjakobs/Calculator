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

qx.Theme.define("demobrowser.Appearance",
{
  extend : qx.theme.modern.Appearance,
  title : "Demo browser",

  appearances :
  {
    "demo-tree" :
    {
      alias : "tree",
      include : "tree",

      style : function()
      {
        return {
          width : 250,
          decorator : "main"
        };
      }
    }
  }
});
