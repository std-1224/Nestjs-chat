import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


enum MessageType {
    Text = 'text',
    Image = 'image',
  }

@Schema({versionKey :false})
export class Message extends AbstractDocument{
    @Prop({type : mongoose.Schema.Types.ObjectId,ref : 'User',required:true})
    senderId : string;

    @Prop({type : mongoose.Schema.Types.ObjectId,ref : 'User',required:true})
    receiverId : string;

    @Prop({required :true})
    content :string;

    @Prop({type: String,default :MessageType.Text }) // enum:Object.values(MessageTypes),
    type :string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);