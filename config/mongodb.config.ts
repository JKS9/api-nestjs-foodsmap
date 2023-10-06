interface IMOngoDbConfig {
  useNewUrlParser: boolean;
  maxPoolSize: number;
  minPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  family: number;
}

export const option: IMOngoDbConfig = {
  useNewUrlParser: true,
  maxPoolSize: 100,
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
