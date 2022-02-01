window.addEventListener('load', function(event) {

    new Vue({
        el: '#table-cryptos',
        delimiters : ['[[', ']]'],
        data: {
            infos: null,
            page: 2,
            nbrResults: 10
        
        },
        methods: {
            // Change currency of one line
            changeCurrency: function(e) {
        
                const currency = e.target.value
                const valueToChange = e.target.parentElement.parentElement.querySelector('.currentPrice')
                const currencyId =  e.target.parentElement.parentElement.querySelector('.currency-id').id

                axios
                .get('/api/coins/change/' + currencyId +'/' + currency)
                .then( response => {
                    console.log('response change => ', response)
                    valueToChange.innerHTML = response.data.data
                }) 
            },
            // show 10 mor results
            showMore: function() {

            
                console.log('this page => ', this.page)

                axios
                .get('/api/coins?page=' + this.page)
                .then((response) => {
                    this.nbrResult += 10
                    response.data.data.map((el) => this.infos.push(el))
                })


            },
            // display graph for one currency
            displayGraph: function (e) {
                e.preventDefault()
                console.log('je suis displayGraph')
            }
        },
        created () {

            axios
            .get('/api/coins')
            .then( response => {
                console.log('response vue => ', response.data.data)
                this.infos = response.data.data
                setInterval(() => {
                    axios
                    .get('/api/coins?nbrResults=' + this.nbrResult)
                    .then( response => {
                        console.log('response vue setInterval => ', response.data.data)
                        this.infos = response.data.data
                    })
                }, 10000)
            })
        },
        
    })


    new Vue({
        el: '#main-timer',
        delimiters : ['[[', ']]'],
        data: {
            hours : 0,
            minutes: 0,
            seconds: 0
        },
        methods: {
            setTime() {
                const date = new Date()
                let hours = date.getHours()
                let minutes = date.getMinutes()
                let seconds = date.getSeconds()
                hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours
                minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes
                seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds
                this.hours = hours
                this.minutes = minutes
                this.seconds = seconds
            }
        },
        mounted() {
            setInterval(() => this.setTime(), 1000)
        }

    })
});
