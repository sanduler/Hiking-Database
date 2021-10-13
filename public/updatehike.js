
function updateHike(id){
    $.ajax({
        url: '/addhike/' + id,
        type: 'PUT',
        data: $('#addHike-update').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
