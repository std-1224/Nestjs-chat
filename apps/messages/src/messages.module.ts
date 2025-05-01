import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MESSAGING_SERVICE } from './constants/services';
import { Message, MessageSchema } from './schemas/message.schema';
import * as Joi from 'joi';
import { MessageRepository } from './message.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/messages/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RmqModule.register({
      name: MESSAGING_SERVICE
    }),
    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService,MessageRepository],
})
export class MessagesModule { }
