$(document).ready(function(){
    var carousel = $('#work-carousel'),
    threshold = 150,
    slideWidth = 700,
    dragStart, 
    dragEnd;

$('#next').click(function(){ shiftSlide(-1) })
$('#prev').click(function(){ shiftSlide(1) })

carousel.on('mousedown', function(){
  if (carousel.hasClass('transition')) return;
  dragStart = event.pageX;
  $(this).on('mousemove', function(){
    dragEnd = event.pageX;
    $(this).css('transform','translateX('+ dragPos() +'px)')
  })
  $(document).on('mouseup', function(){
    if (dragPos() > threshold) { return shiftSlide(1) }
    if (dragPos() < -threshold) { return shiftSlide(-1) }
    shiftSlide(0);
  })
});

function dragPos() {
  return dragEnd - dragStart;
}

function shiftSlide(direction) {
  if (carousel.hasClass('transition')) return;
  dragEnd = dragStart;
  $(document).off('mouseup')
  carousel.off('mousemove')
          .addClass('transition')
          .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
  setTimeout(function(){
    if (direction === 1) {
      $('.work-slide:first').before($('.work-slide:last'));
    } else if (direction === -1) {
      $('.work-slide:last').after($('.work-slide:first'));
    }
    carousel.removeClass('transition')
		carousel.css('transform','translateX(0px)'); 
  },700)
}

$('#next').click(function(){
  $('#desktop-img_1').animate({top: '120px'});
});

$('#prev').click(function(){
  $('#desktop-img_1').animate({top: '-60px'});
});

});