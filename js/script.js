

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


/***************************ACTIVITIES********************************************/

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
	//gets the day and time of activities
	let startIndexTime = textContentOfClicked.indexOf('—');
	let endIndexTime = textContentOfClicked.indexOf(',');
	let timeOfActivity = textContentOfClicked.slice(startIndexTime, endIndexTime);
	


	let activityInput = $('.activities input');

	for (i=0; i < activityInput.length; i++) {
		let inputText = $(activityInput[i]).parent().text();
		
		if (inputText.includes(timeOfActivity) && clicked !== activityInput[i]){
			if($(activityInput[i]).prop("checked") === false) {
				activityInput[i].disabled = !activityInput[i].disabled; 
				} 
		}
	}
});

/**************************PAYMENT************************************/

$('#payment').children('option').eq(0).hide();



const $creditCard = $('#payment option[value = "credit card"]');
const $creditCardInfo = $('#credit-card'); // I can delete this and use the id 
const $payPal = $('#payment option[value = "paypal"]');
const $bitcoin = $('#payment option[value = "bitcoin"]');
// const traverseToPaymentFieldset = $('form:nth-child(4)').attr('id', 'paymentFieldSet');
const $payPalInfo = $('#credit-card').next();
const $bitcoinInfo = $payPalInfo.next();

//hides paypal and bit coin info to make credit card default.
$payPalInfo.hide();
$bitcoinInfo.hide();

$('#payment option').change((event)=>{
	let chosenPayment = event.target;
	if (chosenPayment === $creditCard) {
		$creditCardInfo.show();
		$payPalInfo.hide();
		$bitcoinInfo.hide();
		console.log(chosenPayment);
	}

	if (chosenPayment === $payPal) {
		$('#credit-card').hide();
		$payPalInfo.show();
		$bitcoinInfo.hide();
	}
	if (chosenPayment === $bitcoin) {
		$('#credit-card').hide();
		$payPalInfo.hide();
		$bitcoinInfo.show();
	}
});

// $('#credit-card').hide();
// $('#credit-card').hide();
// $('#design option').filter(function() {
//     return  /\(JS Puns shirt only\)/.test(this.value);
// }).remove();

 // /\(JS Puns shirt only\)/ //regEx for pun shirts
 // /\(I &#9829; JS shirt only\)/ //regEx for love shirts