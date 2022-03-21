const {Kafka} = require('kafkajs');

createConsumer()

async function createConsumer(){
    try{
        const kafka = new Kafka({
            clientId :'kafka_ornek_1',
            brokers : ['192.168.1.112:9092']
        })
        const consumer = kafka.consumer({
            groupId:'ornek_1_cg_1'
        })
        console.log("Consumer'a baglaniliyor!")
        await consumer.connect()
        console.log("Consumer'a baglanti basarili!")
        
        //Consumer Subscribe 
        await consumer.subscribe({
            topic : 'Logs',
            fromBeginning : true
        })
        let id = 0

        await consumer.run({
            eachMessage : async result =>{
                console.log(`${id}. Gelen Mesaj ${result.message.value} : Partition => ${result.partition}`)
                id++
            }
        })


    }catch(e){
        console.log("Bir Hata Olustu ",e)
    }
}