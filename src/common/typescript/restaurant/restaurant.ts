export interface IUpdateRestaurant {
  $inc: {
    nbRestaurant: number;
    nbGrade: number;
  };
}
