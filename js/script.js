

/**********PAGE LOAD*******************/
 

// Hides other job text input on page load
$('#toggle_other_job').hide();


//selects field by id and focuses the name textfield on page load
$("#name").focus();

/************JOB ROLE*************************/
// adds function to show text field if 'other' job role is chosen. 
$("#title").click(function(){
  if  ($('#title').val() === 'other'){
    $('#toggle_other_job').show();
  } else {
  	$('#toggle_other_job').hide();
  }
});

/**************T-SHIRT INFO***************************/
// const $punShirt = /.*\(JS Puns shirt only\)/;
// const $heartShirt = /.*\(I &#9829; JS shirt only\)/;



$("#design").click(function(){
  if  ($('#design').val() === 'js puns'){
  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').hide();
  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').show();
  	$('#color option[value="cornflowerblue"]').attr('selected', true);
  } else {
  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').show();
  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').hide();
  	$('#color option[value="dimgrey"]').attr('selected', true);
  }
});

// $('#design option').filter(function() {
//     return  /\(JS Puns shirt only\)/.test(this.value);
// }).remove();

 // /\(JS Puns shirt only\)/ //regEx for pun shirts
 // /\(I &#9829; JS shirt only\)/ //regEx for love shirts