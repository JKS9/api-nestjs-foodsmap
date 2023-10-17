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

  @Prop({ default: 0 })
  nbFavorites: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Restaurant' }] })
  favorites: Types.ObjectId[];

  @Prop({ default: 0 })
  nbRestaurant: number;

  @Prop({ default: 0 })
  nbGrade: number;

  @Prop({ default: 0 })
  averageGrades: number;

  @Prop({ default: 0 })
  nbUserFollowingYou: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followingYou: Types.ObjectId[];

  @Prop({ default: 0 })
  nbUserYouFollow: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: Types.ObjectId[];

  @Prop({
    type: Object,
    default: {
      notifications: {
        newRestaurantFriend: false, // Valeurs par défaut pour les sous-champs
        gradeRestaurant: false,
        newUser: false,
        updateFoodsmap: false,
        classicNews: false,
      },
      darkMode: false,
      private: true,
      language: 'en', // Valeur par défaut pour la chaîne de caractères
    },
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
