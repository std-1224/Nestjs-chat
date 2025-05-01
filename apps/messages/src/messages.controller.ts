import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '@app/common';
import { CreateMessageRequest } from './dto/create-message.request';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Body() request:CreateMessageRequest,@Req() req:any){
    return this.messagesService.sendMessage(request,req?.user?.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMessagesByUsers(@Req() req: any){
    const user = req.user;
    return this.messagesService.getLastMessagesWithUsers(user.userId);
  }

  @Get('/:conversationId')
  @UseGuards(JwtAuthGuard)
  getConversationMessages(
    @Param('conversationId') conversationId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.messagesService.getConversationMessages(conversationId, +page, +limit);
  }
}
