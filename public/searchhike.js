function searchHikeByName() {
    //get the first name 
    var hike_name_search_string  = document.getElementById('hike_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/search/' + encodeURI(hike_name_search_string)
}
