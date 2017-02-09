/*
QUESTIONS
-querySelector selects anything? tags, ids, and classes?
A: yup.

Event Handlers
-how do you know to use dot notation to access value? Is value an attribute of the "input" tag?
- What is "value"?
A. Value is the attribute that comes with input tag. 

Default Event Behaviours
-How do you know that you will receive an event upon clicking on theLink?
-Do certain tags have pre-existing events? (i.e. <a>)
A: All tags can have events. p, a, li, ul, etc. in the callback of eventlistener , you can pass it an argument called "event" that you can do something with or pass it nothing at all. 

Event Delegation
-console.logging listItems 
A: listItems is an Array-like object, that because it's prototype does not have forEach method in it, we are calling Array.prototype to access that method on it
*/

// var app = document.querySelector('#app');

// //take 1
// var theTitle = document.createElement('h1');
// theTitle.innerText= "Hello World!";

// //when creating new element using DOM, have to add it to already existing element, or else it won't appear on page
// app.appendChild(theTitle);


// // //take 2 of accomplishing lines 3 to 7
// // app.innerHTML = '<h1>Hello World!</h1>';
// // //less efficient. Removes anything previously in #app. Not as useful as take 1

//=========================Manipulating=========================
// //take 1 - manipulating classes of element
// var h1 = document.querySelector('h1');
// h1.classList.add('red');

// // //take 2 of manipulating style of element without adding/removing class name. Changing its inline style. Inline style attribute of element.
// // document.querySelector('h1').style.color = 'red';

// //Add a button
// var theButton = document.createElement('button');
// theButton.innerText = "click me!";
// app.appendChild(theButton);

// //new part!
// theButton.addEventListener('click', function(){
// 	theTitle.classList.toggle('red');
// })

// //==================================Event Handlers=================================================
// var textBox = document.querySelector('#textBox');
// var theButton = document.querySelector('#app button'); // CSS for "the element with tag name button inside the element with id app". We could also have given the button an ID

// //re-usable function that both addEventListener and removeEventListener will use
// function printValue(){ 
// 	console.log(this.value); //???? What is value? Is it just an attribute of input tag?
// }

// textBox.addEventListener('input', printValue);

// theButton.addEventListener('click', function(){
// 	// alert('The value of the input box: ' + textBox.value); //???? how do you know to use dot notation to access value?

// 	textBox.removeEventListener('input', printValue); //so once button is clicked, whatever is printed inside textbox, will not be outputted to console
// });

// //==========================Default Event Behaviours==============================================
// var app = document.querySelector('#app');

// var theLink = document.createElement('a'); //creates <a> </a>
// theLink.innerText = 'a link to DecodeMTL'; //Addes text between 2 <a> tags, completing the element
// theLink.setAttribute('href', 'http://www.decodemtl.com'); //how to set HTML attributes
// app.appendChild(theLink); //adding new element <a> to the div with id "app"

// //now to make this new element do something!
// theLink.addEventListener('click', function(event){
// 	event.preventDefault();
// 	console.log('Prevented browsing to ' + this.href + ' by using preventDefault');
// })


// //==================================Event Bubbling=================================================
// document.querySelector('#app').style.height = '400px';

// document.querySelector('#app').style.backgroundColor = '#ccc';

// document.body.addEventListener('click', function(){
// 	console.log('The body was clicked!');
// });

// document.querySelector('#app').addEventListener('click', function(){
// 	console.log('#app was clicked!');
// });

// document.querySelector('#theParagraph').addEventListener('click', function(){
// 	console.log('#theParagraph was clicked!');
// 	event.stopPropagation();
// });

// document.querySelector('#theLink').addEventListener('click', function(event){
// 	event.preventDefault();
// 	event.stopPropagation(); //stops event bubbling from occuring
// 	console.log('#theLink was clicked!');
// });

//============================!!!Event Delegation!!!==============================================
//=======METHOD 1 =================================================================
// var listItems = document.querySelectorAll('#theList li'); //selects all the li's inside #theList


// //Because listItems is NOT an array, but an object, one way to iterate over properties of an object is to "force" use the forEach method on listItems by tying it to the Array.prototype AND calling it (".call")
// Array.prototype.forEach.call(listItems, function(listItem){
// 	//add one event listener per list item
// 	listItem.addEventListener('click', function(){
// 		console.log('You clicked on: ' + this.innerText);
// 	});
// });

// //dynamically adding more li's
// var theList = document.querySelector('#theList');
// var newItem = document.createElement('li');
// newItem.innerText = "Sixth list item";
// theList.appendChild(newItem);

// //=======METHOD 2: target the id #theList versus ALL the li's inside #theList!!========
// var theList = document.querySelector('#theList');

// theList.addEventListener('click', function() {
//     // While `this` represents the #theList element, event has a property called `target` which represents the actual originator of the event. We can use this to our advantage!

//     // First, check if the target is an LI that is a direct child of the list:
//     if (event.target.parentNode === theList) {
//         //confirmed that we clicked on an li
//         console.log('You clicked on: ' + event.target.innerText);
//     };
// });

// //Adding 3 more items to the list
// var newItems = [];
// var newItem;

// for (var i = 6; i <= 9; i++) {
//     newItem = document.createElement('li');
//     newItem.innerText = i+ "th list item";
//     newItems.push(newItem);
// }

// newItems.forEach(function(item){
// 	theList.appendChild(item);
// });

//======================================HTTP REQUESTS==============================================
// fetch('http://www.rbcroyalbank.com')
// .then(function(response){
// 	return response.text();
// })
// .then(function(textResponse){
// 	console.log(textResponse);
// });

fetch('https://www.reddit.com/r/montreal.json')
.then(function(response){
	return response.json(); //equal to JSON.parse(response) in nodeJS. Returns promise so chain it.
})
.then(function(jsonResponse){
	jsonResponse.data.children
	.map(function(post){
		post = post.data;

		//box for each post
		var linkBox = document.createElement('p');

		//link element for each post
		var link = document.createElement('a');
		link.setAttribute('href', post.url);
		link.setAttribute('target', '_blank'); //opens link in new tab
		link.innerText = post.title;

		//add link to the paragraph
		linkBox.appendChild(link);

		//return paragraph from map callback

		return linkBox;
	})
	.forEach(function(linkParagraph){
		document.body.appendChild(linkParagraph);
	});

	//	//Outputs post titles on Montreal subreddit page to the console
	// posts.forEach(function(post, i){
	// 	console.log('Post #' + (i+1) + ': ' + post.data.title);
	// });
});
