function toggleHelp(bool) {
  if(bool) {
    $('#help').show();
    showHelpTip($('#toolbox'), "Drag the blocks from here.");
    showHelpTip($('.zoom'), "Use these to zoom in and out.");
    showHelpTip($('.erase'), "Click here to erase everything.");
  } else {
    $('.helpTip').fadeOut("slow", function() { $(this).remove() });
    $('#help').hide();
  }
}

function showHelpTip(obj, str){
  var tipId=jQuery.Guid.New();
  $("body").append('<p class="vtip helpTip" id="'+tipId+'"><img class="vtipArrowLeft" />'+str+"</p>");
  $("p#"+tipId+" .vtipArrowLeft").attr("src","images/vtip_arrow_left.png");
  var top=(obj.offset().top + (obj.height() / 2) - $("p#"+tipId).height());
  var left=(obj.offset().left + obj.width() + 10 );
  $("p#"+tipId).css("top",top+"px").css("left",left+"px").fadeIn("slow");
}