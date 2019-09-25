$(document).ready(function() {

    if ("serviceWorker" in navigator) {
        console.log("ok");
        navigator.serviceWorker
            .register("scripts/service-worker-test.js")
            .then(registration => {
                console.log("App: Téléchargement fini.");

                registration.addEventListener(
                    "updatefound",
                    () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener(
                            "statechange",
                            () => {
                                console.log("App: Nouvel état :", newWorker.state);
                            }
                        );
                    });
            })
            .catch(err => {
                // Il y a eu un problème
                console.error("App: Crash de Service Worker", err);
            });
    } else {
        console.log("No service Worker in Navigator");
    }
});