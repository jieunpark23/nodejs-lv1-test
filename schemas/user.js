import mongoose from 'mongoose';

// 회원(user)에 대한 정보를 나타내는 스키마를 정의 조건 4가지
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
});

// 위에서 정의한 스키마를 이용하여 'Users'라는 이름의 모델을 생성합니다.
export default mongoose.model('Users', userSchema);
