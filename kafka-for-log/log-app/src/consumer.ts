const {Kafka} = require('kafkajs');

export default class Consumer{

    private static consumer;

    static async getConsumer(){
        console.log("getConsumer Calistirildi")
        if(this.consumer){
            return this.consumer
        }
        console.log("kafkaya baglaniliyor")
        const kafka = new Kafka({
            clientId :'kafka_ornek_1',
            brokers : ['192.168.1.112:9092']
        })
        console.log("kafkaya baklanildi")
        this.consumer = kafka.consumer({
            groupId:'ornek_1_cg_1'
        })
        await this.consumer.connect()
        return this.consumer
    }
}