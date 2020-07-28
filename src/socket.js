const AppConfig = {
    PROTOCOL: "ws:",
    HOST: "//localhost"
}

const Singleton = (function () {
    let instance;

    function createInstance() {
        const socket = new WebSocket("ws://127.0.0.1:8080/event");
        return socket;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Singleton;