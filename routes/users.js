// 1. 라우터를 만드려고 express에서 라우터를 받아옴.
import express from 'express';
import mongoose from 'mongoose';
import Users from '../schemas/user.js';

// 2. router 생성
const router = express.Router();

/**회원 전체 조회 API
 * - get 메서드 사용, 응답 코드는 200, http만 사용, 반환되는 형식은 모두 json,
 * - 회원 전체는 3명 이상 99명 이하로 DB에 등록되어있어야한다.
 */
router.get('/user', async (req, res, next) => {
  try {
    const users = await Users.find();
    // 회원 수 조건 추가
    if (users.length < 3 || users.length > 99) {
      return res.status(400).json({ error: '회원 정보 조건이 아닙니다.' });
    }

    const UsersList = users.map((user) => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      pw: user.pw,
    }));

    res.status(200).json(UsersList);
  } catch (error) {
    res.status(500).json({ error: '회원 조회에 실패하였습니다.' });
  }
});

/** 회원 등록 API*/
router.post('/user', async (req, res, next) => {
  const { name, email, pw } = req.body;

  const user = await Users.findOne({ email }).exec();
  if (user) {
    return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
  }

  const createdUser = await Users.create({
    userId: new mongoose.Types.ObjectId(), // 새 ObjectId 생성하여 userId에 저장
    name,
    email,
    pw,
  });

  return res.status(200).json({ message: '회원 가입이 완료되었습니다.' });
});

/** 회원 조회 API
 * - userId를 획득해 개인 조회한 후, 정보가 일치하는지 검사
 */
router.get('/user/:userid', async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await Users.findOne({ userId: userid }).exec();

    const FindUser = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      pw: user.pw,
    };

    return res.status(200).json(FindUser);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
});

// app.js에서 사용하기 위해 내보내는 코드
export default router;
