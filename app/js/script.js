$(function (){
      
  var $comments = $('#comments-list');
  var $commentText = $('.com-form__field');

  var commentTemplate = $('#comments-item').html();

  function addComment(comment){
    $comments.append(Mustache.render(commentTemplate, comment));
    $commentText.val('');
   }

  function showCommentForm(comment) {
    $('.com-user-info').on('click', '.edit', function(){
      var $showForm = $(this).parent().parent().next();
      if($showForm.hasClass('form-hide')){
        $showForm.removeClass('form-hide');
      }
    });
  }

  function cancelForm(comment) {
    $('.com-form__cancel-btn').on('click', function(){
      var $hideForm = $(this).parent().parent();
      if($hideForm) {
        $hideForm.addClass('form-hide');
      }
    });
  }

  $.ajax({
    type: 'GET',
    url: 'http://frontend-test.pingbull.com/pages/olha.dubynka@gmail.com/comments',
    success: function(comments) {
      $.each(comments, function(i, comment) {
        addComment(comment);
        showCommentForm(comment);
        cancelForm(comment);
      });
    },
    error: function() {
      alert('error loading comments');
    }
  });

  $('.com-form').on('click', function() {
  // $('.com-form').on('submit', function(e) { 
  //   e.preventDefault();
    var comment = {
      content: $commentText.val()
    };

    $.ajax({
      type: 'POST',
      url: 'http://frontend-test.pingbull.com/pages/olha.dubynka@gmail.com/comments',
      data: comment,
      success: function(newComment) {
        addComment(newComment);
        showCommentForm(newComment);
        cancelForm(newComment);
      },
      // error: function() {
      //   alert('error saving comment');
      // }
    });
  });

  $comments.delegate('.com-btn-del', 'click', function() {

    $(this).closest('li').remove();

    // var $li = $(this).closest('li');
    // console.log($li);

    // $.ajax({
    //   url: 'http://frontend-test.pingbull.com/pages/olha.dubynka@gmail.com/comments' + $(this).attr('data-id'),
    //   type: 'DELETE',
    //   // type: 'POST',
    //   crossDomain: true,
    //   xhrFields: {
    //     withCredentials: true
    //   },
    //   dataType: "jsonp",
    //   // data: {
    //   //   _method: 'DELETE'
    //   // },
    //   success: function(){
    //     $li.fadeOut(300, function() {
    //       $(this).remove();
    //     });
    //   }
    // });
  });

});