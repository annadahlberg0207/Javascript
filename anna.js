let form;
let fnameField;
let snameField;
let letters;
let mailField;
let checkboxes;
let emailPattern;
let errorElement;
let question1radio;
let question4radio;

function init() { 
	form = document.getElementById("form");

	fnameField = form.fname; //För förnamn
	snameField = form.sname; // för efternamn
	mailField = form.mail; // för e-mail
	errorElement = document.getElementById("requiredField"); // 
	

	letters = /[^A-Z]/i; // reguljört uttryck - vilka bokstäver som får användas i textfälten, både stora och små
	emailPattern = /^([A-Z0-9_\-\.])+\@([A-Z0-9_\-\.])+\.([A-Z]{2,4})$/i; // reguljört uttryck - vilka tecken som får användas i mailfältet

	form.addEventListener("submit", submitForm); // lägg till händelselyssnare för submit form när formuläret skickas
	fnameField.addEventListener("blur", FnameHandler); // lägger till händelselyssnare för förnamnsfältet
	snameField.addEventListener("blur", SnameHandler); // lägger till händelselyssnare för efternamnsfältet
	mailField.addEventListener("blur", MailHandler); // lägger till händelselyssnare för mailfältet
 
	checkboxes = form.querySelectorAll('input[name="choice2"]'); // undersöker attribut som har namnet choice2
	checkboxes.forEach(function(checkbox) { 
		checkbox.addEventListener("change", validateCheckboxes); // en händelselyssnare ser om det händer något med checkboxarna, om de checkas i
	});

	question4radio = form.querySelectorAll('input[name="choice4"]'); //undersöker attribut som har namnet choice4
	question4radio.forEach(function(radio) {
		radio.addEventListener("change", validateRadio4); // en händelselyssnare ser om det händer något med radioknapparna
	});

	question1radio = form.querySelectorAll('input[name="choice1"]'); //undersöker attribut som har namnet choice4
	question1radio.forEach(function(radio) {
		radio.addEventListener("change", validateRadio1); // en händelselyssnare ser om det händer något med radioknapparna
	});


}

function FnameHandler() {
	if (letters.test(fnameField.value)) { // valideringsfunktion, undersöker om förnamnsfältet använder tillåtana tecknen som uppges i init
		errorElement.innerHTML = "Your firstname is required with only letters."; // om fältet innehåller andra tecken än tillåtna så kommer detta felmeddelande upp när användaren klickar utanför fältet
	} else { 
		errorElement.innerHTML = ""; // om fältet bara innehåller tillåtna tecken så visas meddelande utan tecken dvs inget meddelande alls
	}
}

function SnameHandler() { 
	if (letters.test(snameField.value)) {	// valideringsfunktion, undersöker om efternamnsfältet använder tillåtana tecknen som uppges i init, letters
		errorElement.innerHTML = "Your surname is reqired with only letters."; // om fältet innehåller andra tecken än tillåtna så kommer detta felmeddelande upp när användaren klickar utanför fältet
	} else {
		errorElement.innerHTML = ""; // om fältet bara innehåller tillåtna tecken så visas meddelande utan tecken dvs inget meddelande alls
	}
}

function MailHandler() { // valideringsfunktion, undersöker om mailfältet endast använder tillåtana tecknen och format som uppges i init, emailPattern
	if (!emailPattern.test(mailField.value)) {
		errorElement.innerHTML = "Please enter a valid email address."; // om fältet innehåller andra tecken än tillåtna så kommer detta felmeddelande upp när användaren klickar utanför fältet
	} else {
		errorElement.innerHTML= ""; // om fältet bara innehåller tillåtna tecken så visas meddelande utan tecken dvs inget meddelande alls
	}
  }

function submitForm(event) {
    event.preventDefault(); // validerar tvingande fält, förnamn, efternamn, e-post, fråga 2 och fråga 4

	if (!fnameField.value || letters.test(fnameField.value)) { // använde boolean för att använda värdet i textfältet och jämföra med tillåtna tecken och ser om formuläret är korrekt ifyllt
        errorElement.innerHTML = "Your firstname is required with only letters.";  // formuläret kan inte valideras och felmeddelande kommer upp när användaren trycker på knappen
        return; // koden fortsätter inte att läsas av
    }

    if (!snameField.value || letters.test(snameField.value)) { // använde boolean för att använda värdet i textfältet och jämföra med tillåtna tecken och ser om formuläret är korrekt ifyllt
        errorElement.innerHTML = "Your surname is required with only letters."; // formuläret kan inte valideras och felmeddelande kommer upp när användaren trycker på knappen
        return; // koden fortsätter inte att läsas av
    }

    if (!mailField.value || !emailPattern.test(mailField.value)) { // använde boolean för att använda värdet i textfältet och jämföra med tillåtna tecken och ser om formuläret är korrekt ifyllt
        errorElement.innerHTML = "Your mail is invalid."; // formuläret kan inte valideras och felmeddelande kommer upp när användaren trycker på knappen
        return; // koden fortsätter inte att läsas av
    }


	let AnyClicked1 = false;
	console.log("radio clicked");

	for (let i=0; i<question1radio.length; i++){
		if (question1radio[i].checked) {
			AnyClicked1 = true;
		}
	}
	if (!AnyClicked1) {
		errorElement.innerHTML = "Please fill in an answer to question 1"; // om ingen radioknapp är checkad
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



 	let AnyClicked4 = false;
	 console.log("radio clicked");

 	for (let i=0; i<question4radio.length; i++){
		if (question4radio[i].checked) {
			AnyClicked4 = true;
		}	
	}

	if (!AnyClicked4) {
		errorElement.innerHTML = "Please fill in an answer to question 4";
		return;
   
	}

	



	errorElement.innerHTML = "The form was submitted successfully!"; // om alla valideringar är korrekta så visas detta meddelande
}


function validateCheckboxes() { // undersöker om minst en checkbox är checkad
	let AnyChecked = false;
	console.log("checkboxes changed");

    for (let i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			AnyChecked = true;
		}
	}

	if (!AnyChecked) {
		errorElement.innerHTML = "Please fill in a choise to question 2."; // ingen checkbox är checkad
  	} else {
		errorElement.innerHTML= ""; // minst en checkbox är checkad
  	}
    
}

function validateRadio4() { // undersöker om minst en radioknapp är checkad
	let AnyClicked = false;
	console.log("radio clicked");

	for (let i=0; i<question4radio.length; i++){
		if (question4radio[i].checked) {
			AnyClicked = true;
		}
	}
	if (!AnyClicked) {
		errorElement.innerHTML = "Please fill in an answer to question 4"; // om ingen radioknapp är checkad
	} else {
		errorElement.innerHTML = ""; // om minst en radioknapp är checkad
	}
}

function validateRadio1() { // undersöker om minst en radioknapp är checkad
	let AnyClicked = false;
	console.log("radio clicked");

	for (let i=0; i<question1radio.length; i++){
		if (question1radio[i].checked) {
			AnyClicked = true;
		}
	}
	if (!AnyClicked) {
		errorElement.innerHTML = "Please fill in an answer to question 1"; // om ingen radioknapp är checkad
	} else {
		errorElement.innerHTML = ""; // om minst en radioknapp är checkad
	}
}
window.addEventListener("load", init);
console.log("form submitted via JavaScript");
