import {Stan, Message} from 'node-nats-streaming';
import { Event } from './event';

export abstract class Listener <T extends Event>{
    //stan is a name by which NATS community calls client
    private client:Stan;
    abstract qGroupName:string;
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], msg: Message):void;
    protected ackWait:number = 5 * 1000;

    constructor(client:Stan){
        this.client = client;
    }

    subscriptionOptions(){
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.qGroupName);
    }

    listen(){
        const subscrption = this.client.subscribe(
            this.subject,
            this.qGroupName,
            this.subscriptionOptions()
        );
        subscrption.on('message', (msg: Message) => {
            console.log(`Message recieved ${this.subject} / ${this.qGroupName}`)
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);

        })

        
    }

    parseMessage(msg:Message){
        const data = msg.getData();
        return typeof data === 'string'
        ? JSON.parse(data)
        //in case the data has been send as a buffer and not as a string
        : JSON.parse(data.toString('utf-8'))
    }
}
