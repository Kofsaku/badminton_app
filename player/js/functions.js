 $(document).ready(function(){


 	var val1 = 0;

 	$('#navbar-trigger').click(function(){

 		if(val1==0){ 
 		$('.navbar-custom').slideToggle();

 		val1 = 1;
 	
 	}
 	else {
 		$('.navbar-custom').slideToggle(); 
 		val1 = 0;

 	}
 	})
 })



 $('.scroll-link').on('click', function(event) {
  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
  }
});



 $(window).scroll(function() {
var $height1 = $(window).scrollTop();
if($height1 > 10) {
 $('body').addClass("header-fixed");

} else {
 $('body').removeClass("header-fixed");
}
});


 $('.role-selector').click(function(){
  $('.role-selector').removeClass('role-selected')
  $(this).addClass("role-selected")
 })


  $('.role-selector').click(function(){
  $('.role-selector').removeClass('role-selected')
  $(this).addClass("role-selected")
 })

   $('.toggle-btn1').click(function(){
  $('.toggle-btn1').removeClass('active-toggle')
  $(this).addClass("active-toggle")
 })

 $('.checkbox-selector-1').click(function(){
  $(this).parents(".checkbox-selector-all").children(".checkbox-selector-wrapper").removeClass('checkbox-selector-active');
  $(this).parent(".checkbox-selector-wrapper").addClass("checkbox-selector-active")
 })

  $('#search-toggle').click(function(){
   $('.advanced-search').slideToggle()
 })

  $('#admin-menu-icon').click(function(){

    $('.left-sidebar-wrapper').addClass("openSlide")

  })

   $('#admin-close-icon').click(function(){

    $('.left-sidebar-wrapper').removeClass("openSlide")

  })