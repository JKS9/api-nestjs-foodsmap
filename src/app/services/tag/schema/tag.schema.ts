import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Tag', timestamps: true })
export class Tag extends Document {
  @Prop()
  tag: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const TagModel = SchemaFactory.createForClass(Tag);
