function deleteRating(id){
  $.ajax({
    url: '/ratings/' + id,
    type: 'DELETE',
    success: function(result){
      window.location.reload(true);
      }
    });
  }
