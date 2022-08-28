@media only screen and (max-width: 700px) {
.search-container-c {
display: grid;
grid-template-columns: auto;
}
.result-container-c {
display: grid;
grid-template-columns: auto;
margin-left: auto;
}
}
JAVA SCRIPT CODING:
$(document).ready(() => {
limit = 10;
var inputData;
const resetState = () => {
$('.errorbox-c').hide();
$('.errorbox-c').html('');
$('.result-container-c').html('');
$('.morebtn-c').hide();
};
resetState();
$('#searchbtn-i').click(() => {
resetState();
inputData = $('#searchbox-i').val().trim();
if (!inputData) {
showError('We cannot search for an empty Gif. Can we? &#128530');
$('#searchbox-i').val('');
$('#searchbox-i').focus();
} else {
getGifs(inputData, limit);
}
});
$('#morebtn-i').on('click', () => {
limit += 10;
getGifs(inputData, limit);
});
const getGifs = async(query, limit) => {
try {
await fetch(
`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${config.API_KEY}&limit
=${limit}`
)
.then((response) => displayDirector(response.json(), 
response.status))
.then((resData) => showResult(resData.data));
} catch (err) {
console.error(`Some fatal error occured ${err}`);
}
};
const displayDirector = (response, status) => {
console.log(response);
switch (status) {
case 200:
console.log('Success');
break;
case 403:
showError('Oops! Looks like you are missing the API Key 
&#128533');
break;
case 404:
showError(
"Sorry. We couldn't find what you are looking for. Perhaps 
try searching for something else? &#129488"
);
break;
default:
showError(
'We are not sure what happened. But our server is not 
responding. &#128528'
);
}
return response;
};
const showError = (data) => {
$('.errorbox-c').show();
$('.errorbox-c').html(`<p>${data}</p>`);
};
const showResult = (data) => {
data.length === 0 ? displayDirector(true, 404) : resetState();
data.map((item) => {
$('.result-container-c').append(
`<div class="result-item-c" id=${item.id}><img 
src=${item.images.preview_gif.url} alt=${item.title}/></div>`
);
});
data.length < 10 ? $('.morebtn-c').hide() : $('.morebtn-c').show();
};
});
