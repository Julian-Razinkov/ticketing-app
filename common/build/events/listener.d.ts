import { Stan, Message } from 'node-nats-streaming';
import { Event } from './event';
export declare abstract class Listener<T extends Event> {
    private client;
    abstract qGroupName: string;
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], msg: Message): void;
    protected ackWait: number;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
