function updateLocation(id){
    $.ajax({
        url: '/search/' + id,
        type: 'PUT',
        data: $('#update-search').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
