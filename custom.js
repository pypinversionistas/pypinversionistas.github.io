var options = {
    root: null,
    rootMargin: '0px',
    threshold: .5
};

var callback = (entries, observer) => {
    entries.forEach(entry => {
        let target = entry.target;
        if (target.id) {
            document.body.classList.remove(`${target.id}-active`);
        }
        if (target.id) {
            document.body.classList[entry.isIntersecting ? "add" : "remove"](`${target.id}-active`);
        }
    });
};

// Create intersection observer
var observer = new IntersectionObserver(callback, options);

for (let section of document.querySelectorAll('.adara-section, .pyp-section, main > *')) {
    observer.observe(section);
}

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const video = document.querySelector('main-video')
    if (!video) return;
    if (scrollPosition > 100) {
        video.closest('body').classList.add('scrolled');
        typeof(video.pause)=='function' && video.pause()
    } else {
        video.closest('body').classList.remove('scrolled');
        typeof (video.play) == 'function' && video.play()
    }
});


var stopScrollPosition = 500; // Change this value to your desired scroll position

// Set the cooldown time in milliseconds
var cooldownTime = 1000; // Change this value to your desired cooldown time

var cooldownTimeout = null;
var lastScrollTime = 0;
var isScrollStopped = false;
var lastScrollPosition = window.scrollY || window.pageYOffset;

// Function to handle the scroll event
function handleScroll(event) {
    if (!document.querySelector('main-video')) return;
    // Get the current scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    if (isScrollStopped && scrollY <= 20) {
        isScrollStopped = false;
    }

    // Check if the scroll position is beyond the stop point
    if (scrollY > stopScrollPosition && !isScrollStopped) {
        //console.info(`${lastScrollPosition}: ${scrollY}`)
        event.preventDefault();

        // Force the scroll position to remain at the stop point
        window.scrollTo(0, stopScrollPosition);
        if (!cooldownTimeout) {
            // Clear any existing cooldown timeout
            // Wait for the cooldown time before allowing scrolling again
            cooldownTimeout = setTimeout(() => {
                isScrollStopped = true;
                clearTimeout(cooldownTimeout);
                cooldownTimeout = null;
            }, cooldownTime);
        }
    }
    lastScrollPosition = window.scrollY || window.pageYOffset;

    // Update the last scroll time
    lastScrollTime = Date.now();
}

// Add scroll event listener
//window.addEventListener('scroll', handleScroll);



function initialize_carousel() {
    for (let target_carousel of document.querySelectorAll(".carousel ")) {
        target_carousel.carousel = target_carousel.carousel || new bootstrap.Carousel(target_carousel, {
            interval: 5000
        });

        target_carousel.carousel.cycle();
    }
}

//xo.listener.on('click::*[ancestor-or-self::a[@href]]', function () {
//    let section = this.closest('[id]');
//    xover.site.hash = section.id
//})

window.addEventListener('resize', function () {
    if (window.innerHeight > window.innerWidth) {
        document.body.classList.add('portrait');
        document.body.classList.remove('landscape');
    } else {
        document.body.classList.add('landscape');
        document.body.classList.remove('portrait');
    }
});

xo.listener.on('submit::.contact-form', async function () {
    event.preventDefault();
    let formData = new FormData(this);
    try {
        await xover.server.requestInfo(new URLSearchParams(formData));
        alert("La solicitud ha sido recibida con éxito");
    } catch (e) {
        throw (e)
    }
})

xo.listener.on('fetch::root', async function (document) {
    this.select(`//data/value/text()`).filter(text => text.value.match(/\n/)).forEach(data => data.textContent = data.textContent.replace(/([>:]\s*)\n/g, '$1').replace(/\n/g, '<br/>'));
})

//xo.listener.on('fetch?href=~eventos.resx::root', async function(document){
//    this.select(`//data/value/text()`).filter(text => text.value.match(/\n/)).forEach(data => data.parentNode.replaceChildren(...xover.xml.createFragment(`<p>${data.textContent.replace(/([>:]\s*)\n/g, '$1').replace(/\n+/g, '</p><p>')}</p>`).childNodes));
//    event.stopImmediatePropagation()
//})

var datediff = function (intervalType, first_date, last_date) {
    // Parse the input dates
    if (!(first_date && last_date)) return undefined;
    const first = first_date instanceof Date ? first_date : first_date.parseDate();
    const last = last_date instanceof Date ? last_date : last_date.parseDate();
    intervalType = intervalType.replace(/s$/, '');

    // Calculate the difference in milliseconds
    const diffMs = last - first;

    // Convert milliseconds to the specified interval type
    let diffInterval;
    switch (intervalType) {
        case 'year':
            diffInterval = diffMs / (1000 * 60 * 60 * 24 * 365.25);
            break;
        case 'month':
            diffInterval = diffMs / (1000 * 60 * 60 * 24 * 30.44);
            break;
        case 'day':
            diffInterval = diffMs / (1000 * 60 * 60 * 24);
            break;
        case 'hour':
            diffInterval = diffMs / (1000 * 60 * 60);
            break;
        case 'minute':
            diffInterval = diffMs / (1000 * 60);
            break;
        case 'second':
            diffInterval = diffMs / 1000;
            break;
        default:
            throw new Error('Invalid interval type');
    }

    // Return the result rounded to 2 decimal places
    return Math.floor(Math.round(diffInterval * 100) / 100);
}

xover.listener.on('click::*[ancestor-or-self::*[@data-dismiss-target]]', function () {
    let target = this.closest("[data-dismiss-target]").getAttribute("data-dismiss-target");
    this.closest(target).remove();
    event.preventDefault();
})