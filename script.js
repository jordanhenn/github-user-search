

const searchURL = "https://api.github.com/users/"

function getRepos(searchTerm){
    const url = searchURL + `${searchTerm}/repos`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayRepos(responseJson))
        .catch(err => {
            $('.js-error-message').text(`Error: ${err.message}`);
    });
}

function displayRepos(responseJson) {
    console.log(responseJson);
    $('.js-results-area').removeClass('hidden');
    for (let i = 0; i < responseJson.length; i++){
        $('.js-results').append(
            `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>`   
        );
    }
}

function watchForm(){
$('.js-search').submit(event => {
    event.preventDefault();
    $('.js-results-area').addClass('hidden');
    $('.js-results').empty();
    $('.js-error-message').text('');
    const searchTerm = $('.js-search-item').val();
    getRepos(searchTerm);
});
}


$(watchForm);