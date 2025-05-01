// src/messages/dto/create-message.dto.ts

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum MessageType {
    Text = 'text',
    Image = 'image',
}

export class CreateMessageRequest {
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    @IsNotEmpty()
    receiverId: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsEnum(MessageType)
    type: MessageType = MessageType.Text;
}
