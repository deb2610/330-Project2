        
        

const app = new Vue({
    el: '#app',
    data: {
        title: "Indie Origin",
        results: {},
        num: 1
    },
    methods: {
        search() {
            Itch.getGameData({
                user: "leafo",
                game: "x-moon",
                onComplete: function(returndata) {
                    this.results = returndata;
                    console.log("GOT DATA");

                }
            })
        },
        printdata(){
            console.log("PRINTING DATA");
            console.log(this.results);
        }
    }

});







