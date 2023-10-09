import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Token' })
export class Token extends Document {
  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  token: string;

  @Prop({ default: Date.now, expires: 180 * 24 * 60 * 60 })
  createdAt: Date;

  @Prop()
  revoked: boolean;
}

export const TokenModel = SchemaFactory.createForClass(Token);
