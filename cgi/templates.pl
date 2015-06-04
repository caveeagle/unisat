#!/usr/bin/perl -w

use strict;
use SDB::common;
use SDB::cgi;
use SDB::hash2template;

###############################################
###############################################

my $TEMPLATES_DIR = "../div_templates"; 

###############################################
###############################################


my $query_string =  get_query_string();

my %cgi = parse_query_string( $query_string);

my $template_name = $cgi{'template'} ? $cgi{'template'} : "empty";

my $id = $cgi{'id'};

unless($id)
{
    my $ch = 65535;
    $id = int(rand($ch))+1;
}    

###############################################
###############################################

$template_name =~ /^(\w+)_/;   
   
my $object_id = $1;

unless($object_id)
{
 $object_id = substr($template_name,0,6);
}    

my $type = $object_id;

$object_id = ucfirst($object_id);

$object_id = $object_id."Tab";


###############################################
###############################################

my $template_file = "$TEMPLATES_DIR/$template_name.html";

my %template;
tie %template, 'SDB::hash2template', $template_file;

###############################################
###############################################

my %subtemplates;

my $main_section = $template{'main'};


while($main_section =~m /%(\w+)%/g)
{
    my $st = $1;
    
    unless($st=~/div_(\w+)/){next;}
    
    my $subtemplate_name = $1;
    
    ###############################################
    ###############################################
    
    my $subtemplate_file = "$TEMPLATES_DIR/$subtemplate_name.html";
    
    my %subtemplate;
    tie %subtemplate, 'SDB::hash2template', $subtemplate_file;
    
    my $subtemplate_section = $subtemplate{'main'};

    ####################################
    ####################################
    
    ### find all keys in subtemplate ###

    my $subresult = $subtemplate_section;
    
    while($subtemplate_section =~m /%(\w+)%/g)
    {
        my $st = $1;
        
        if($st eq "ID")
        {
            $subresult = substitute($subresult,{
                ID => $id,
            });     
        }    
    
        if($st eq "TAB_OBJ")
        {
            $subresult = substitute($subresult,{
                TAB_OBJ => $object_id,
            });     
        }    

        if($st eq "SAT_DATA")
        {
            my $tmp_template_name;
            if($type eq "hrsat")
            {
               $tmp_template_name = "_tmp_sat_data_hrsat.html"; 
            }    
            if($type eq "mrsat")
            {
               $tmp_template_name = "_tmp_sat_data_midsat.html"; 
            }    
            my %tmp_template;
            tie %tmp_template, 'SDB::hash2template', "$TEMPLATES_DIR/$tmp_template_name";
            my $tmp_template_section = $tmp_template{main};
            
            $subresult = substitute($subresult,{
                SAT_DATA => $tmp_template_section,
            });     
        }    
    
    }
    
    ####################################
    ####################################
    
    $subtemplates{$st} = $subresult;
    
    ###############################################
    ###############################################

}    


###############################################
###############################################


my $ret = substitute( $template{main}, {
	ID => $id,
	TAB_OBJ => $object_id,
	%subtemplates,
});	


###############################################
###############################################


print_content_type;
print $ret;
exit(0);


