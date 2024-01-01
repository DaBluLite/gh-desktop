var defaultGetStoreFunc: any;
export const DataStore: any = {
    promisifyRequest: (request: { oncomplete: () => void; onsuccess: () => void; result: unknown; onabort: () => void; onerror: () => void; error: any; }) => {
        return new Promise((resolve, reject) => {
            request.oncomplete = request.onsuccess = () => resolve(request.result);
            request.onabort = request.onerror = () => reject(request.error);
        });
    },
    createStore: (dbName: string, storeName: string) => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        const dbp = DataStore.promisifyRequest(request);

        return (txMode: any, callback: (arg0: any) => any) =>
            dbp.then((db: { transaction: (arg0: any, arg1: any) => { (): any; new(): any; objectStore: { (arg0: any): any; new(): any; }; }; }) =>
                callback(db.transaction(storeName, txMode).objectStore(storeName))
            );
    },
    defaultGetStore: () => {
        if (!defaultGetStoreFunc) {
            defaultGetStoreFunc = DataStore.createStore("ColorwaysData", "ColorwaysStore");
        }
        return defaultGetStoreFunc;
    },
    get: (key: any, customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", (store: { get: (arg0: any) => any; }) => DataStore.promisifyRequest(store.get(key)));
    },
    set: (key: any, value: any, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", (store: { put: (arg0: any, arg1: any) => void; transaction: any; }) => {
            store.put(value, key);
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    setMany: (entries: any[], customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", (store: { put: (arg0: any, arg1: any) => any; transaction: any; }) => {
            entries.forEach((entry: any[]) => store.put(entry[1], entry[0]));
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    getMany: (keys: any[], customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", (store: { get: (arg0: any) => any; }) =>
            Promise.all(keys.map((key: any) => DataStore.promisifyRequest(store.get(key))))
        );
    },
    update: (key: any, updater: (arg0: any) => any, customStore = DataStore.defaultGetStore()) => {
        return customStore(
            "readwrite",
            (            store: { get: (arg0: any) => { (): any; new(): any; onsuccess: () => void; }; put: (arg0: any, arg1: any) => void; transaction: any; }) =>
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
    del: (key: any, customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", (store: { delete: (arg0: any) => void; transaction: any; }) => {
            store.delete(key);
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    delMany: (keys: any[], customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", (store: { delete: (arg0: any) => any; transaction: any; }) => {
            keys.forEach((key: any) => store.delete(key));
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    clear: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readwrite", (store: { clear: () => void; transaction: any; }) => {
            store.clear();
            return DataStore.promisifyRequest(store.transaction);
        });
    },
    eachCursor: (store: { openCursor: () => { (): any; new(): any; onsuccess: () => void; }; transaction: any; }, callback: (arg0: any) => void) => {
        store.openCursor().onsuccess = function () {
            if (!DataStore.result) return;
            callback(DataStore.result);
            DataStore.result.continue();
        };
        return DataStore.promisifyRequest(store.transaction);
    },
    keys: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", (store: { getAllKeys: () => any; }) => {
            // Fast path for modern browsers
            if (store.getAllKeys) {
                return DataStore.promisifyRequest(store.getAllKeys());
            }

            const items: any[] = [];

            return DataStore.eachCursor(store, (cursor: { key: any; }) => items.push(cursor.key)).then(() => items);
        });
    },
    values: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", (store: { getAll: () => any; }) => {
            if (store.getAll) {
                return DataStore.promisifyRequest(store.getAll());
            }

            const items: any[] = [];

            return DataStore.eachCursor(store, (cursor: { value: any; }) => items.push(cursor.value)).then(
                () => items
            );
        });
    },
    entries: (customStore = DataStore.defaultGetStore()) => {
        return customStore("readonly", (store: { getAll: () => any; getAllKeys: () => any; }) => {
            if (store.getAll && store.getAllKeys) {
                return Promise.all([
                    DataStore.promisifyRequest(store.getAllKeys()),
                    DataStore.promisifyRequest(store.getAll())
                ]).then(([keys, values]) => keys.map((key: any, i: string | number) => [key, values[i]]));
            }

            const items: any[][] = [];

            return customStore("readonly", (store: any) =>
                DataStore.eachCursor(store, (cursor: { key: any; value: any; }) => items.push([cursor.key, cursor.value])).then(
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
    set: (e: any, t: string | null) => {
        if (!document.getElementById("activeColorwayCSS")) {
            document.head.append(<style id="activeColorwayCSS">{t}</style>);
        } else document.getElementById("activeColorwayCSS")!.textContent = t;
        DataStore.set("activeColorwayID", e);
        DataStore.set("activeColorway", t);
    },
    remove: () => {
        document.getElementById("activeColorwayCSS")!.remove();
        DataStore.set("activeColorwayID", null);
        DataStore.set("activeColorway", null);
    },
    start: async () => {
        const name = await DataStore.get("activeColorwayID");
        const css = await DataStore.get("activeColorway");
        if(css) ColorwayCSS.set(name,css);
    }
};

export const stripClass = (nodes: any, className: string) => {
    Array.from(nodes).forEach((node) => {
        if((node as Element).classList.contains(className))
            (node as Element).classList.remove(className)
    })
}