function deleteLocation(id){
    $.ajax({
        url: '/search/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
