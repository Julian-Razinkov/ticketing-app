"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.qGroupName);
    }
    listen() {
        const subscrption = this.client.subscribe(this.subject, this.qGroupName, this.subscriptionOptions());
        subscrption.on('message', (msg) => {
            console.log(`Message recieved ${this.subject} / ${this.qGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            //in case the data has been send as a buffer and not as a string
            : JSON.parse(data.toString('utf-8'));
    }
}
exports.Listener = Listener;
