const app = new Vue({
    el: '#app',
    data: {
        title: "Indie Origin",
        results: {},
        num: 1
    },
    methods: {
        search() {
            fetch("",{mode: 'no-cors'})
                .then(response => {
                    if (!response.ok) {
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    this.results = json;
                })
        },
    }

});







