/**
 * @class
 *
 * @name EventBus
 */

class EventBus {
    constructor() {
        this.observers = {};
    }

    /**
     * @param {string} eventName event name
     * @param {*} data
     */

    emitSync(eventName, data) {
        const eventObservers = this.observers[eventName] || [];

        for (let i = 0; i < eventObservers.length; i++) {
            eventObservers[i](data);
        }
    }

    /**
     *
     * @param {string} eventName event name
     * @param {Function} observer
     */

    on(eventName, observer) {
        let events = eventName;

        if (!Array.isArray(events)) {
            events = [events];
        }

        events.forEach((event) => {
            if (!this.observers[event]) {
                this.observers[event] = [];
            }
            this.observers[event].push(observer);
        });
    }

    /**
     * @async
     * @param {string} eventName event name
     * @param {*} data
     */

    async emitAsync(eventName, data) {
        const eventObservers = this.observers[eventName] || [];

        for (let i = 0; i < eventObservers.length; i++) {
            await eventObservers[i](data);
        }
    }
}

const eventBus = new EventBus();

module.exports = eventBus;
