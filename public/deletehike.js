
function deleteHike(hikeID){
    $.ajax({
        url: '/addhike/' + hikeID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};