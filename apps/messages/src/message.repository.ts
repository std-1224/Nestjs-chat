import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Message } from "./schemas/message.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MessageRepository extends AbstractRepository<Message>{
    protected readonly logger = new Logger(MessageRepository.name);

    constructor(
        @InjectModel(Message.name) messageModel: Model<Message>,
        @InjectConnection() connection : Connection
    ) {
        super(messageModel,connection);
    }
}