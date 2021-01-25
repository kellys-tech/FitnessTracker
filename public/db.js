const { json } = require("express");

let db;
//create new db request
const request = indexedDB.open("Workout", 1);

request.onupgradeneeded = function (event) {
    //create object store called "pending" and autoIncrement
    const db = event.target.result;

    db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = function(event) {
    db = event.target.result;
    // check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    console.log("Sorry!" + event.target.errorCode);
};

function saveRecord(record) {
    //create exercise on the pending db with readwrite access
    const exercise = db.exercise(["pending"], "readwrite");

    //acces pending object store
    const store = exercise.objectStore("pending");

    //add record to your store with add method
    store.add(record);
}

function checkDatabase() {
    //open an exercise on your pending db
    const exercise = db.exercise(["pending"], "readwrite");
    //access pending object store
    const store = exercise.objectStore("pending");
    //get all records from store and set to a variable
    const getAll = store.getAll();
    
    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            fetch("/api/exercise/bulk", {
                method: "POST",
                body:JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*", "Content-Type":"application/json"
                }
            })
            .then(resonse => response.json())
            .then(() => {
                //if successful, open an exercise on your pending db
                const exercise = db.exercise(["pending"], "readwrite");
                //access your pending object store
                const store = exercise.objectStore("pending");
                //clear all items in your store
                store.clear();
            });
        }
    };
}

//listen for app coming back online
window.addEventListener("online", checkDatabase);

