

let linkId = document.querySelector(".link_id");
let showMore = document.querySelector('#show_more');


linkId.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('je suis click');
})


document.addEventListener('click', (event) =>  {
    event.preventDefault();
	if (!event.target.matches('.link_id')) return;

	console.log('Id cryptos => ', event.target.getAttribute('id'))
	console.log('Target => ', event.target.closest('tr'));
	let last_row = document.querySelector('#last_row')

    axios.get('/api/cryptos')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

}, false);


showMore.addEventListener('click', function (event) {
    event.preventDefault();
	if (!event.target.matches('#show_more')) return;

	let limit = event.target.getAttribute("data-limit")
	let offset = event.target.getAttribute("data-offset")
	let table = document.querySelector('#main-tab')

    axios.get('/api/cryptos/' + limit + '/' + offset)
    .then(function (response) {

        let returnDatas = response['data']['data']
        console.log('Datas => ', response['data']['data'])

        if(returnDatas.length > 0){

            let trNode = document.createElement("tr");
            let trValue = "";

            for(let i = 0; i < returnDatas.length; i++){

                let tr = table.insertRow(-1);
                let tdRank = tr.insertCell()
                let tdName = tr.insertCell()
                let tdPrice = tr.insertCell()
                let tdCurrency = tr.insertCell()

                tdRank.innerHTML = returnDatas[i]['rank']
                tdName.innerHTML = '<a href="" id="' + returnDatas[i]['id'] + '" class="link_id">' + returnDatas[i]['name'] + '</a>'
                tdPrice.innerHTML = returnDatas[i]['priceUsd']
                tdCurrency.innerHTML = 'USD'
            }

//            let newLimit = parseInt(limit) + 10
            let newOffset = parseInt(offset) + 10
            event.target.setAttribute("data-offset", newOffset)

        }else{
            console.log('Fail get datas')
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}, false);


 document.addEventListener('click',(e) => {
    if(e.target && e.target.id== 'brnPrepend'){
          //do something
     }

     console.log('je suis cliek after')
 });



//axios.get('/api/cryptos')
//
//.then(function (response) {
//
//    const tab = document.getElementById('main-tab');
//    console.log('Tab ici =>', tab);
//    console.log('Tab children => ', tab.children);
//
//
//
//    console.log(response);
//})
//.catch(function (error) {
//    console.log(error);
//});