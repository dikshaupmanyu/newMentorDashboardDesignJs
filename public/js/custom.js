// Header sticky js Start
$(window).scroll(function() {
    if ($(this).scrollTop() > 10){  
        $('.app_header').addClass("header_sticky");
    }
    else{
        $('.app_header').removeClass("header_sticky");
    }
});
// Header sticky js End 


// Dropdown Submenu js Start
$(document).ready(function(){
  $('.dropdown-submenu .dropdown-toggle').on("click", function(e){
    $(this).next('.dropdown-menu').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
// Dropdown Submenu js End


// Sidebar Toggle js Start
$("#sidebar_toggle").click(function(){
  $(".body_wrapper").toggleClass("sidebar_close");
});
// Sidebar Toggle js End


// User img progress bar js Start
$(function() {
  $(".progress").each(function() {
    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');
    if (value > 0) {
      if (value <= 50) {
        right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
      } else {
        right.css('transform', 'rotate(180deg)')
        left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
      }
    }

  })
  function percentageToDegrees(percentage) {
    return percentage / 100 * 360
  }
});
// User img progress bar js End


// Dropdown Select Js Start
$(".select_dropdown_menu li a").click(function(e){
    e.preventDefault()
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});
// Dropdown Select Js End


// Welcome Modal Js Start
$(window).on('load', function() {
    $('#welcomeModal').modal('show');
});
// Welcome Modal Js End


// Modal Backdrop Js Start
$('.modal').appendTo("body") 
// Modal Backdrop Js End