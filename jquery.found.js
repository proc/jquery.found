/* jquery.found.js 
 *
 * Peter Tran 
 * http://github.com/proc
 */

;(function($){
  $.fn.found = function(options) {
    var default_options = {
            placeholder : ''
          , title : 'Reset'
          , html : '&#215;'
        }
        , settings = $.extend( default_options, options );


    function clear_input($element) {
      $element.val('');
    };

    return this.each(function() {
      var $this = $(this);
      if( !$this.data('jquery.found:initialized')) {
        var reset_link = $('<a />', { 
              'href'  : 'javascript:void(0)' 
            , 'style' : 'position:absolute; display:none;'
            , 'class' : 'found-reset-link'
            , 'title' : settings.title
            }).html(settings.html)
          , wrapper = $('<div />', { 
                'style' : 'position:relative; display:inline-block;' 
              , 'class' : 'found-input-wrapper'
            });

        function change_handler(element) {
          if(element.val() != '') {
            reset_link.css('display', 'inline').show();
          } else {
            reset_link.hide();
          }
        };

        $this.wrap(wrapper);
        $this.after(reset_link);
        $this.css('width', $this.width());
        $this.css('padding-right', reset_link.outerWidth() + 'px');
        reset_link.css('right', '1px');
      
        reset_link.bind('click', function() {
          clear_input($this);
          $this.trigger('changed');
        });
        
        if(settings.placeholder !== '') {
          $this.attr('placeholder', settings.placeholder);
        }

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
