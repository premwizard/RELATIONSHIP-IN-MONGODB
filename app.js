const mongodb = require('mongodb');
const { MongoClient} = mongodb;

(async () => {
    try {
       
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const database = client.db('shop');

        if (!database) {
            console.log('Database not connected');
            return;
        } else {
            console.log('Database connected');
        }

       
        const orders = await database.collection('orders').aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_ids',
                    foreignField: '_id',
                    as: 'order_products' 
                }
            }
        ]).toArray();

        console.log(JSON.stringify(orders, null, 2));

       
        client.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();
