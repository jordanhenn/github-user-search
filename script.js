const apiKey = 'zU9FvtKJuSTtJgZE0Cg3tEJC3LtfZLJ9rTTwRCOl';

const searchURL = "https://api.nps.gov/api/v1/parks";


function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParks(query, maxResults=50){
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey
    }
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayParks(responseJson))
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
    });
}

function displayParks(responseJson) {
    console.log(responseJson);
    $('.js-results-area').removeClass('hidden');
    if (responseJson.total == 0) {
        $('.js-error-message').text("No results found");
    } else {
    for (let i = 0; i < responseJson.data.length; i++){
        $('.js-results').append(
            `<li>
            <h3 class="parkname"><a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a></h3>
            <p class="description">Description: ${responseJson.data[i].description}</p>
            <div class="address">
                <p>Address:</p>
                <p>${responseJson.data[i].addresses[0].line1}</p>
                <p>${responseJson.data[i].addresses[0].line2}</p>
                <p>${responseJson.data[i].addresses[0].line3}</p>
                <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
            </li>`   
        );
    }
}
}

function watchForm(){
$('.js-search').submit(event => {
    event.preventDefault();
    $('.js-results-area').addClass('hidden');
    $('.js-results').empty();
    $('.js-error-message').text('');
    const stateCodes = $('.js-state-codes').val();
    const maxResults = $('.js-max-results').val();
    getParks(stateCodes, maxResults);
});
}


$(watchForm);