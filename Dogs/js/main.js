window.onload = init;
"use strict";

let tempResults = [];
let currentSpecies;
let currentAge;
let currentGender;
let maps;
let wishlistCount;
let wishlist = [];
let wishlistAdminLocal = [];
let currentUserLocal = [];
let user;
let tempID;
let allUsers = [];
let userSearched = false;

//Init sets up the current user through recognition of the local storage and 
//uses a function to generate a new user if need be
//It also initializes the firebase info using the user info among other things
//As well as resetting any previous searches if they are found within the storage
function init() {
    if (!localStorage.getItem('userID')) {
        createUserID();
        localStorage.setItem('userID', JSON.stringify(tempID));
    }
    user = localStorage.getItem('userID');
    //console.log("User: "+ user);
    //firebase listener
    path = 'pets/' + user + '/filteredResults/';
    firebase.database().ref(path).on("value", dataChanged, firebaseError);
    path = 'pets/';
    firebase.database().ref(path).on("value", getUsers, firebaseError);

    app.mounted();
}

//Footer component that is slightly different from the included footer html syntax
Vue.component('my-footer',{
    props:['creator1','creator2'],
    template: `<div class="footer">
    <p>© {{creator1}} & {{creator2}} 2019. All Rights Reserved.</p>
</div>`
})

//Vue app used
//Functions include 
/**Search: sets up the intitial loading once the search button is pressed and resets any relevant information
 * as well as begins the search process that the user expects
 * Display: Manages the set up of the results given by the search, and attempts to handle any errors if the search finds no animals
 * Map: calls the MapResults class and begins the map creation process
 * FirebasePull: this function will take local variables that are set up by the firebase information and pass them safely into the vue variables
 * WishlistAdd: this function will add any relevant information to the firebase data lists and handles it if there is no info to add
 * PetSearch: the actual search function through the petfinder api, and then calls display(), map(), and filter to continue using the information
 * Filter: sorts through the data using the local variables and quickly filters out all of the relevant results returned by the petfinder api
 * Mounted: handles localStorage changes and sets them right upon the refreshing of the app
*/
const app = new Vue({
    el: '#app',
    data: {
        title: "Fetch!",
        results: [],
        num: 1,
        petSpecies: "Dog",
        petGender: "No",
        petAge: "No",
        filterResults: [],
        wishlistVue: wishlist,
        wishlistAdmin: [],
        count: 0,
        maxCount: 0,
        mapLoading: false,
        userList: [],
        currentUser: {
            id: "",
            text: ""
        },
        currentPic: "No Photo to Show",
        creator1: "Behan",
        creator2: "Bernstein"

    },
    components:{},
    methods: {

        search() {
            this.mapLoading = true;
            this.filterResults = [];
            this.maxCount = 20;
            this.count = 0;
            userSearched = true;
            this.petSearch();
        },
        display() {
            this.results = this.filterResults;
            //If there is nothing in the filterResults list, make the result that gets displayed have strings in it so that the user knows that nothing was returned. 
            if (this.maxCount == 0) {
                this.results[0].name = "No Results Found";
                this.results[0].species = "";
                this.results[0].gender = "";
                this.results[0].age = "";
                this.results[0].contact = [];
                this.results[0].status = "unavailable";
                this.results[0].url = "";
                this.results[0].photos = [];
            }
            else {
                this.currentPic = this.results[0].photos[0].medium;
            }

        },
        map() {
            maps = new MapResult(this.results);
            maps.maps();
        },
        firebasePull() {
            this.wishlistVue = wishlist;
            this.wishlistAdmin = wishlistAdminLocal;
            this.userList = allUsers;
            this.currentUser = currentUserLocal;

        },
        wishlistAdd() {
            if (userSearched) {
                if (!this.filterResults == false) {
                    if (!wishlistCount) {
                        wishlistCount = 0;
                    }
                    let path = 'pets/' + user + '/searchParams';
                    firebase.database().ref(path).set({ // over-writes old values
                        type: this.petSpecies,
                        gender: this.petGender,
                        age: this.petAge
                    });

                    path = 'pets/' + user + '/filteredResults/' + wishlistCount;
                    firebase.database().ref(path).set({ // over-writes old values
                        name: this.filterResults[0].name,
                        species: this.filterResults[0].species,
                        age: this.filterResults[0].age,
                        contact: this.filterResults[0].contact.address.address1,
                        status: this.filterResults[0].status,
                        url: this.filterResults[0].url

                    });
                }
                else {
                    //console.log("Wishlist Error: Nothing to Add");

                }
            }

        },
        petSearch() {
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });
            pf.animal.search()
                .then(function (e) {
                    tempResults = e.data.animals;
                    return tempResults;
                })
                .then(function () {
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


                if (this.maxCount == 0) {

                    this.filterResults[0].name = "No Results Found";
                    this.filterResults[0].species = "";
                    this.filterResults[0].gender = "";
                    this.filterResults[0].age = "";
                    this.filterResults[0].contact = [];
                    this.filterResults[0].status = "unavailable";
                    this.filterResults[0].url = "";
                    this.filterResults[0].photos = [];
                    this.filterResults[0].contact.email = "";
                }
            }
        },
        mounted() {

            if (localStorage.getItem('fetchPetSpecies'))
                this.petSpecies = JSON.parse(localStorage.getItem('fetchPetSpecies'));
            if (localStorage.getItem('fetchPetGender'))
                this.petGender = JSON.parse(localStorage.getItem('fetchPetGender'));
            if (localStorage.getItem('fetchPetAge'))
                this.petAge = JSON.parse(localStorage.getItem('fetchPetAge'));
        }

    },
    //Vue's built-in watch system can keep an eye on variables and do things if they are changed in any way
    //in this case, it's used to handle localStorage setup and firebase management for the admin page
    watch: {
        petSpecies: {
            handler() {
                localStorage.setItem('fetchPetSpecies', JSON.stringify(this.petSpecies));
            },
            deep: true
        },
        petGender: {
            handler() {
                localStorage.setItem('fetchPetGender', JSON.stringify(this.petGender));
            },
            deep: true
        },
        petAge: {
            handler() {
                localStorage.setItem('fetchPetAge', JSON.stringify(this.petAge));
            },
            deep: true
        },
        currentUser: {
            handler() {
                if (this.currentUser) {
                    currentUserLocal = this.currentUser.id;
                    //console.log(currentUserLocal);
                    path = 'pets/' + currentUserLocal + '/filteredResults/';
                    // /console.log(path);
                    firebase.database().ref(path).on("value", setAdminPage, firebaseError);
                }
            }

        }
    }
});
let locator;
class MapResult {
    constructor(animals) {
        this.animal = animals[0];
        this.address = this.animal.contact.address.city + " " + this.animal.contact.address.state;
    }
    maps() {
        locator = this.address;
        mapboxgl.accessToken = 'pk.eyJ1Ijoib25lcmVkc2hvZSIsImEiOiJjanVyN252Mzkzd2oxNGZwajRpenJjZHBoIn0.fxVWTe9SNmU1sXG-ZNSOEw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'

        });
        map.setZoom(1);
        map.setCenter([-77.6799, 43.083848]);


        let geocoder = new MapboxGeocoder({ // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            marker: false,
            placeholder: "Search: " + this.address
            // Placeholder text for the search bar
        });
        map.addControl(geocoder);
        map.on('load', function () {
            //gif thing
            app.mapLoading = false;
            //real code
            //set up the query through code so that it automatically has a result and goes to the location given
            geocoder.query('\'' + locator + '\'');
            map.addSource('single-point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },

            });

            map.addLayer({
                id: 'point',
                source: 'single-point',
                type: 'circle',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#448ee4'
                }
            });

            // Listen for the `result` event from the Geocoder
            // `result` event is triggered when a user makes a selection
            //  Add a marker at the result's coordinates
            geocoder.on('result', function (e) {

                map.getSource('single-point').setData(e.result.geometry);
            });
        });

    }

}

function dataChanged(data) {
    //console.log("Data Loaded from Firebase");
    let obj = data.val();

    if (obj) {
        wishlistCount = obj.length;
        wishlist = obj;
        allUsers = Object.keys(obj);
        app.firebasePull();
    }
}
function setAdminPage(data) {
    //console.log("Data Loaded from Firebase");
    let obj = data.val();

    if (obj) {
        wishlistAdminLocal = obj;
        //allUsers = Object.keys(obj);
        app.firebasePull();
    }
}
function getUsers(data) {
    let obj = data.val();

    if (obj) {
        allUsers = Object.keys(obj);
        app.firebasePull();
    }
}
function firebaseError(error) {
    console.log(error);
}
//fun little function to randomize user ids so everyone has a unique set of database info
function createUserID() {
    let num = Math.random() * 2000 + 1;
    tempID = Math.round(num);
}

