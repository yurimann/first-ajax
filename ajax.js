$(document).ready(function () {

  $('#one').on('click', function(){
    $.ajax({
      url: 'http://first-ajax-api.herokuapp.com/',
      method: 'GET',
      // data: ,
      dataType: 'text',
  }).done(function(responseData){
    console.log('Success!');
  });
});

$('#two').on('click', function(){
  $.ajax({
    url: 'http://first-ajax-api.herokuapp.com/pong',
    method: 'GET',
    // data: ,
    dataType: 'text',
  }).done(function(responseData){
    console.log(responseData);
    var reply = document.createElement('p');
    reply.append(responseData);
    $('#step3456').append(reply);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR);
    // console.log(textStatus);
    // console.log(errorThrown);
    var fail = document.createElement('p');
    fail.append(jqXHR.responseText);
    $('#step3456').append(fail);
  })
  // .always(function(){
  //   console.log("Request completed my friend!");
  // });
  });

  $('#three').on('click', function(){
    $.ajax({
      url: 'http://first-ajax-api.herokuapp.com/count',
      method: 'GET',
      // data: ,
      dataType: 'text',
    }).done(function(responseData){
      console.log(responseData);
      var num = document.createElement('p');
      num.append(responseData);
      $('#step7').append(num);
    });
  });

  $('#four').on('click', function(){
    $.ajax({
      url: 'http://first-ajax-api.herokuapp.com/time',
      method: 'GET',
      data:{timezone: $('#time').val() } ,
      dataType: 'text',
    }).done(function(responseData){
      console.log(responseData);
      var num = document.createElement('p');
      num.append(responseData);
      $('#step8').append(num);
    });
  });

  
  $('#five').on('click', function(){
    $.ajax({
      url: 'http://first-ajax-api.herokuapp.com/a_car',
      method: 'GET',
      dataType: 'html',
    }).done(function(responseData){
      console.log(responseData);
      var list = document.createElement('ul');
      list.setAttribute('id', 'car')
      list.append(responseData);
      $('#step9').append(list);
    });
  });

});
