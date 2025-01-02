let form;
let fnameField;
let snameField;
let letters;
let mailField;
let checkboxes;
let emailPattern;
let errorElement;
let radio;

function init() {
	form = document.getElementById("form");

	fnameField = form.fname;
	snameField = form.sname;
	mailField = form.mail;
	errorElement = document.getElementById("requiredField");
	

	letters = /[^A-Z]/i;
	emailPattern = /^([A-Z0-9_\-\.])+\@([A-Z0-9_\-\.])+\.([A-Z]{2,4})$/i;

	form.addEventListener("submit", submitForm);
	fnameField.addEventListener("blur", FnameHandler);
	snameField.addEventListener("blur", SnameHandler);
	mailField.addEventListener("blur", MailHandler);

	checkboxes = form.querySelectorAll('input[name="choice2"]');
	checkboxes.forEach(function(checkbox) {
		checkbox.addEventListener("change", validateCheckboxes);
	});

	radio = form.querySelectorAll('input[name="choice4"]');
	radio.forEach(function(radio) {
		radio.addEventListener("change", validateRadio);
	});


}

function FnameHandler() {
	if (letters.test(fnameField.value)) {
		errorElement.innerHTML = "Your firstname is required with only letters.";
	} else {
		errorElement.innerHTML = "";
	}
}

function SnameHandler() {
	if (letters.test(snameField.value)) {	
		errorElement.innerHTML = "Your surname is reqired with only letters.";
	} else {
		errorElement.innerHTML = "";
	}
}

function MailHandler() {
	if (!emailPattern.test(mailField.value)) {
		errorElement.innerHTML = "Please enter a valid email address.";
	} else {
		errorElement.innerHTML= "";
	}
  }

function submitForm(event) {
    event.preventDefault();

	if (!fnameField.value || letters.test(fnameField.value)) {
        errorElement.innerHTML = "Your firstname is required with only letters.";
        return;
    }

    if (!snameField.value || letters.test(snameField.value)) {
        errorElement.innerHTML = "Your surname is required with only letters.";
        return;
    }

    if (!mailField.value || !emailPattern.test(mailField.value)) {
        errorElement.innerHTML = "Your mail is invalid.";
        return;
    }


	let AnyChecked = false;

    for (let i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			AnyChecked = true;
		}
	}

	if (!AnyChecked) {
		errorElement.innerHTML = "Please fill in a alternative to question 2.";
		return;
  	}
	errorElement.innerHTML = "";

 	let AnyClicked = false;

 	for (let i=0; i<radio.length; i++){
		if (radio[i].checked) {
			AnyClicked = true;
		}	
	}

	if (!AnyClicked) {
		errorElement.innerHTML = "Please fill in an answer to question 4";
		return;
   
	}
	errorElement.innerHTML = "The form was submitted successfully!";
}

function validateRadio() {
	let AnyClicked = false;
	console.log("radio clicked");

	for (let i=0; i<radio.length; i++){
		if (radio[i].checked) {
			AnyClicked = true;
		}
	}
	if (!AnyClicked) {
		errorElement.innerHTML = "Please fill in an answer to question 4";
	} else {
		errorElement.innerHTML = "";
	}
}

function validateCheckboxes() {
	let AnyChecked = false;
	console.log("checkboxes changed");

    for (let i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			AnyChecked = true;
		}
	}

	if (!AnyChecked) {
		errorElement.innerHTML = "Please fill in a choise to question 2.";
  	} else {
		errorElement.innerHTML= "";
  	}
    
}

  

window.addEventListener("load", init);
console.log("form submitted via JavaScript");
