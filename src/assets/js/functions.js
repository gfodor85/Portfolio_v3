$( document ).ready(function() {

  $('.left-panel').animate({left: '0px'}, 1500);
  $('.panel panel-1').addClass('active');

  $('.nav-item').on('click', function(){

    var toShow_icon = $(this).attr('panel-icon');
    
    $('.panel-icon.active').fadeOut(500, function(){
      $(this).removeClass('active');
      $('#' + toShow_icon).fadeIn(500, function(){
        $(this).addClass('active');
      });
    });

    var toShow_content = $(this).attr('panel-content');
    
    $('.panel-content.active').fadeOut(500, function(){
      $(this).removeClass('active');
      $('#' + toShow_content).fadeIn(500, function(){
        $(this).addClass('active');
      });
    });

    var toShow_title = $(this).attr('title-container');
    
    $('.title-container.active').fadeOut(1000, function(){
      $(this).removeClass('active');
      $('#' + toShow_title).fadeIn(1000, function(){
        $(this).addClass('active');
        $(this).delay(800).addClass('active');
      });
    });
  });
  

// Sequence JS

  var sequenceElement = document.getElementById("sequence");

  var options = {
    keyNavigation: true,
    animateCanvas: false
  }
  
  var mySequence = sequence(sequenceElement, options);
 

// Background move on mouse over
  var pixelToMove = 50;
  $("#bg-move").mousemove(function(e) {
  var width = $(this).innerWidth();
  var height = $(this).innerHeight();
  var newValueX = (e.pageX / width) * pixelToMove;
  var newValueY = (e.pageY / height) * pixelToMove;
  $(this).css('background-position', newValueX + '%' + ' ' + newValueY + '%');
  });

});
