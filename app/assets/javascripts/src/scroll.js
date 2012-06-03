// http://stackoverflow.com/questions/487073/jquery-check-if-element-is-visible-after-scroling

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) 
         && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}

// Modified http://stackoverflow.com/questions/487073/jquery-check-if-element-is-visible-after-scroling

function isPartiallyScrolledIntoView(elem)
{
    var viewTop = $(window).scrollTop();
    var viewBottom = viewTop + $(window).height();
    var viewLeft = $(window).scrollLeft();
    var viewRight = viewLeft + $(window).width();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    var elemLeft = $(elem).offset().left;
    var elemRight = elemLeft + $(elem).width();

    return(
        // upper left
        (elemTop <= viewBottom && elemTop >= viewTop &&
         elemLeft <= viewRight && elemLeft >= viewLeft) ||
        
        // bottom left
        (elemBottom <= viewBottom && elemBottom >= viewTop &&
         elemLeft <= viewRight && elemLeft >= viewLeft) ||

        // upper right
        (elemTop <= viewBottom && elemTop >= viewTop &&
         elemRight <= viewRight && elemRight >= viewLeft) ||
        
        // bottom right
        (elemBottom <= viewBottom && elemBottom >= viewTop &&
         elemRight <= viewRight && elemRight >= viewLeft));
}

// http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );};
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else {
    obj.addEventListener( type, fn, false );
    }
}

