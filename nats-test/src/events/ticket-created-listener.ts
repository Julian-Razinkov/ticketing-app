import { Listener } from "./listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener <TicketCreatedEvent>{
    //readonly is something similar to final keyword in other languages
    readonly subject = Subjects.TicketCreated;

    qGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log(`Event data`, data.id);
        console.log(`Event data`, data.price);
        console.log(`Event data`, data.title);
        msg.ack();
    }
}