import dotenv from "dotenv";
dotenv.config();

// mongoose 사용해서 mongoDB 연결
import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      {
        dbName: 'nodelv1_test', // 데이터베이스 명 설정하기
      }
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;
