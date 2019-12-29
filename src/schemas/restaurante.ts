import { Schema, model, Document } from 'mongoose'

interface RestauranteInterface extends Document{
    nome ?: {
        type: String,
        require: true,
        }
}

const RestauranteSchema = new Schema({
    nome:{
        type: String,
        require: true,
        }
    })

export default model<RestauranteInterface>('Restaurante', RestauranteSchema)