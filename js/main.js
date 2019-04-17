const app = new Vue({
    el: '#app',
    data: {
        title: "Fetch",
        results: {},
        name: "",
        age: "",
        num: 1
    },
    methods: {
        search() {
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });

            pf.animal.search()
                .then(function (e) {
                    this.results = e.data.animals[0];
                    this.name = results.name;
                    this.age = results.age;

                    console.log(this.results);
                    console.log(this.name);
                    console.log(this.age);

                })
                .catch(function (e) {

                })


        }
    }

});







