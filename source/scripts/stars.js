window.$ = jQuery.noConflict();
var $ = jQuery.noConflict();
       var $me = $( '.star-ctr' );

   var $bg, $fg, wd, cc, ini;

   $bg = $me.children( 'ul' );
   $fg = $bg.clone().addClass( 'star-fg' ).css( 'width', 100 ).appendTo( $me );
   $bg.addClass( 'star-bg' );

   function initialize() {

      ini = true;

      // How many rating elements
      cc = $bg.children().length;

      // Total width of the bar
      wd = $bg.width();
   }

   $me.mousemove(function( e ) {
      
      // Do once, deferred since fonts might not
      // be loaded so the calcs will be wrong
      if ( !ini ) initialize();

      var dt, vl;

      // Where is the mouse relative to the left
      // side of the bar?
      dt = e.pageX - $me.offset().left;
      vl = Math.round( dt / wd * cc * 10 ) / 10;

      $me.attr( 'data-value', vl );
      $fg.css( 'width', Math.round( dt )+'px' );

   }).click(function() {

       // Grab value
      // alert( $( this ).attr( 'data-value' ) );

       return false;
   });
$( '.star-ctr' ).attr( 'data-value', '4.4' );
