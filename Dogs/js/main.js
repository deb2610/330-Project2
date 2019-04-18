let testnames = [];
let tempResults = [];
const app = new Vue({
    el: '#app',
    data: {
        title: "Fetch",
        results: [],
        names: [],
        age: "",
        num: 1
    },
    methods: {
        search() {
            
            let pf = new petfinder.Client({ apiKey: "3aPqyYam1lM9nzOX5yAUempjnMNDApTMvEwCr8VSwV4RX8j0OK", secret: "LzTl7yGbikkCB9Cx5yBr3vIfUyGl7bmCdLp3JAXT" });
            //http://api.petfinder.com/my.method?key=12345&arg1=foo
            pf.animal.search()
                .then(function (e) {
                    // console.log(e);
                    this.results = [];
                    this.names = [];
                    // this.results = e.data.animals;
                    tempResults = e.data.animals;
                    //console.log(results);
                    for (let i = 0; i < 20; i++) 
                    {
                        testnames[i] = tempResults[i].name;
                        console.log(testnames[i]);
                    }

                    // console.log(this.results);
                    // console.log(this.name);
                    // console.log(this.age);
                    return tempResults;
                })
                .then(function () {
                    console.log(tempResults);
                    this.results = tempResults;
                    // this.names = testnames;
                })
                .then(()=>{
                    console.log("hello");
                    display();})

                .catch(function (e) {})     
        },
        display()
        {
            console.log("ive been summoned");

            this.results = tempResults;

            // for (let i = 0; i < 20; i++) {
            //     this.names[i] = testnames[i];
            // }
        }
    }
});







