
// local storage and session storage
const storage = localStorage || window.localStorage;

export const LOCAL_STORAGE = {
  LOCAL_KEY: "data",
  VALUE: "value",
  TYPE: {
    token: "t",
    userId: "uid",
  },
}


// get data from local (local variable or session storage or local storage)
export function getLocalInfo(type) {
  if (storage && storage.length) {
    return storage.getItem(type);
  } else {
    return null;
  }
}

// set local data (local variable and session storage and local storage)
export function setLocalInfo(type, value) {
  if (value !== undefined && value !== null) {
    if (storage) {
      storage.setItem(type, value);
    }
  } else {
    if (storage) {
      storage.removeItem(type);
    }
  }
}

export class LocalStorage {
  constructor(token, fullname, userId) {
    this[LOCAL_STORAGE.TYPE.token] = token;
    this[LOCAL_STORAGE.TYPE.fullname] = fullname;
    this[LOCAL_STORAGE.TYPE.userId] = userId;
  }

  saveToLocalStorage() {
    setLocalInfo(LOCAL_STORAGE.LOCAL_KEY, JSON.stringify(this));
  }

  static fromLocalStorage(data = null) {
    let source = data;
    let result = new LocalStorage();
    if (!data) {
      source = getLocalInfo(LOCAL_STORAGE.LOCAL_KEY);
    }
    if (source && typeof (source) === "string") {
      try {
        source = JSON.parse(source);
      } catch (error) {
        source = null;
      }
    }
    if (source && typeof (source) === "object") {
      for (let key in source) {
        result[key] = source[key];
      }
    }
    return result;
  }

  static getLocalInfo(type) {
    const data = LocalStorage.fromLocalStorage();
    return data[type];
  }

  static setLocalInfo(type, data) {
    let newData = LocalStorage.fromLocalStorage();
    newData[type] = data;
    if (typeof window.setLocal === "function") {
      window.setLocal({
        [LOCAL_STORAGE.VALUE]: newData
      })
    }
    newData.saveToLocalStorage();
  }

  static getUserToken() {
    return LocalStorage.getLocalInfo(LOCAL_STORAGE.TYPE.token);
  }

  static setUserToken(token) {
    LocalStorage.setLocalInfo(LOCAL_STORAGE.TYPE.token, token);
  }

  static getUserId() {
    return LocalStorage.getLocalInfo(LOCAL_STORAGE.TYPE.userId);
  }

  static setUserId(userId) {
    LocalStorage.setLocalInfo(LOCAL_STORAGE.TYPE.userId, userId);
  }

  // set user data token, user id
  static setLoginInfo({ token, userId } = {}) {
    LocalStorage.setUserToken(token);
    LocalStorage.setUserId(userId);
  }

  static logout(cb = null) {
    LocalStorage.setLoginInfo();
    if (cb) window.location.href = cb;
  }
}
