(function() {
'use strict';
  var helloInitialize;

  helloInitialize = function (elem) {
    event.preventDefault();
    var exampleModal;

    exampleModal = new Hello({
      element: 'exampleModal',
      width: $(this).attr('hello-width') || false,
      height: $(this).attr('hello-height') || false,
      full: $(this).attr('hello-full') ? true : false,
      animation: $(this).attr('hello-animation') ? true : false,
      shadow: $(this).attr('hello-shadow') ? true : false,
      load: $(this).attr('hello-load') ? function () {
        alert('lOaDeD XD');
      } : false,
      submit: $(this).attr('hello-submit') ? function () {
        alert('Form submited!');
      } : false,
      ajax: $(this).attr('hello-ajax') || false
    });

    exampleModal.show();
  }

  $('.show-modal').click(helloInitialize);

})(document, window);
