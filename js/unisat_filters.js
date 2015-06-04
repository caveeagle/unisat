
function getSatdevicesState()
{
      var Sats = new Array();
      var Devs = new Array();
      
      var collect  = document.forms["satform"].elements;
      var elements = Array.prototype.slice.call(collect);
      elements.forEach( function (element) 
      {
          if (element.type == "checkbox") 
          {
              var checkboxWidget = dijit.getEnclosingWidget( element );
              var chbox = checkboxWidget.item;
              if(chbox.checked)
              {
                    console.info("INFO: id="+chbox.id+" type="+chbox.stype+" sats="+chbox.sats );
                    
              }
          }
      });
}

