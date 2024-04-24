document.addEventListener("DOMContentLoaded", function() {
    console.log('started')

// Intercept fetch requests
if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        console.log('Fetch request made to:', args[0], 'with options:', args[1]);
        return originalFetch.apply(this, args)
            .then(response => {
                console.log('Fetch response from:', args[0], 'status:', response.status);
                return response;
            });
    };
}

// Intercept XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
    const xhr = this;

    // Logging request headers
    xhr.addEventListener('loadstart', function() {
        console.log('XHR started:', method, url);
        console.log('Request Headers:', xhr.getAllResponseHeaders());
    });

    // Logging response headers
    xhr.addEventListener('load', function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('XHR successful:', method, url, 'status:', xhr.status);
                console.log('Response Headers:', xhr.getAllResponseHeaders());
                console.log('Response:', xhr.responseText); // This will log the response
            } else {
                console.log('XHR error in loading:', method, url, 'status:', xhr.status);
            }
        }
    });

    xhr.addEventListener('error', function() {
        console.log('XHR error in loading:', method, url);
    });

    originalOpen.apply(this, arguments);
};



function logResourceRequests() {
    const resources = performance.getEntriesByType("resource");
    resources.forEach(resource => {
        console.log(`Resource loaded - Type: ${resource.initiatorType}, URL: ${resource.name}, Duration: ${resource.duration.toFixed(2)}ms`);
    });
}

// Call this function at a certain interval or after specific events
logResourceRequests();



    
//test request
    send()
function send(){
    var xhr = new XMLHttpRequest();
xhr.open('GET', 'test.https://www.altharaajo.com/api/app/category?isTop=true&sorting=creationTime', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request was successful, handle response data here
            console.log(xhr.responseText);
        } else {
            // Request failed, handle errors here
            console.error('Request failed:', xhr.status);
        }
    }
};
xhr.send();

}
});

