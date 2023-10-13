import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Restaurant', timestamps: true })
export class Restaurant extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop()
  photos: string[];

  @Prop({ type: Types.ObjectId, ref: 'tags', required: true })
  tag: Types.ObjectId[];

  @Prop({
    required: true,
  })
  private: boolean;

  @Prop({
    type: Number,
    validate: {
      validator: (value: number) => value >= 1 && value <= 5,
      message: 'Rating must be between 0 and 5',
    },
    required: true,
  })
  rating: number;

  @Prop({
    required: true,
    type: Object,
    location: {
      latitude: { type: String },
      longitude: { type: String },
    },
  })
  location: {
    latitude: string;
    longitude: string;
  };

  @Prop({
    required: true,
  })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const RestaurantModel = SchemaFactory.createForClass(Restaurant);
