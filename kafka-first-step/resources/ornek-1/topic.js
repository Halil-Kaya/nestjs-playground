const {Kafka} = require('kafkajs');

createTopic()

async function createTopic(){
    //Admin stuff...
    try{

        const kafka = new Kafka({
            clientId :'kafka_ornek_1',
            brokers : ['172.20.16.49:9092']
        })
        const admin = kafka.admin()
        console.log("Kafka Broker'a baglaniliyor!")
        await admin.connect()
        console.log("Kafka Broker'a baglanti basarili!,Topic uretilecek")
        await admin.createTopics({
            topics : [
                {
                    topic : 'Logs',
                    numPartitions  : 1 
                },
                {
                    topic : 'Logs2',
                    numPartitions  : 2 
                }
            ]
        })
        console.log("Topic Basarili bir sekilde olusturulmustur...")
        await admin.disconnect()
    }catch(e){
        console.log("Bir Hata Olustu ",e)
    }finally{
        process.exit(0)
    }
}