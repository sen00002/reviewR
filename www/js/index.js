var rating = 0;
// Global var rating created
var stars = null;
// var stars created to determine if the stars are undefined or not clicked
let imageFromFile;
// let is used to reassign the value 
let reviewList = new Array();
// reviewlist is created and it's value can be changed later on and it's valuw iwll be stored in the new array
let currentReview = 0;
//new variable is being declared and it's inital value is assigned
var localStorageKey = "reviewR-sen00002";
// a new var is created to store the value of all the local data

document.addEventListener('deviceready', onDeviceReady);
// document.addeventlistener attaches an event handler to the document and will show that cordova device API has loaded and ready to access

function onDeviceReady() {
    // a function is created saying it is safe to call API's
   let saveButton = document.getElementById("saveBtn");
    // declaring a variable savebtn will return the element that has Id attribute with specified value
    
    saveButton.addEventListener("click", saveReview);
    // attaching a handler to the savebutton to save review when clicked on the screen
    console.log("Save Button is clicked " + saveButton);
    // It will display that the button is clicked in the console window of the browser

    let cancelButton = document.getElementById("cancelBtn");
    // a cancelbutton is declaring a variable that will be attached as a handler to the document

    cancelButton.addEventListener("click", cancelModal);
    // a cancel button is attached to the document and will cancel the modal when touched on the screen
    console.log("Cancel Button is clicked " + cancelButton);
    // It will display that the cancelbutton is clicked in the console window of the browser

    let pictureButton = document.getElementById("pictureBtn");
    // a picturebutton variable is declared it will get it's value assigned and is attached to the document
    pictureButton.addEventListener("click", takePicture);
    // this button will take a picture when clicked on the screen saving it's another value and attaching it to the document
    console.log("Picture Button is clicked " + pictureButton);
    // display in console browser 

    let deleteButton = document.getElementById("deleteBtn");
    // a deletebutton is declared a new value as it is attached to the document and will return value that has an Id attribute with specified value

    deleteButton.addEventListener("click", deleteReview);
    // a delete function is added and to the delete button when clicked delete review on the screen and the data is attached with the eventlistener 
    console.log("Delete Button is clicked " + deleteButton);
    // it will display the that delete button is clicked in the console window of the browser

    rateStars();
    // it will return the  value

    displayReviews();
    // It will return the value 

}

function saveToLocalStorage() {
    // a function is created to save all the items to the local storage

    localStorage.setItem(localStorageKey, JSON.stringify(reviewList));
    // localstorage will set the item in the localstoragekey and JSON will convert to human readable form ************* isto baad ki houga!


}


function getFromLocalSorage() {
    // this function will call the data from the localstorage that is saved there

    if (!localStorage.getItem(localStorageKey)) {
        // agr yeh new item na le paya toh local storage se item utha lega



    } else {

        reviewList = JSON.parse(localStorage.getItem(localStorageKey));
        // reviewlist local storage se uthaega and agr item store krwani huyi  toh local storage se uthalega and Json data meh convert kr lega ta ki hum padh saken reviewlist meh

        console.log("Data is " + reviewList);
// else it will display the data from the list of local storage in console window of the browser
    }
}

function cancelModal() {
    // a new function created to cancel the modal 

    document.getElementById("itemName").value = "";
    // it will attach the data to the document and will display itemName and value is attached and we can put the value

    value = 0;
    // it vaue is put to zero as it is not declared

    document.getElementById("myImage").src = "";
    // It will declare the name myImage and aatach the document and src is attached and we can choose the any source

    rateStars();
    // We can rate the stars as the value we can enter


    var endEvent = new CustomEvent('touchend', {
        // a variable is created which will end the event and a new value will be assigned
        bubbles: true,
        // It will diaplay that the butto is clickedand the event is directed to the event
        cancelable: true
        // it is having a boolean value, depending on whether the event can have it's defalut action prevented
    });

    var a = document.querySelector("a#xButton");
    // this query method will return the very first value that matches a specified css selector(s)
    in the document

    a.dispatchEvent(endEvent);
    // It will display thorw unspecified event type error if the event type wasn't specified by initialzing the event before the method was called, or if it's event type is null or an empty string

}


function saveReview() {
     // a funtion is there to asve the review and we can put the value
    
    let nameSaved = document.getElementById("itemName").value;
    // it will declare that the name is saved and it will call the item and attach to the document and it will be displayed as item name and attached to the value

    let ratingSaved = rating;
    // the rating the we will gave it will be saved as it will declare a new value in the rating

    imageFromFile = document.getElementById("myImage").src;
    // the image will be attached with image from file and it's source is attached to that

    let currentTime = new Date().getTime() / 1000;
    // it will declare a new value to the current time, value will be the new date and time(to get in seconds it is divided in 1000)


    let review = {
        // it will declare  new value to the object review
        id: currentTime,
        // it will get a new value assigned

        name: nameSaved,
        // it will get a new value saved in the review object

        rating: ratingSaved,
        // the rating that we will give will be stored as a new value

        img: imageFromFile
        // yeh sabb samjh se bahr hai***************

    };

    reviewList.push(review);
    // it will ad new reviews to the end of the list and return the new length

    saveToLocalStorage();
    // It will save all the data to the local stoarge

    cancelModal();
    // It will cancel the modal that has been created over there

    displayReviews();
    // it will display all the reviews

}


function takePicture() {
    // this function will take pictures

    var options = {
        // A new object is created

        quality: 80,
        // it will diplay the guidelines fro programming

        destinationType: Camera.DestinationType.DATA_URL,
        // it will save the photo to this destination in the phone

        encodingType: Camera.EncodingType.PNG,
        // it will format the pucture 

        mediaType: Camera.MediaType.PICTURE,
        // it will diaplay as a picture

        pictureSourceType: Camera.PictureSourceType.CAMERA,
        // it will display the picture source

        allowEdit: true,
        // it will allow to make changes to the picture

        targetWidth: 300,
        // it will take the frame to format the picture

        targetHeight: 300
        // it will target the height of the frame of the picture

    }

    navigator.camera.getPicture(onSuccess, onFail, options);
    // yeh samjh nhi aaya **************

}


function displayReviews() {
    // this function will display the reviews

    getFromLocalSorage();
    // it will take all the data from the local storage


    let list = document.getElementById("review-list");
    // it will declare the list and it is attached to the the dcoument and reviewlist will appear
    console.log("The list item is " + list);
    // it will dipaly the list in the console window of the browser

    list.innerHTML = "";
    // it will return the html content of the of the list

    for (let i = 0; i < reviewList.length; i++) {
        // an undefined value is assigned and it will increase the length of the list


        let li = document.createElement("li");
        // it will create an element li in the document
        console.log("li " + li);
        // it will diplay as li in the console window of the browser
        li.className = "table-view-cell media";
        //thr lis will be cocatinate to the class name and will be viewed in the table

        li.setAttribute("dataId", reviewList[i].id);
        // it will set a particular value to each item added and will be incremented


        let a = document.createElement("a");
        // it will decalare a new value the a and will be attached to the document

        a.href = "#deleteReview"
        // it create a link in the html to delete the review

        a.classList = "navigate-right";
        // it will open the list to the right or touch******************


        let div = document.createElement("div");
        // a new div element will be created and attached to the document

        div.classList = "media-body";
        //the class list will be dispalyed in the div created


        let pName = document.createElement("p");
        // it will create a new element in the document that we will enter

        pName.className = "name";
        // it will attach the classname to the person's name

        pName.textContent = reviewList[i].name;
        // the persons name will be attached to all the contents of the list


        let img = document.createElement("img");
        // it will create a new element in the document

        img.classList = "media-object pull-left";
        // it will attach the image the list and will save the list to left

        img.src = reviewList[i].img;
        // image will be attached to the list *****************

        img.id = "displayedImage";
        // id of the image will be known when image will be diplayed


        div.appendChild(pName);
        //this will will take the data from the parent tag
        console.log("List rating " + reviewList[i].rating);
        // it will diplay the list of the rating in the console woindow of the browser
        for (let n = 0; n < reviewList[i].rating; n++) {
            // a new function

            let spanRating = document.createElement("span");
            // it will declare a new element span 

            spanRating.classList = "star";
            // it will be separate from the classList

            div.appendChild(spanRating);
            // it will take data from the parent tag

        }


        a.addEventListener("touchstart", reviewsModal);
        // a handler will be attached to the reviewsModal touchstart

        a.appendChild(img);
        // it will derive the data from the parent tag

        a.appendChild(div);
        // it will derrive data from the div

        li.appendChild(a);
        // yeh samjh se bahr hai***********

        list.appendChild(li);

    }

}


function reviewsModal(ev) {
    // a function reviewsModal is created
    currentReview = ev.target.parentElement.attributes.dataId.nodeValue;
    // It will target the current review and get all it's data from the parent element 

    console.log("The current Review is " + currentReview);
    //it will diplay the data as the current review is in the console window of the browser


    document.getElementById("closeDeleteMenu").addEventListener("touchstart", function() {
        // It will close the menu connected with the data by ID and return the new value

        document.getElementById("itemNameDisplay").textContent = "";
        // It will diplay the item name and attach the data to the file

        document.getElementById("reviewImageDisplay").src = "";
        // It will review the image and attach to the document

        value = 0;

    })
    for (let i = 0; i < reviewList.length; i++) {
        // this will automaticaly add the length to the reviewlist

        if (currentReview == reviewList[i].id) {
            // it will focus on the current review and conenct with the id

            document.getElementById("itemNameDisplay").textContent = "Item: " + reviewList[i].name;
            // it will diplay the content name as item in the list

            document.getElementById("reviewImageDisplay").src = reviewList[i].img;
            // it will be viewed as review image display

            document.getElementById("starsCurrent").innerHTML = "";
            // it will display the stars and connect with the html and format it

            let lengthStars = reviewList[i].rating;
            // it will declare a value of the stars

            for (let n = 0; n < lengthStars; n++) {

                let spanRating = document.createElement("span");
                // It will create a new element for the rating of the stars given

                spanRating.classList = "star";
                // it will add to the the class list the value of star

                document.getElementById("starsCurrent").appendChild(spanRating);
                // it will get the value from starscurrent and get it into span rating

            }

            break;

        }

    }

}


function deleteReview() {
    for (let i = 0; i < reviewList.length; i++) {
        // it will automatically increment the value
        if (currentReview == reviewList[i].id) {

            reviewList.splice(i, 1);
            // Yeh samjh nhi aaya*************

            console.log("After Deleting the Review " + reviewList);
            // it will display in cthe consoel window of the browser that the review is deleted

            break;

        }

    }


    document.getElementById("itemNameDisplay").textContent = "";
    // it will derive the element that we will put the value

    document.getElementById("reviewImageDisplay").src = "";
    // it will display the image as a review

    document.getElementById("starsCurrent").innerHTML = "";
    // it will display the current stars given

    value = 0;


    saveToLocalStorage();
    // It will save all the values to the localstorage

    displayReviews();
    // it will diaplay the reviews that are put


    var endEvent = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
// it will delete all the data and added as a custom event 
    var a = document.querySelector("#closeDeleteMenu");
    // it's value will be from var a query selector

    a.dispatchEvent(endEvent);
    // it will dispatch the event

}


function rateStars() {
// a  function stars is there
    stars = document.querySelectorAll('.star');
// it will  return the value of the stars that has been stored
    addListeners();
    // it will be attached to the document

    setRating();
    // the rating will be set as put

}


function onSuccess(imageURI) {

    var image = document.getElementById('myImage');
    console.log("Image is " + image);
    // it will display the image as in the console window of thwe browser
    image.src = "data:image/jpeg;base64," + imageURI;
    console.log("SRC " +image.src);
    // it will diaplay the source of the image in the console window of the browser
}


function onFail(message) {

    console.log("Failed " + message);
    // it will display failed as a message if the function fails to call

}


function addListeners() {
    // yeh samjh se bahr hai*********

    [].forEach.call(stars, function(star, index) {

        star.addEventListener('click', (function(idx) {
            return function() {

                rating = idx + 1;

                console.log("Rating is now " + rating);
                
                setRating();

            }

        })(index));

    });


}


function setRating() {
    // a function is set for rating and it's value will be set

    [].forEach.call(stars, function(star, index) {
        // ir will make calls from the index

        if (rating > index) {
            //as index value is nothing if the rating increases it will store the stars and add it to thee class list

            star.classList.add('rated');

            

        } else {

            star.classList.remove('rated');
            // otherwise it will remove the stars and make a change and mark as rated

        }

    });

}