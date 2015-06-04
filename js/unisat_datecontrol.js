
function singlemode_date_change(id,tab_uid,TAB_OBJ_ID)
{
    var TAB_OBJ = window[TAB_OBJ_ID];
    
    var sdate = dojo.byId("singlemode_date_field_"+ tab_uid).innerHTML;  
}    

function singlemode_date_change_oneday(day_diff,tab_uid,TAB_OBJ_ID)
{
   var sdate = dojo.byId("singlemode_date_field_"+tab_uid).innerHTML;
   
   sdate = change_date_days(sdate,day_diff);
   
   dojo.byId("singlemode_date_field_"+tab_uid).innerHTML = sdate; 
}    

function rangemode_date_change(dtype,tab_uid,TAB_OBJ_ID)
{
    var TAB_OBJ = window[TAB_OBJ_ID];

    if(dtype == "start")
    {
        TAB_OBJ.dt_begin = dojo.byId("start_rangemode_date_field_"+tab_uid).innerHTML;  
    }
  
    if(dtype == "stop")
    {
        TAB_OBJ.dt_end = dojo.byId("stop_rangemode_date_field_"+tab_uid).innerHTML;  

        if(dojo.byId("only_one_day_checkbox_"+tab_uid).checked)
        {
            TAB_OBJ.dt_begin = TAB_OBJ.dt_end;
        }

    }
      
}    

function date_init(obj)
{
    tab_uid = obj.TAB_UID;
    
    if(!obj.dt_begin)  { obj.dt_begin = today();  }

    if(!obj.dt_end)  { obj.dt_end = today();  }
    
    /**************************************************/
    
    if(dojo.byId("singlemode_date_field_"+tab_uid))
    {
        dojo.byId("singlemode_date_field_"+tab_uid).innerHTML = obj.dt_end;
    }               
    
    if(dojo.byId("start_rangemode_date_field_"+tab_uid))
    {
        dojo.byId("start_rangemode_date_field_"+tab_uid).innerHTML = obj.dt_begin;
    }               
    
    if(dojo.byId("stop_rangemode_date_field_"+tab_uid))
    {
        dojo.byId("stop_rangemode_date_field_"+tab_uid).innerHTML = obj.dt_end;
    }               
    
}    

function rangemode_date_disable(tab_uid,obj)
{
  var ch = dojo.byId("only_one_day_checkbox_"+tab_uid);
  if(ch.checked)
  {
    dojo.byId("start_rangemode_date_field_"+tab_uid).style.color = "silver";

    obj.dt_begin = obj.dt_end;
  }
  else
  {
    dojo.byId("start_rangemode_date_field_"+tab_uid).style.color = "black";

    obj.dt_begin = dojo.byId("start_rangemode_date_field_"+tab_uid).innerHTML;
  }    
}    


