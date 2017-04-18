var rating = 0;
var stars = null;
let imageFromFile;
let reviewList = new Array();
let currentReview = 0;
var localStorageKey = "reviewR-sen00002";

document.addEventListener('deviceready', onDeviceReady);


function onDeviceReady() {
   let saveButton = document.getElementById("saveBtn");
    
    saveButton.addEventListener("click", saveReview);
    console.log("Save Button is clicked " + saveButton);

    let cancelButton = document.getElementById("cancelBtn");

    cancelButton.addEventListener("click", cancelModal);
    console.log("Cancel Button is clicked " + cancelButton);

    let pictureButton = document.getElementById("pictureBtn");

    pictureButton.addEventListener("click", takePicture);
    console.log("Picture Button is clicked " + pictureButton);

    let deleteButton = document.getElementById("deleteBtn");

    deleteButton.addEventListener("click", deleteReview);
    console.log("Delete Button is clicked " + deleteButton);

    rateStars();

    displayReviews();

}

function saveToLocalStorage() {

    localStorage.setItem(localStorageKey, JSON.stringify(reviewList));


}


function getFromLocalSorage() {

    if (!localStorage.getItem(localStorageKey)) {



    } else {

        reviewList = JSON.parse(localStorage.getItem(localStorageKey));

        console.log("Data is " + reviewList);

    }
}

function cancelModal() {

    document.getElementById("itemName").value = "";

    value = 0;

    document.getElementById("myImage").src = "";

    rateStars();


    var endEvent = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });

    var a = document.querySelector("a#xButton");

    a.dispatchEvent(endEvent);

}


function saveReview() {

    let nameSaved = document.getElementById("itemName").value;

    let ratingSaved = rating;

    imageFromFile = document.getElementById("myImage").src;

    let currentTime = new Date().getTime() / 1000;


    let review = {
        id: currentTime,

        name: nameSaved,

        rating: ratingSaved,

        img: imageFromFile

    };

    reviewList.push(review);

    saveToLocalStorage();

    cancelModal();

    displayReviews();

}


function takePicture() {

    var options = {

        quality: 80,

        destinationType: Camera.DestinationType.DATA_URL,

        encodingType: Camera.EncodingType.PNG,

        mediaType: Camera.MediaType.PICTURE,

        pictureSourceType: Camera.PictureSourceType.CAMERA,

        allowEdit: true,

        targetWidth: 300,

        targetHeight: 300

    }

    navigator.camera.getPicture(onSuccess, onFail, options);

}


function displayReviews() {

    getFromLocalSorage();


    let list = document.getElementById("review-list");
    console.log("The list item is " + list);

    list.innerHTML = "";

    for (let i = 0; i < reviewList.length; i++) {


        let li = document.createElement("li");
        console.log("li " + li);
        li.className = "table-view-cell media";

        li.setAttribute("dataId", reviewList[i].id);


        let a = document.createElement("a");

        a.href = "#deleteReview"

        a.classList = "navigate-right";


        let div = document.createElement("div");

        div.classList = "media-body";


        let pName = document.createElement("p");

        pName.className = "name";

        pName.textContent = reviewList[i].name;


        let img = document.createElement("img");

        img.classList = "media-object pull-left";

        img.src = reviewList[i].img;

        img.id = "displayedImage";


        div.appendChild(pName);
        console.log("List rating " + reviewList[i].rating);
        for (let n = 0; n < reviewList[i].rating; n++) {

            let spanRating = document.createElement("span");

            spanRating.classList = "star";

            div.appendChild(spanRating);

        }


        a.addEventListener("touchstart", reviewsModal);


        a.appendChild(img);

        a.appendChild(div);

        li.appendChild(a);

        list.appendChild(li);

    }

}


function reviewsModal(ev) {
    currentReview = ev.target.parentElement.attributes.dataId.nodeValue;

    console.log("The current Review is " + currentReview);


    document.getElementById("closeDeleteMenu").addEventListener("touchstart", function() {

        document.getElementById("itemNameDisplay").textContent = "";

        document.getElementById("reviewImageDisplay").src = "";

        value = 0;

    })
    for (let i = 0; i < reviewList.length; i++) {

        if (currentReview == reviewList[i].id) {

            document.getElementById("itemNameDisplay").textContent = "Item: " + reviewList[i].name;

            document.getElementById("reviewImageDisplay").src = reviewList[i].img;

            document.getElementById("starsCurrent").innerHTML = "";

            let lengthStars = reviewList[i].rating;

            for (let n = 0; n < lengthStars; n++) {

                let spanRating = document.createElement("span");

                spanRating.classList = "star";

                document.getElementById("starsCurrent").appendChild(spanRating);

            }

            break;

        }

    }

}


function deleteReview() {
    for (let i = 0; i < reviewList.length; i++) {
        if (currentReview == reviewList[i].id) {

            reviewList.splice(i, 1);

            console.log("After Deleting the Review " + reviewList);

            break;

        }

    }


    document.getElementById("itemNameDisplay").textContent = "";

    document.getElementById("reviewImageDisplay").src = "";

    document.getElementById("starsCurrent").innerHTML = "";

    value = 0;


    saveToLocalStorage();

    displayReviews();


    var endEvent = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });

    var a = document.querySelector("#closeDeleteMenu");

    a.dispatchEvent(endEvent);

}


function rateStars() {

    stars = document.querySelectorAll('.star');

    addListeners();

    setRating();

}


function onSuccess(imageURI) {

    var image = document.getElementById('myImage');
    console.log("Image is " + image);
    image.src = "data:image/jpeg;base64," + imageURI;
    console.log("SRC " +image.src);
}


function onFail(message) {

    console.log("Failed " + message);

}


function addListeners() {

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

    [].forEach.call(stars, function(star, index) {

        if (rating > index) {

            star.classList.add('rated');

            

        } else {

            star.classList.remove('rated');

        }

    });

}