const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url , { useNewUrlParser: true });

let users = [{name: 'bob', age: 34}, {name: 'ang', age: 34}, {name: 'taras', age: 35}, {name: 'nike', age: 32}, {name: 'andrew', age: 44}];
mongoClient.connect(function (err, client) {

    if(err) return console.log(err);

   const  db = client.db("testdb");
   const collection =  db.collection('test');
   // let user = { name: "tom", age: 23};
   //запис даних в базу
   // collection.insertMany(users, function (err, res) {
   //
   //     if(err){
   //         return console.log(err);
   //     }
   //      console.log(res.ops);
   //     client.close();
   // });
//   читання з бази
//     collection.find().toArray((err, res)=>{
//         console.log(res);
//         client.close();
//     });
//    видалення
//     collection.deleteMany({age: 34}, (err, res)=>{
//        console.log(res);
//        client.close();
//     })
//     collection.drop((err, res)=>{
//         console.log(res);
//         client.close();
//     })
//оновлення даних

        // collection.findOneAndUpdate(
    // collection.updateMany(
    //         {age: 34},
    //         {$set: {age: 21}},
    //         { returnOriginal: false},
    //         (err, res)=> {
    //         console.log(res);
    //         client.close();
    //
    //     })

});

