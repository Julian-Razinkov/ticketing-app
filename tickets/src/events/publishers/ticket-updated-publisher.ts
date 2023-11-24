import {Publisher} from '../../../../common/src/events/publisher'
import {Subjects} from '../../../../common/src/events/subjects'
import {TicketUpdatedEvent} from '../../../../common/src/events/ticket-updated-event'

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated
    
}