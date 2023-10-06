import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'User', timestamps: true })
export class User extends Document {
  @Prop()
  avartar: string;

  @Prop()
  pseudo: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: Types.ObjectId[];

  @Prop()
  nbFavorites: number;

  @Prop()
  nbRestaurant: number;

  @Prop()
  nbGrade: number;

  @Prop()
  averageGrades: number;

  @Prop()
  nbUserFollowingYou: number;

  @Prop()
  nbUserYouFollow: number;

  @Prop({
    notifications: {
      newRestaurantFriend: {
        type: Boolean,
        default: false,
      },
      gradeRestaurant: {
        type: Boolean,
        default: false,
      },
      newUser: {
        type: Boolean,
        default: false,
      },
      updateFoodsmap: {
        type: Boolean,
        default: false,
      },
      classicNews: {
        type: Boolean,
        default: false,
      },
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    private: {
      type: Boolean,
      default: true,
    },
    language: String,
  })
  setting: {
    notifications: {
      newRestaurantFriend: boolean;
      gradeRestaurant: boolean;
      newUser: boolean;
      updateFoodsmap: boolean;
      classicNews: boolean;
    };
    darkMode: boolean;
    private: boolean;
    language: string;
  };
}

export const UserModel = SchemaFactory.createForClass(User);
