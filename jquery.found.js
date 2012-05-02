/* jquery.found.js 
 *
 * Peter Tran 
 * http://github.com/proc
 */

;(function( $ ){

  $.fn.found = function( options ) {  
    var default_options = {
            placeholder : 'Search...'
          , title : 'Reset'
        }
        , settings = $.extend(default_options, options);

    function calculate_right(reset_element) {
      var width = reset_element.width(),
          right  = width;
      return right - width/2;
    };

    function clear_input($element) {
      $element.val('');
    };

    return this.each(function() {
      var $this = $(this);
      if( !$this.data('jquery.found:initialized')) {
        var reset_link = $('<a />', { 'href' : 'javascript:void(0)', 
            'style' : 'position:absolute; display:none;',
            'title' : settings.title }).html('x'),
            wrapper = $('<div />', { 
              'style' : 'position:relative; display:inline-block;', 
              'class' : 'found-input-wrapper'
              });

        function change_handler(element) {
          if( element.val() != '' ) {
            reset_link.css('display', 'inline').show();
          } else {
            reset_link.hide();
          }
        };

        $this.wrap(wrapper);
        $this.after(reset_link);
        $this.css('width', $this.width() - calculate_right(reset_link));
        $this.css('padding-right', ((reset_link.width() * 2) + 5 ) + 'px');
        reset_link.css('right', calculate_right(reset_link) + 'px');
      
        reset_link.bind('click', function() {
          clear_input($this);
          $this.trigger('changed');
        });

        $this.attr('placeholder', settings.placeholder);

        $this.bind('cut paste keyup change', function() {
          $this.trigger('changed');
        });

        $this.bind('changed', function(event) {
          change_handler($(event.target));
        });

        $this.trigger('changed');
        $this.data('jquery.found:initialized', true);
      }
    });

  };
})( jQuery );
