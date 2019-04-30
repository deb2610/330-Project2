window.onload = init;
let testnames = [];
let tempResults = [];
let maps;


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
        age: "",
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

            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });
            if (this.species == "Cat") {
                console.log("cat");
                dog = false;
            }
            pf.animal.search()
                .then(function (e) {
                    console.log("searchin");
                    tempResults = e.data.animals;
                    for (let i = 0; i < 20; i++) {

                        testnames[i] = tempResults[i].name;
                    }
                    count = 0;
                    return tempResults;
                })
                .then(function () {
                    console.log(tempResults);
                    this.results = tempResults;

                })
                .then(() => {
                    this.filterSpecies(this.results);

                    this.display();
                    this.map();
                })

                .catch(function (e) { })

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

        }
        ,
        filterSpecies(list)
        {
            if(this.species == "Cat")
            {
               console.log("Pussy");
            }
            else {
                console.log("Bitch");
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
        map.setZoom(9);
        map.setCenter([-77.6799, 43.083848]);
    }
    contactLoc() {
        if (typeof this.animal.contact.address.address1 === "null" || typeof this.animal.contact.address.address1 === "undefined") {
            console.log("No address provided");
        }
        else {
            console.log(this.animal.contact.address.addres1);
        }
        console.log("address");
        console.log(this.animal.contact.address.city + ", " + this.animal.contact.address.state);
        console.log(this.animal.contact.email);
        console.log(this.animal.contact.phone);
        console.log(this.animal.url);
    }
}





