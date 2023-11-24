import nats, {Stan} from 'node-nats-streaming';


//Singleton class to acces nats client from different files
class NatsWrapper{
    private _client?: Stan;

    
    public get client() {
        if(!this._client){
            throw new Error('can acces nats client before connecting')
        }
        return this._client
    }
    

    connect(clusterId:string, clientId:string, url:string){
        this._client = nats.connect(clusterId, clientId, {url});
        

        return new Promise<void> ((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Nats is connected');
                resolve();
            });

            this.client.on('error', (error) => {
                reject(error)
            })
        })  
    
    }
}

export const natsWrapper = new NatsWrapper()