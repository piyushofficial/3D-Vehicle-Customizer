(function(window) {
    window.env = window.env || {};
    try {
        window['env'] = {
            API_URI: "${API_URI}",

        };
    } catch (e) {
        console.error('Failed to Parse ENV', e);
    }
})(this);