window.addEventListener('load', function(event) {

    new Vue({
        el: '#table-cryptos',
        delimiters : ['[[', ']]'],
        data: {
            infos: null 
        },
        methods: {
            changeCurrency: e => {
        
                const val = e.target.value

                const valueToChange = e.target.parentElement.parentElement.querySelector('.currentPrice')
	            console.log('value to change => ', valueToChange)
                console.log('Selected currency => ', val)
                console.log('parent => ', e.target.parentElement.parentElement)

                valueToChange.innerHTML = 10
            }
        },
        mounted () {
            axios
            .get('/api/coins')
            .then( response => {
                console.log('response vue => ', response.data.data)
                this.infos = response.data.data
            })
        }
    })


    // let showMore = document.querySelector('#show_more');
    // showMore.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     if (!event.target.matches('#show_more')) return;

    //     let limit = event.target.getAttribute("data-limit")
    //     let offset = event.target.getAttribute("data-offset")
    //     let table = document.querySelector('#main-tab')

    //     axios.get('/api/cryptos/' + limit + '/' + offset)
    //     .then(function (response) {

    //         let returnDatas = response['data']['data']
    //         console.log('Datas => ', response['data']['data'])

    //         if(returnDatas.length > 0){

    //             let trNode = document.createElement("tr");
    //             let trValue = "";

    //             for(let i = 0; i < returnDatas.length; i++){

    //                 let tr = table.insertRow(-1);
    //                 let tdRank = tr.insertCell()
    //                 let tdName = tr.insertCell()
    //                 let tdPrice = tr.insertCell()
    //                 let tdCurrency = tr.insertCell()

    //                 tdRank.innerHTML = returnDatas[i]['rank']
    //                 tdName.innerHTML = '<a href="" id="' + returnDatas[i]['id'] + '" class="link_id">' + returnDatas[i]['name'] + '</a>'
    //                 tdPrice.innerHTML = returnDatas[i]['priceUsd']
    //                 tdCurrency.innerHTML = 'USD'
    //             }

    // //            let newLimit = parseInt(limit) + 10
    //             let newOffset = parseInt(offset) + 10
    //             event.target.setAttribute("data-offset", newOffset)

    //         }else{
    //             console.log('Fail get datas')
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // }, false);


    // document.addEventListener('click',(e) => {
    // if(e.target && e.target.id== 'brnPrepend'){
    //         //do something
    //     }

    //     console.log('je suis click after')
    // });

    // axios
    // .get('/api/coins')
    // .then((response) => {
    // console.log('response => ', response)
    // })
    // .catch((err) => {
    // console.log('error ici')
    // })


});
