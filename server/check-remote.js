import mongoose from 'mongoose';

const REMOTE_URI = 'mongodb+srv://oladipomosun05_db_user:lACTcaY0b0ExLl10@cluster0.aulccqs.mongodb.net/privacy_framework?retryWrites=true&w=majority';

async function check() {
    console.log('🔌 Connecting to remote database...');
    const conn = await mongoose.createConnection(REMOTE_URI).asPromise();
    console.log('✅ Connected.');

    const collections = await conn.db.listCollections().toArray();
    for (const col of collections) {
        const count = await conn.collection(col.name).countDocuments({});
        console.log(`Collection: "${col.name}" has ${count} documents.`);
        if (col.name === 'products') {
            const samples = await conn.collection(col.name).find({}).limit(2).toArray();
            console.log('Sample products:', JSON.stringify(samples, null, 2));
        }
    }
    await conn.close();
}

check().catch(console.error);
