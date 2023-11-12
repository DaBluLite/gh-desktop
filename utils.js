var defaultGetStoreFunc;
export const DataStore = {
    promisifyRequest: (request) => {
        return new Promise((resolve, reject) => {
            request.oncomplete = request.onsuccess = () => resolve(request.result);
            request.onabort = request.onerror = () => reject(request.error);
        });
    },
    createStore: (dbName, storeName) => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        const dbp = DataStore.promisifyRequest(request);

        return (txMode, callback) =>
            dbp.then(db =>
                callback(db.transaction(storeName, txMode).objectStore(storeName))
            );
    },
    defaultGetStore: () => {
        if (!defaultGetStoreFunc) {
            defaultGetStoreFunc = DataStore.createStore("ColorwaysData", "ColorwaysStore");
        }
        return defaultGetStoreFunc;
    },
    get: (key, customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", store => DataStore.promisifyRequest(store.get(key)));
    },
    set: (key, value, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", store => {
            store.put(value, key);
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    setMany: (entries, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", store => {
            entries.forEach(entry => store.put(entry[1], entry[0]));
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    getMany: (keys, customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", store =>
            Promise.all(keys.map(key => DataStore.promisifyRequest(store.get(key))))
        );
    },
    update: (key, updater, customStore = DataStore.defaultGetStore()) => {
        return customStore(
            "readwrite",
            store =>
                new Promise((resolve, reject) => {
                    store.get(key).onsuccess = function () {
                        try {
                            store.put(updater(DataStore.result), key);
                            resolve(DataStore.promisifyRequest(store.transaction));
                        } catch (err) {
                            reject(err);
                        }
                    };
                })
        );
    },
    del: (key, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", store => {
            store.delete(key);
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    delMany: (keys, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", store => {
            keys.forEach(key => store.delete(key));
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    clear: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", store => {
            store.clear();
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    eachCursor: (store, callback) => {
        store.openCursor().onsuccess = function () {
            if (!DataStore.result) return;
            callback(DataStore.result);
            DataStore.result.continue();
        };
        return DataStore.promisifyRequest(store.transaction);
    },
    keys: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", store => {
            // Fast path for modern browsers
            if (store.getAllKeys) {
                return DataStore.promisifyRequest(store.getAllKeys());
            }

            const items = [];

            return DataStore.eachCursor(store, cursor => items.push(cursor.key)).then(() => items);
        });
    },
    values: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", store => {
            if (store.getAll) {
                return DataStore.promisifyRequest(store.getAll());
            }

            const items = [];

            return DataStore.eachCursor(store, cursor => items.push(cursor.value)).then(
                () => items
            );
        });
    },
    entries: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", store => {
            if (store.getAll && store.getAllKeys) {
                return Promise.all([
                    DataStore.promisifyRequest(store.getAllKeys()),
                    DataStore.promisifyRequest(store.getAll())
                ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
            }

            const items = [];

            return customStore("readonly", store =>
                DataStore.eachCursor(store, cursor => items.push([cursor.key, cursor.value])).then(
                    () => items
                )
            );
        });
    }
}

export const ColorwayCSS = {
    get: async () => {
        const name = await DataStore.get("activeColorwayID");
        const css = await DataStore.get("activeColorway");
        return { name: name, import: css };
    },
    set: (e, t) => {
        if (!document.getElementById("activeColorwayCSS")) {
            var activeColorwayCSS = document.createElement("style");
            activeColorwayCSS.id = "activeColorwayCSS";
            activeColorwayCSS.textContent = t;
            document.head.append(activeColorwayCSS);
        } else document.getElementById("activeColorwayCSS").textContent = t;
        DataStore.set("activeColorwayID", e);
        DataStore.set("activeColorway", t);
    },
    remove: () => {
        document.getElementById("activeColorwayCSS").remove();
        DataStore.set("activeColorwayID", null);
        DataStore.set("activeColorway", null);
    },
    start: async () => {
        const name = await DataStore.get("activeColorwayID");
        const css = await DataStore.get("activeColorway");
        if(css) {
            ColorwayCSS.set(name,css);
        }
    }
};