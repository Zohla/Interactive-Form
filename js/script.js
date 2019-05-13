

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

//need to make the initial value in the color drop down go away when design changes................................

/***************************ACTIVITIES********************************************/

//makes and appends a new div to show total cost
$('.activities').append('<div id="totalCost"></div>');

let activityCost = 0;

//event handler to keep track of cost and that no activities that collide can be chosen
$('.activities').change((event)=>{
	let clicked = event.target;
	let textContentOfClicked = $(clicked).parent().text();
	let indexOfCost = textContentOfClicked.indexOf('$');
	let costOfActivity = textContentOfClicked.slice(indexOfCost);
	let costOnlyNum = costOfActivity.slice(1); //get price without '$'
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

$('#payment').change(()=>{
	let $valueOfOption = $('#payment').val();
	if  ($valueOfOption === 'credit card') {
		$('#credit-card').show();
		$payPalInfo.hide();
		$bitcoinInfo.hide();
		
	}

	if ($valueOfOption === $payPal.val()) {
		$('#credit-card').hide();
		$payPalInfo.show();
		$bitcoinInfo.hide();
	}
	if ($valueOfOption === $bitcoin.val()) {
		$('#credit-card').hide();
		$payPalInfo.hide();
		$bitcoinInfo.show();
	}
});
/***********************VALIDATION***********************************************/



function validName() {
	const name = $('#name');
	if (name.val().length > 0) {
		name.css('borderColor', '#c1deeb');
		return true;
	} else {
		name.css('borderColor', 'red');
		$('#name').prev().append('<span id="incorrect">  You need to enter a valid name.</span>');
		return false;
	}
}

function validEmail() {
  const email = $('#mail').text();
  const emailRegX = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const emailResult = emailRegX.test(email);
  if (emailResult === false) {
  	$('#mail').css('borderColor', 'red');
  	$('#mail').prev().append('<span id="incorrect">  You need to enter a valid email adress.</span>');
  } else {
		$('#mail').css('borderColor', '#c1deeb');
		$('#incorrect').hide();
	}
}

function validActivty() {

}

function validCreditCard() {
	const cardNumber = $('#cc-num').val();
	const cardRegX = /\d{13,16}/;
	const cardResult = cardRegX.test(cardNumber);
	if (cardResult === false) {
		$('#cc-num').css('borderColor', 'red');
		$('#cc-num').prev().append('<span id="incorrect">  Enter valid card number.</span>');
	} else {
		$('#cc-num').css('borderColor', '#c1deeb');
		$('#incorrect').hide();
	}
	const zipCode = $('#zip').val();
	const zipRegX = /\d{5}/;
	const zipResult = zipRegX.test(zipCode);
	if (zipResult === false) {
		$('#zip').css('borderColor', 'red');
		$('#zip').prev().append('<span id="incorrect">Incorrect.</span>');
	} else {
		$('#zip').css('borderColor', '#c1deeb');
		$('#incorrect').remove();
	}
	const cvv = $('#cvv').val();
	const cvvRegX = /\d{3}/;
	const cvvResult = cvvRegX.test(cvv);
	if (cvvResult === false) {
		$('#cvv').css('borderColor', 'red');
		$('#cvv').prev().append('<span id="incorrect">Incorrect.</span>');
	} else {
		$('#cvv').css('borderColor', '#c1deeb');
		$('#incorrect').hide();
	}
}

$('button').click((event)=>{
	event.preventDefault();
	$('#incorrect').remove();// not working, keeps adding.................................................
	validName();
	validEmail();
	if ($valueOfOption === 'credit card'){
		validCreditCard();
	}

});









/**********************************************************************************/



 // /\(JS Puns shirt only\)/ //regEx for pun shirts
 // /\(I &#9829; JS shirt only\)/ //regEx for love shirts