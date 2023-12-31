import { Stan } from "node-nats-streaming";
import { Event } from "./event";
export declare abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client;
    constructor(client: Stan);
    publish(data: T['data']): Promise<void>;
}
