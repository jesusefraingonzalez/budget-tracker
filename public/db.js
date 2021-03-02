let db;

// open the budget database
const request = indexedDB.open('budget_database', 1);

request.onupgradeneeded(({ target }) => {
    db = target.result;
    const objectStore = db.createObjectStore('pending');
});

request.onsuccess(({ target }) => {
    db = target.result;

    // check the online database if the app is online
    if (navigator.onLine) checkDatabase();
});

// error handler
request.onerror(({ target }) => console.error(target.errorCode));

const checkDatabase = () => {

    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if(getAll.result.length > 0) {
            fetch('/api/transaction/', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => {
                    const transaction = db.transaction(['pending'], 'readwrite');
                    const store = transaction.objectStore('pending');
                    store.clear();
                });
                
        };
    };
}