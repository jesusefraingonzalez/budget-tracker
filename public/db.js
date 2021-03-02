// open the budget database
const request = indexedDB.open('budget_database', 1);

request.onupgradeneeded(({target}) => {
    const db = target.result;
    const objectStore = db.createObjectStore('transactions');
    objectStore.createIndex('transaction', 'transaction')
});

request.onsuccess(event => console.log(event.result));