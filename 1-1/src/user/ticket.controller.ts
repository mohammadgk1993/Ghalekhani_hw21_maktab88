import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TicketService } from "./ticket.service";


@Controller('ticket')
export default class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    getTickets() {
        return this.ticketService.findAllTickets();
    }

    @Post()
    createUser(@Body() body) {
      return this.ticketService.createTicket(body);
    }

    @Get(':id')
    readTicket(@Param('id') id: string) {
      return this.ticketService.findTicketById(id);
    }

    @Patch(':id')
    updateTicket(@Param('id') id: string, @Body() updateInfo) {
      return this.ticketService.updateTicket(id,updateInfo)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
      return this.ticketService.deleteTicket(id);
    }
}