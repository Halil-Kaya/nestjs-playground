const {Kafka} = require('kafkajs');

createProducer()

async function createProducer(){
    try{
        const kafka = new Kafka({
            clientId :'kafka_ornek_1',
            brokers : ['192.168.1.112:9092']
        })
        const producer = kafka.producer()
        console.log("Producer'a baglaniliyor!")
        await producer.connect()
        console.log("Producer'a baglanti basarili!")
        const message_result = await producer.send({
            topic : 'Logs',
            messages : [
                {
                    value : 'Bu bir test Log mesajidir...',
                    partition : 0
                }
            ]
        }) 
        console.log("Gonderim islemi basarilidir. " ,message_result)
        await producer.disconnect()
    }catch(e){
        console.log("Bir Hata Olustu ",e)
    }finally{
        process.exit(0)
    }
}