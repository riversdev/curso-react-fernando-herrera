import { request, response } from 'express'
import { EventModel } from '../models/EventModel.js'

export const getEvents = async (req = request, res = response) => {
    try {
        const events = await EventModel.find().populate('user', 'name') // el segundo argumento de populate puede recibir 'name email' e incluiria esos dos campos en user

        res.status(200).json({ ok: true, events })
    } catch (error) {
        res.status(500).json({ ok: true, msg: 'Error en el servidor' })
    }
}

export const postEvent = async (req = request, res = response) => {
    const event = new EventModel(req.body)

    try {
        event.user = req.uid

        const savedEvent = await event.save()

        res.status(201).json({ ok: true, event: savedEvent })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const putEvent = async (req = request, res = response) => {
    const eventId = req.params.id // el modelo tambien verifica automaticamente en el findById si el formato del id es correcto

    try {
        const event = await EventModel.findById(eventId)

        if (!event) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' })

        // solo puede editarlo el mismo usuario que lo creo
        if (event.user.toString() !== req.uid) return res.status(401).json({ ok: false, msg: 'No tiene permisos para editar este evento' })

        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, { ...req.body, user: req.uid }, { new: true }) // new: true - hace retornal el evento actualizado, sino se retorna el documento anterior

        res.status(200).json({ ok: true, event: updatedEvent })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}

export const deleteEvent = async (req = request, res = response) => {
    const eventId = req.params.id

    try {
        const event = await EventModel.findById(eventId)

        if (!event) return res.status(404).json({ ok: false, msg: 'Evento no encontrado' })

        if (event.user.toString() !== req.uid) return res.status(401).json({ ok: false, msg: 'No tiene permisos para eliminar este evento' })

        await EventModel.findByIdAndDelete(eventId)

        res.status(200).json({ ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error en el servidor' })
    }
}