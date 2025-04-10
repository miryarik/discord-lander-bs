// bootstrap offcanvas filter bug fix

document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("mainNavbar");
    const offcanvas = document.getElementById("navbarOffcanvas");
    const navbarContainer = document.querySelector(".navbar .container-fluid");
    
    // function to properly handle the offcanvas position
    function handleOffcanvasPosition() {
        // get offcanvas backdrop
        const backdrop = document.querySelector(".offcanvas-backdrop");
        
        // if navbar is collapsed & scrolled enough for bg-blurple
        if (window.innerWidth < 992 && navbar.classList.contains("bg-blurple")) {
            
            // move the offcanvas outside the navbar to fix stacking context
            if (offcanvas.parentElement === navbarContainer) {
                document.body.appendChild(offcanvas);
                
                // also ensure backdrop is at body level for proper stacking
                if (backdrop && backdrop.parentElement !== document.body) {
                    document.body.appendChild(backdrop);
                }
            }
        } else {
            // move offcanvas back inside navbar container
            if (offcanvas.parentElement === document.body) {
                navbarContainer.appendChild(offcanvas);
            }
        }
    }
    
    // handle scroll events
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-blurple", "shadow");
        } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-blurple", "shadow");
        }
        
        handleOffcanvasPosition();
    });
    
    // listen for resize events
    window.addEventListener("resize", handleOffcanvasPosition);
    
    // handle initial state
    handleOffcanvasPosition();
    
    // also listen for Bootstrap events to ensure proper positioning
    offcanvas.addEventListener("show.bs.offcanvas", function() {
        handleOffcanvasPosition();
    });
});