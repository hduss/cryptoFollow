
document.addEventListener('click', function (event) {

    event.preventDefault();
	if (!event.target.matches('.link_id')) return;

    axios.get('/api/cryptos')
    .then(function (response) {

        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });


}, false);

document.addEventListener('click', function (event) {
    event.preventDefault();
	if (!event.target.matches('#show_more')) return;

    console.log('data-offset => ', event.target.getAttribute("data-offset"));
	console.log('data-limit => ', event.target.getAttribute("data-limit"));

	limit = event.target.getAttribute("data-limit")
	offset = event.target.getAttribute("data-offset")

    axios.get('/api/cryptos/' + limit + '/' + offset)
    .then(function (response) {

        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });


}, false);


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