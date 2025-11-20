import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const MONGO_URL = process.env.MONGO_URL;

async function cleanDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ Conectado a MongoDB');

    // Limpiar todas las colecciones
    await mongoose.connection.collection('adoptions').deleteMany({});
    console.log('🗑️  Adoptions eliminadas');

    await mongoose.connection.collection('pets').deleteMany({});
    console.log('🗑️  Pets eliminadas');

    await mongoose.connection.collection('users').deleteMany({});
    console.log('🗑️  Users eliminados');

    console.log('✨ Base de datos limpiada exitosamente');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanDB();