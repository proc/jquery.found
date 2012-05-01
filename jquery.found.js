/* jquery.found.js 
 *
 * Peter Tran 
 * http://github.com/proc
 */
 
;(function( $ ){

  $.fn.found = function( options ) {  
    var default_options = {},
        settings = $.extend(default_options, options);
    
    function calculate_left(reset_element) {
      var width = reset_element.width(),
          left  = -(width * 2);
      return left;
    };
    
    function clear_input($element) {
      $element.val('');
    };
    
    return this.each(function() {
      var $this = $(this),
          reset_link = $('<a />', { 'href' : 'javascript:void(0)', 'style':'position:relative; display: none;' }).html('x'),
          wrapper = $('<div />', { 'style' : 'position:absolute;'});
          
      function handler(element) {
        if( element.val() != '' ) {
          reset_link.show();
        } else {
          reset_link.hide();
        }
      };
      
      $this.after(wrapper);
      $this.detach();
      wrapper.after($this);
      $this.after(reset_link);
      $this.css('width', $this.width() - calculate_left(reset_link));
      $this.css('padding-right', (reset_link.width() * 2) + 'px');
      
      reset_link.css('left', calculate_left(reset_link) + 'px');
      
      reset_link.bind('click', function() {
        clear_input($this);
        $this.trigger('changed');
      });
      
      $this.bind('cut paste keyup change', function() {
        $this.trigger('changed');
      });
      
      $this.bind('changed', function(event) {
        handler($(event.target));
      });
    });

  };
})( jQuery );