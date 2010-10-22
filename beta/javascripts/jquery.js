var helpVisible = false;
function toggleHelp() {
  if(!helpVisible) {
    $('#help').fadeIn('slow');
    showHelpTip($('#toolbox'), "Drag the blocks from here.", "right");
    showHelpTip($('.zoom'), "Use these to zoom in and out.", "right");
    showHelpTip($('.erase'), "Click here to erase everything.", "right");
    showHelpTip($('.link'), "Click here to create a link to this Minedraft.", "below");
    
    helpVisible = true;
  } else {
    $('.helpTip').fadeOut("slow", function() { $(this).remove() });
    $('#help').fadeOut();
    helpVisible = false;
  }
}

function showHelpTip(obj, str, orient){
  var imgCName, imgPath, top, left;
  if(orient == "right") {
    imgCName = "vtipArrowLeft";
    imgPath = "images/vtip_arrow_left.png";
  } else if(orient == "below") {
    imgCName = "vtipArrow";
    imgPath = "images/vtip_arrow.png"; 
  }
  var tipId=jQuery.Guid.New();
  $("body").append('<p class="vtip helpTip" id="'+tipId+'"><img class="'+imgCName+'" />'+str+"</p>");
  $("p#"+tipId+" ."+imgCName).attr("src",imgPath);
  if(orient == "right") {
    top=(obj.offset().top + (obj.height() / 2) - $("p#"+tipId).height());
    left=(obj.offset().left + obj.width() + 10 );
  } else if(orient == "below") {
    top = (obj.offset().top + obj.height() + 10 );
    left = (obj.offset().left + (obj.width() / 2) );
  }
  $("p#"+tipId).css("top",top+"px").css("left",left+"px").fadeIn("slow");
}