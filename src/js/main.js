import './navigation/navigation';
import './talks/talks'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./js/service-worker/service-worker.js')
             .then(function() {
                 console.log('Service Worker Registered');
             });
}