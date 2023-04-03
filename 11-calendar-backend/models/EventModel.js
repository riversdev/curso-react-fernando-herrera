import { model, Schema } from 'mongoose'

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

eventSchema.method('toJSON', function () {
    const { _id, __v, ...object } = this.toObject()

    object.id = _id

    return object
})

export const EventModel = model('Event', eventSchema)