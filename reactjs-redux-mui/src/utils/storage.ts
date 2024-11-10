const ClientStorage = class {
  set(key: string, value: any) {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("localStorage", e);
    }
  }

  get(key: string) {
    if (typeof localStorage === "undefined") return;
    try {
      let dataValue = localStorage?.getItem(key);
      dataValue = dataValue ? JSON.parse(dataValue) : "";
      return dataValue;
    } catch (e) {
      console.error("localStorage", e);
    }
  }

  remove(key: string) {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
  }

  clear() {
    if (typeof localStorage === "undefined") return;
    localStorage.clear();
  }
};

const clientStorage = new ClientStorage();

const SessionStorage = {
  set(key: string, value: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("sessionStorage", e);
    }
  },

  get(key: string) {
    try {
      const dataValue = sessionStorage.getItem(key)
        ? JSON.parse(sessionStorage.getItem(key) ?? "")
        : "";
      return dataValue;
    } catch (e) {
      console.error("sessionStorage", e);
    }
  },

  remove(key: string) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};

export { clientStorage, SessionStorage as sessionStorage };
