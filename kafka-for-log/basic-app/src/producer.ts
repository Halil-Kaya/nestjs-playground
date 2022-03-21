const {Kafka} = require('kafkajs');

export default class Producer{

    private static producer;

    static async getProducer(){
        if(this.producer){
            return this.producer
        }
        const kafka = new Kafka({
            clientId :'kafka_ornek_1',
            brokers : ['192.168.1.112:9092']
        })
        this.producer = kafka.producer()
        await this.producer.connect()
        return this.producer
    }
}