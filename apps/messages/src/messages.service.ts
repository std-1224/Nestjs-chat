import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MESSAGING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMessageRequest } from './dto/create-message.request';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessageRepository,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>
  ) { }

  async sendMessage(request: CreateMessageRequest, authentication: string) {
    const session = await this.messageRepository.startTransaction();

    try {
      const message = await this.messageRepository.create({
        senderId: authentication,
        receiverId: request.receiverId,
        content: request.content,
        type: request.type,
      }, { session });

      return message;

    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getLastMessagesWithUsers(userId: string): Promise<any[]> {
    return this.messageModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$conversationId",
          lastMessage: { $first: "$$ROOT" }
        }
      }
    ]);

  }

  async getConversationMessages(conversationId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.messageModel.find({ conversationId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
