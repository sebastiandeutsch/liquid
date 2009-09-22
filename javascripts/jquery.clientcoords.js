jQuery.clientCoords = function() {
     var dimensions = { width: 0, height: 0 };
     if (document.documentElement) {
         dimensions.width = document.documentElement.offsetWidth;
         dimensions.height = document.documentElement.offsetHeight;
     } else if (window.innerWidth && window.innerHeight) {
         dimensions.width = window.innerWidth;
         dimensions.height = window.innerHeight;
     }
     return dimensions;
}