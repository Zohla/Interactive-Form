

/**********PAGE LOAD*******************/
//resets form inputs
$('form')[0].reset();

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


$('#color').hide();//hides colors initially maby change so hides 'color' as well..
$("#design").click(function(){
  if  ($('#design').val() === 'js puns'){
  	// $('#color').show();//shows colors - can this be removed?
  	$('#color option[value="tomato"]').attr('selected', false);
  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').hide();
  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').show();
  	$('#color option[value="cornflowerblue"]').attr('selected', true);
  } else {
  	$('#color option[value="cornflowerblue"]').attr('selected', false);
  	$('#color').show();//shows colors when design is clicked
  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').show();
  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').hide();
  	$('#color option[value="dimgrey"]').attr('selected', true);
  }
});

//makes and appends a new div to show total cost
$('.activities').append('<div id="totalCost"></div>');

let activityCost = 0;

//event handler to keep track of cost ...so that no activities that collide can be chosen
$('.activities').change((event)=>{
	let clicked = event.target;
	let textContentOfClicked = $(clicked).parent().text();
	let indexOfCost = textContentOfClicked.indexOf('$');
	let costOfActivity = textContentOfClicked.slice(indexOfCost);
	//get price without '$'
	let costOnlyNum = costOfActivity.slice(1);
	let costInt = parseInt(costOnlyNum);

	if (clicked.checked) {
		activityCost += costInt; 

	} else {
		activityCost -= costInt;

	}

	$('#totalCost').text('Total: $' + activityCost);

})



// $('#design option').filter(function() {
//     return  /\(JS Puns shirt only\)/.test(this.value);
// }).remove();

 // /\(JS Puns shirt only\)/ //regEx for pun shirts
 // /\(I &#9829; JS shirt only\)/ //regEx for love shirts