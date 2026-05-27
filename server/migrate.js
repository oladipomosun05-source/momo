import mongoose from 'mongoose';

const LOCAL_URI = 'mongodb://localhost:27017/privacy_framework';
const REMOTE_URI = 'mongodb+srv://oladipomosun05_db_user:lACTcaY0b0ExLl10@cluster0.aulccqs.mongodb.net/privacy_framework?retryWrites=true&w=majority';

async function migrate() {
    console.log('🔄 Initializing database migration...');
    
    // Connect to Local DB
    console.log(`🔌 Connecting to local database: ${LOCAL_URI}...`);
    const localConnection = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('✅ Connected to Local MongoDB.');

    // Connect to Remote DB
    console.log(`🔌 Connecting to remote database: ${REMOTE_URI}...`);
    const remoteConnection = await mongoose.createConnection(REMOTE_URI).asPromise();
    console.log('✅ Connected to Remote MongoDB Atlas.');

    // Get list of all collections in the local database
    const collections = await localConnection.db.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections locally.`);

    for (const colInfo of collections) {
        const name = colInfo.name;
        // Skip system collections
        if (name.startsWith('system.')) continue;

        console.log(`\n📦 Migrating collection: "${name}"...`);

        // Fetch all documents from local
        const localDocArray = await localConnection.collection(name).find({}).toArray();
        console.log(`   - Retrieved ${localDocArray.length} documents from local.`);

        if (localDocArray.length === 0) {
            console.log(`   - Collection is empty. Skipping.`);
            continue;
        }

        // Clear existing remote documents to avoid duplicates
        console.log(`   - Clearing existing remote documents in "${name}"...`);
        await remoteConnection.collection(name).deleteMany({});

        // Insert documents to remote
        console.log(`   - Uploading ${localDocArray.length} documents to MongoDB Atlas...`);
        const result = await remoteConnection.collection(name).insertMany(localDocArray);
        console.log(`   - Successfully copied ${result.insertedCount} documents.`);
    }

    // Close connections
    await localConnection.close();
    await remoteConnection.close();
    console.log('\n🎉 Database migration completed successfully!');
}

migrate().catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
