import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurante extends Document {
  nome: string;
}

const RestauranteSchema: Schema = new Schema({
  nome: { type: String, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model<IRestaurante>('Restaurante', RestauranteSchema);


