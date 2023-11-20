import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const client = nats.connect('ticketing', 'abc', {url: 'http://localhost:4222'})

client.on('connect', async () => {
    console.log('Hey its connected')

    const publisher = new TicketCreatedPublisher(client)

    try {
        await publisher.publish({
            id: '20',
            title: 'Concert ticket',
            price: 20
        })
    } catch (error) {
        console.error(error)
    }


})