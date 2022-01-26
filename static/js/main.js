
console.log('je suis la');

axios.get('/api/cryptos')

.then(function (response) {

    const tab = document.getElementById('main-tab');
    console.log('Tab ici =>', tab);
    console.log('Tab children => ', tab.children);



    console.log(response);
})
.catch(function (error) {
    console.log(error);
});