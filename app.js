import express from 'express';
import connect from './schemas/index.js';
import UsersRouter from './routes/users.js';

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi! Node.js level1 Pass!' });
});

app.get('/', (req, res) => {
  return res.json({ message: 'Hi! Node.js level1 Pass!' });
});

app.use('/api', [router, UsersRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
