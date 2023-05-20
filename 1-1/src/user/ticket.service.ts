import { Injectable } from "@nestjs/common";
import { TicketDocument } from "./schemas/ticket.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TicketService {

    constructor(@InjectModel('Ticket') private TicketModel: Model<TicketDocument>) {}

    public async findAllTickets(): Promise<TicketDocument[]> {
        return this.TicketModel.find({}).populate("createdBy",{_id:0,__v:0,createdAt:0,updatedAt:0});
    }

    public async createTicket(ticketInfo): Promise<TicketDocument> {
        return this.TicketModel.create(ticketInfo)
    }

    public async findTicketById(_id: string): Promise<TicketDocument> {
        return await this.TicketModel.findById(_id).populate("createdBy");
    }

    public async updateTicket(_id: string, updateInfo): Promise<TicketDocument> {
        return this.TicketModel.findByIdAndUpdate(_id, updateInfo);
    }

    public async deleteTicket(_id: string): Promise<TicketDocument> {
        return this.TicketModel.findByIdAndDelete(_id);
    }
}