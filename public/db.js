let db;

// open the budget database
const request = indexedDB.open('budget_database', 1);

request.onupgradeneeded(({ target }) => {
    db = target.result;
    const objectStore = db.createObjectStore('transactions');
    objectStore.createIndex('transaction', 'transaction')
});

request.onsuccess(({ target }) => {
    db = target.result;

    // check the online database if the app is online
    if (navigator.onLine) checkDatabase();
});