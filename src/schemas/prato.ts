import mongoose, { Schema, Document } from 'mongoose';
import Restaurante from './restaurante';

export interface IPrato extends Document {
  nome: string;
  preco: number;
  restaurante: any;
}

const PratoSchema: Schema = new Schema({
  nome: { type: String, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model<IPrato>('Prato', PratoSchema);