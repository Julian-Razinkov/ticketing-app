import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

const clientID = randomBytes(4).toString('hex')
const client = nats.connect('ticketing', clientID, {url: 'http://localhost:4222'})

client.on('connect', () => {
    console.log('Hey its connected')

    client.on('close', () => {
        console.log('Nats connection closed');
        process.exit()
    })

    new TicketCreatedListener(client).listen()
})

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());




