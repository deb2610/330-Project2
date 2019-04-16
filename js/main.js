const app = new Vue({
    el: '#app',
    data: {
        title: "Fetch",
        results: [],
        num: 0
    },
    methods: {
        search() {
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });

            pf.animal.search()
                .then(function (e) {
                    console.log(e.data.animals[0]);
                    this.results = e.data.animals[0];
                })
                .catch(function (e) {

                })


        }
    }

});







