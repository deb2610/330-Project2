window.onload = init;
"use strict";

let testnames = [];
let tempResults = [];
let currentSpecies;
let currentAge;
let currentGender;
let maps;
let wishlistCount;
let loadingState;
let user = "user1";
let wishlist;

function init() {

    
}

let speciesSelect = {
    species: "Dog"
};
const app = new Vue({
    el: '#app',
    data: {
        title: "Fetch!",
        results: [],
        num: 1,
        contact: [],
        petSpecies: "Dog",
        petGender: "No",
        petAge: "No",
        filterResults: [],
        wishlistVue: wishlist,
        wishpet: {},
        count: 0,
        maxCount: 0
    },
    methods: {

        search() {
            this.filterResults = [];
            this.maxCount = 20;
            this.count = 0;
            this.petSearch();
        },
        display() {
            this.results = this.filterResults;
            if(this.maxCount == 0)
            {
                this.results[0].name = "No Results Found";
            }
            let temp = [];
            for (let i = 0; i < 20; i++) {
                temp[i] = tempResults[i].contact;
            }
            this.contact = temp;
        },
        map() {
            maps = new MapResult(this.results);
            maps.maps();
            maps.contactLoc();
        },
        wishlistView() {
            // let path = 'pets/' + user +'/searchResults/'+0;
        },
        wishlistAdd() {
            //let searchButton = document.querySelector(".btn");
            if(!wishlistCount){
                wishlistCount = 0;
            }

            let path = 'pets/' + user +'/searchParams';
            firebase.database().ref(path).set({ // over-writes old values
                type: this.petSpecies,
                gender: this.petGender,
                age: this.petAge    
            });
            // for (let i = 0; i < 20; i++) {
            //     let path = 'pets/' + user +'/searchResults/'+i;
            //     firebase.database().ref(path).set({ // over-writes old values
            //         name: tempResults[i].name,
            //         species: tempResults[i].species,
            //         age: tempResults[i].age,
            //         contact: tempResults[i].contact.address.address1,
            //         status: tempResults[i].status,
            //         url:  tempResults[i].url 
            //     });
            // }
            path = 'pets/' + user +'/filteredResults/'+wishlistCount;
            firebase.database().ref(path).set({ // over-writes old values
                    name: this.filterResults[0].name,
                    species: this.filterResults[0].species,
                    age: this.filterResults[0].age,
                    contact: this.filterResults[0].contact.address.address1,
                    status: this.filterResults[0].status,
                    url:  this.filterResults[0].url 
                });
            //wishlistCount++;
        },
        petSearch() {
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });
            pf.animal.search()
                .then(function (e) {
                    console.log("searchin");
                    tempResults = e.data.animals;

                    for (let i = 0; i < 20; i++) {
                        console.log(tempResults[i].species);
                    }

                    console.log(this.filterResults);
                    return tempResults;
                })
                .then(function () {
                    console.log(tempResults);
                    this.results = tempResults;

                })
                .then(() => {

                    this.filter();
                    this.display();
                    this.map();
                })
                .catch(function (e) { })
        },
        filter() {

            for (let i = 0; i < this.maxCount; i++) {
                currentSpecies = results[i].species;
                if (this.petSpecies == currentSpecies) {
                    this.filterResults[this.count] = results[i];
                    this.count++;
                }
            }
            this.maxCount = this.count;
            this.count = 0;
            // console.log("Species filter");
            // console.log(this.maxCount);
            // console.log(this.count);
            // console.log(this.filterResults);

            if (this.petGender != "No") {
                for (let i = 0; i < this.maxCount; i++) {
                    currentGender = this.filterResults[i].gender;
                    if (this.petGender == currentGender) {
                        this.filterResults[this.count] = this.filterResults[i];
                        this.count++;
                    }
                }
                for (let i = this.count; i < 20; i++) {
                    this.filterResults[i] = "";
                }
                this.maxCount = this.count;
                this.count = 0;
                // console.log("Gender filter");
                // console.log(this.maxCount);
                // console.log(this.count);
                // console.log(this.filterResults);

            }
            if (this.petAge != "No") {
                for (let i = 0; i < this.maxCount; i++) {
                    currentAge = this.filterResults[i].age;
                    if (this.petAge == currentAge) {
                        this.filterResults[this.count] = this.filterResults[i];
                        this.count++;
                    }
                }
                for (let i = this.count; i < 20; i++) {
                    this.filterResults[i] = "";
                }
                this.maxCount = this.count;
                this.count = 0;
                // console.log("Age filter");
                // console.log(this.maxCount);
                // console.log(this.count);
                // console.log(this.filterResults);


                if(this.maxCount == 0)
                {
                    this.filterResults[0] = "No Results Found";
                }
            }
        }

    }
});

class MapResult {
    constructor(animals) {
        this.animal = animals[0];
    }
    maps() {
        console.log("MAP");

        mapboxgl.accessToken = 'pk.eyJ1Ijoib25lcmVkc2hvZSIsImEiOiJjanVyN252Mzkzd2oxNGZwajRpenJjZHBoIn0.fxVWTe9SNmU1sXG-ZNSOEw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'

        });
        map.setZoom(1);
        map.setCenter([-77.6799, 43.083848]);

    }
    contactLoc() {
        if (typeof this.animal.contact.address.address1 == "null" || typeof this.animal.contact.address.address1 == "undefined") {
            console.log("No address provided");
        }
        else {
            console.log(this.animal.contact.address.address1);
        }
        console.log("address");
        console.log(this.animal.contact.address.city + ", " + this.animal.contact.address.state);
        //console.log(this.animal.contact.email);
        console.log(this.animal.contact.phone);
        console.log(this.animal.url);

        let geocodeFriend = mapboxSdk({ accessToken: "pk.eyJ1Ijoib25lcmVkc2hvZSIsImEiOiJjanVyN252Mzkzd2oxNGZwajRpenJjZHBoIn0.fxVWTe9SNmU1sXG-ZNSOEw" });
        geocodeFriend.forwardGeocode({
            query: '' + this.animal.contact.address.address1 + ' ' + this.animal.contact.address.city + ',' + ' ' + this.animal.contact.address.state,
            countries: ['' + this.animal.contact.address.country]
        })
            .send()
            .then(response => {
                const match = response.body;
                console.log(match);
            });
    }
}
//firebase listener
path = 'pets/' + user +'/filteredResults/';
firebase.database().ref(path).on("value", dataChanged, firebaseError);

function addMarker(latitude, longitude, title) {
    let position = { lat: latitude, lng: longitude };
    let marker = new google.maps.Marker({ position: position, map: map });
    marker.setTitle(title);
    google.maps.event.addListener(marker, 'click', function (e) {
        makeInfoWindow(this.position, this.title);
    });
}
function dataChanged(data) {
    let obj = data.val();
    if(obj){
        wishlistCount = obj.length;
        wishlist = obj;
        this.wishlistVue = wishlist;
        // this.wishpet = this.wishlistVue[0];
        console.log(this.wishlistVue);
        console.log(this.wishlistVue[0].name);


    }
    //let bigString = "";
    // for (let key in obj) {   // use for..in to interate through object keys

    //     let row = obj[key];
    //     bigString += `<li>${row.userID} :  ${row.score}</li>`;
    //     console.log(row);
    // }
    // lists = bigString;
}
function firebaseError(error) {
    console.log(error);
}



