import { Injectable } from "@nestjs/common";
import { TicketDocument } from "./schemas/ticket.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TicketService {

    constructor(@InjectModel('Ticket') private TicketModel: Model<TicketDocument>) {}

    public async findAllTickets(): Promise<TicketDocument[]> {
        return this.TicketModel.find({});
    }

    public async createTicket(ticketInfo): Promise<TicketDocument> {
        return this.TicketModel.create(ticketInfo)
    }

    public async findTicketById(_id: string): Promise<TicketDocument> {
        return await this.TicketModel.findById(_id);
    }

    public async updateTicket(_id: string, updateInfo): Promise<TicketDocument> {
        return this.TicketModel.findByIdAndUpdate(_id, updateInfo);
    }

    public async deleteTicket(_id: string): Promise<TicketDocument> {
        return this.TicketModel.findByIdAndDelete(_id);
    }
}