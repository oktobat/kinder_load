$('.login_form').on('submit', function(e){
  e.preventDefalut()
  var details = $('.login_form').serialize();
  $.post('register.php', details, function(){
    $('.topmenu .login').removeClass('on')
    $('.topmenu .logout').addClass('on')
  })

})