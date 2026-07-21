import { Request, Response } from "express";
import Room from "../models/Room.model";

class roomService {

    async createRoom(name:string){
    if(name){
        const existingRoom = await Room.findOne({name})
        if(existingRoom){
           return existingRoom
        }

        const createRoom = await Room.create({name})
        return createRoom
    }
    const randomName= `Room_${ Math.floor(Math.random()*1000)}`
    const createRoom = await Room.create({name:randomName})
    return createRoom
    }
    
}




export default new roomService()