

/**********PAGE LOAD*******************/

//resets form inputs
$('form')[0].reset();

// Hides other job text input on page load
$('#toggle_other_job').hide();

//set credit card as default payment method
$('#payment option:eq(1)').prop('selected', true);


//selects field by id and focuses the name textfield on page load
$("#name").focus();

/************JOB ROLE*************************/

// adds function to show text field if 'other' job role is chosen. 
$("#title").click(function(){
  if  ($('#title').val() === 'other'){
    $('#toggle_other_job').show(500);
  } else {
  	$('#toggle_other_job').hide();
  }
});

/**************T-SHIRT INFO***************************/
const $colorHeading = $('#color').prev(); //gets color heading
const $chooseColor = $('<option class="hideOption" value="choose">Please select a T-shirt theme</option>') //adds an option to the dropdown menu
const $designSelector = $('#design option').first().attr('value', 'theme');

$('#color').hide();//hides colors initially 
$('#color').prepend($chooseColor);
$colorHeading.hide();//hides color heading
console.log($chooseColor);
console.log($designSelector);

$("#design").change(function(){
	  $designSelector.hide();

	  // $chooseColor.hide();
	
	  if  ($('#design').val() === 'js puns'){ 
	  	

	  	$('#color').show(300);
	  	$colorHeading.show(400);
	  	$('#color option:eq(1)').prop('selected', true);//shows 'Please select a T-shirt theme in drop down
	  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').hide();
	  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').show();
	  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').attr('selected', false);

	  	if  ($('#color option:eq(0).selected'))  {
	  		$chooseColor.hide();
	  		// $('#color option:eq(1)').prop('selected', true);

	  		
	  	} else {
	  		$chooseColor.remove();

	  	}
	  	
	  	
	  } else {
	  	$('#color').hide();
	  	$colorHeading.hide();
	  }

	  if ($('#design').val() === 'heart js'){
	  		
	  	$('#color').show(300);
	  	$colorHeading.show(400);	
	  	$('#color option:eq(4)').prop('selected', true);
	  	$('#color option[value="dimgrey"],[value="steelblue"],[value="tomato"]').show();
	  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').hide();
	  	$('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').attr('selected', false);

	  	if  ($('#color option:eq(0).selected'))  {
	  		$chooseColor.hide();
	  		// $('#color option:eq(4)').prop('selected', true);
	  		
	  	} else {
	  		$chooseColor.remove();

	  	}


	  	
	  	
	  } 
});



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


//validated that there is a name entered and that the name is formatted with at least one space.
//Extra credit: Gives different error messages depending on blank field or wrongly formatted name. 
function validName() {
	const $name = $('#name');
	const $nameRegEx =   /[A-Z]*[a-z]* [A-Z]*[a-z]*/;
	const $nameResult = $nameRegEx.test($name.val());
	if ($name.val().length > 0 && $nameResult == true) {
		$name.css('borderColor', '#c1deeb');

		return true;
	} else if ($name.val().length > 0 && $nameResult == false){
		$name.css('borderColor', 'red');
		$('#name').prev().append('<span class="incorrectName">  You need to enter a valid name.</span>');
		return false;
	} else {
		$name.css('borderColor', 'red');
		$('#name').prev().append('<span class="incorrectName">  Please fill out name field.</span>');
		return false;

	}
}
//Extra credit real time validation
$("#name").on('keyup', function(){
	$('.incorrectName').remove();

	validName();
});

function validEmail() {
  const $email = $('#mail');
  const $emailRegX = /^[\w.]*@[\w]*.[\w]*$/;
  const $emailResult = $emailRegX.test($email.val());
	
  if ($emailResult === false) {
  	$('#mail').css('borderColor', 'red');
  	$('#mail').prev().append('<span class="incorrect">  You need to enter a valid email adress.</span>');
  	return false;

  }else {
	$('#mail').css('borderColor', '#c1deeb');
	$('.incorrect').hide();
	return true;
  }
  console.log($emailResult);
};

$('#email').on('input',(e) => {
	

	validEmail();
});

  
  



function validActivities(){
	if ($('.activities input:checkbox:checked').length<1){
		$('.activities').css({'border-color': 'red', 'border-width': '2px', 'border-style': 'solid'});
  		$('.activities').prepend('<span class="incorrect">  You need to choose at least one activity.</span>');
		return false;
	} else {
		$('.activities').css('color', '#184f68');
		$('.activities').css({'border-color': 'red', 'border-width': '0px', 'border-style': 'solid'});

		
		return true;
	}
	
}


function validCardNumber() {
	const cardNumber = $('#cc-num').val();
	const cardRegX = /\d{13,16}/;
	const cardResult = cardRegX.test(cardNumber);
	if (cardResult === false) {
		$('#cc-num').css('borderColor', 'red');
		$('#cc-num').prev().append('<span class="incorrect">  Enter valid card number.</span>');
		return false;
		
	} else {
		$('#cc-num').css('borderColor', '#c1deeb');
		$('.incorrect').hide();
		return true;
		
	}
	console.log(validCardNumber)
}
function validZipCode() {
	const zipCode = $('#zip').val();
	const zipRegX = /\d{5}/;
	const zipResult = zipRegX.test(zipCode);
	if (zipResult === false) {
		$('#zip').css('borderColor', 'red');
		$('#zip').prev().append('<span class="incorrect">  Incorrect.</span>');
		return false;
		
	} else {
		$('#zip').css('borderColor', '#c1deeb');
		$('.incorrect').hide();
		return true;
	}
}
function validCVV() {
	const cvv = $('#cvv').val();
	const cvvRegX = /\d{3}/;
	const cvvResult = cvvRegX.test(cvv);
	if (cvvResult === false) {
		$('#cvv').css('borderColor', 'red');
		$('#cvv').prev().append('<span class="incorrect">  Incorrect.</span>');
		
		return false;

	} else {
		$('#cvv').css('borderColor', '#c1deeb');
		$('.incorrect').hide();
		return true;
	}
}
	
	


function validateForm() {
	let validForm = true;
	
	if (validName() == false){
		validForm = false;
	}
	console.log(validForm);
	if (validEmail() == false){
		validForm = false;
	}
	console.log(validForm);
	if (validActivities() == false){
		validForm = false;
	}
	console.log(validForm);
	if ($('#payment').val() ==='credit card') {
		if (validCardNumber() == false) {   
			validForm = false;
		}
		if (validZipCode() == false){
			validForm = false;
		}
		if (validCVV() == false){
			validForm = false;
		} 
	console.log(validForm + ' validForm');
	}
	
	// if ($valueOfJob === 'other' && $job.length == 0) {	
	// 	$('#other_title').css('border', '2px');
 //  	    $('#other_title').prev().append('<span class="incorrect">  You need to enter a job title.</span>');
	// 	validForm = false;
	// 	} 
	return validForm;
	

}

$('form').submit((event)=>{
	$('.incorrect').remove();
	$('.incorrectName').remove()
	

	if (validateForm() == false){
	event.preventDefault();
	} else {
		$('.incorrect').remove();
		alert('Your form is submittet. We look forward to seeing you!');
	}
	
	

});


/**********************************************************************************/
