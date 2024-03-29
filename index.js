function makeRequest(){
    fetch("https://developer.nps.gov/api/v1/parks?stateCode=" + stateSearch+ "&api_key=F5cAEghuj8MT3cc3EYEzi3aKRfvK81RPrSZR0Lqc&limit=" + maxResults )
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log(error))
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    if(responseJson.data.length == 0){
        alert('Something went wrong, check your search parameters. It should be formatted as a two letter state code.')
    } else {
        for ( i = 0 ; i < responseJson.data.length ; i++ ){
            console.log('we looped this many times');
            $('#results-list').append(
                `<li><h1>${responseJson.data[i].fullName}</h1>
                <li>${responseJson.data[i].description}</li><br>
                <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a><br>
                <a href="${responseJson.data[i].directionsUrl}>Get Directions</a>`
            )
        }
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        stateSearch = document.getElementById("js-state-search").value;
        maxResults = document.getElementById("js-max-results").value;
        makeRequest();
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
