window.onload = init;
"use strict";

let testnames = [];
let tempResults = [];
let currentSpecies;
let maps;


function init() {
    // doesn't work
    // const speciesSave = app.species;
    // const genderSave = app.gender;
    // const ageSave = app.age;
    // const prefix = "330-03-";
    // const speciesKey = prefix + "species";
    // const genderKey = prefix + "gender";
    // const ageKey = prefix + "age";

    // const storedSpecies = localStorage.getItem(speciesKey);
    // const storedGender = localStorage.getItem(genderKey);
    // const storedAge = localStorage.getItem(ageKey);

    // if(storedSpecies){
    //     app.species = storedSpecies;
    // }
    // if(storedGender){
    //     app.gender = storedGender;
    // }
    // if(storedAge){
    //     app.age = storedAge;
    // }

    // speciesSave.onchange = e => { localStorage.setItem(speciesKey, e.target.value); };
    // genderSave.onchange = e => { localStorage.setItem(genderKey, e.target.value); };
    // ageSave.onchange = e => { localStorage.setItem(ageKey, e.target.value); };

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
        species: "Dog",
        dog: true,
        gender: "No",
        age: "No",
        filtered: [],
        count: 0,
        maxCount: 0
    },
    methods: {

        search() {

            if (this.species == "Cat") {
                console.log("cat");
                if (this.gender == "Male") {
                    console.log("Man");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }

                }
                else if (this.gender == "Female") {
                    console.log("Woman");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }
                }
                else {
                    console.log("No");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }
                }
            }
            else {
                console.log("dog");
                if (this.gender == "Male") {
                    console.log("Man");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }

                }
                else if (this.gender == "Female") {
                    console.log("Woman");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }
                }
                else {
                    console.log("No");
                    if (this.age == "Baby") {
                        console.log("Baby");
                    }
                    else if (this.age == "Young") {
                        console.log("Young");
                    }
                    else if (this.age == "Adult") {
                        console.log("Adult");
                    }
                    else {
                        console.log("No");
                    }
                }
            }
            this.petSearch("Dog", "Male", "Baby");

        },
        display() {
            this.results = tempResults;
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

        },
        wishlistAdd() {

        },
        petSearch() {
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });
            pf.animal.search()
                .then(function (e) {
                    console.log("searchin");
                    tempResults = e.data.animals;
                    for (let i = 0; i < 20; i++) {
                        if (tempResults[i].species == "Dog") {
                            
                        }

                    }
                    this.maxCount = this.count;
                    this.count = 0;
                    console.log(this.filtered);
                    return tempResults;
                })
                .then(function () {
                    console.log(tempResults);
                    this.results = tempResults;
                })
                .then(() => {
                    this.display();
                    this.map();
                })
                .catch(function (e) { })
        },
        comparer(var1, var2) {
            return var1 == var2;
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
        if (typeof this.animal.contact.address.address1 === "null" || typeof this.animal.contact.address.address1 === "undefined") {
            console.log("No address provided");
        }
        else {
            console.log(this.animal.contact.address.address1);
        }
        console.log("address");
        console.log(this.animal.contact.address.city + ", " + this.animal.contact.address.state);
        console.log(this.animal.contact.email);
        console.log(this.animal.contact.phone);
        console.log(this.animal.url);

        let geocodeFriend = mapboxSdk({ accessToken: "pk.eyJ1Ijoib25lcmVkc2hvZSIsImEiOiJjanVyN252Mzkzd2oxNGZwajRpenJjZHBoIn0.fxVWTe9SNmU1sXG-ZNSOEw" });
        geocodeFriend.forwardGeocode({
            query: 'Paris, France',
            countries: ['fr']
        })
            .send()
            .then(response => {
                const match = response.body;
                console.log(match);
            });
    }
}

function addMarker(latitude, longitude, title) {
    let position = { lat: latitude, lng: longitude };
    let marker = new google.maps.Marker({ position: position, map: map });
    marker.setTitle(title);
    google.maps.event.addListener(marker, 'click', function (e) {
        makeInfoWindow(this.position, this.title);
    });
}




