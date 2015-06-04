
/// globalAlert(dumpObj(list,'','',0));

function tabInitMultisatGeneral(TAB_OBJ)
{
    /*****************************************/

    var cover_div_id = "COVERDIV_"+TAB_OBJ.TAB_UID;
   
    dojo.query("#"+cover_div_id+" *").forEach(function(node)
    {
        // Unic IDs for each of tabs
        if(node.id)
        {
            node.id = node.id+"_"+TAB_OBJ.TAB_UID;
        }    
    });
    
    /*****************************************/
    
    date_init(TAB_OBJ);
    

    /*****************************************/
    
}    


/*******************************************************/
/*******************************************************/



