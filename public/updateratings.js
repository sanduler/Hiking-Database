function updateRating(id){
    $.ajax({
        url: '/ratings/' + id,
        type: 'PUT',
        data: $('#update-ratings').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
