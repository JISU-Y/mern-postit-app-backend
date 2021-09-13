// backend에 id 가 저장되고, sign in이 되었으면
// user가 모든 동작을 실행할 수 있도록 권한을 부여해주는 중간에 해야할 것
// middleware는 Routes에서 사용한다
import jwt from "jsonwebtoken";

// An user wants to like a post => click the like button => auth middleware (next) => like controller

// controller 처럼 req, res가 있고 추가로 next가 있다 (이걸 다음 단으로 넘김)
const auth = async (req, res, next) => {
  try {
    // sign in 이나 sign up을 하면 token이 생성이 되는데
    // 그 token이 valid한지 알아야 하기 때문에 token을 활용한다
    // autorization이 Bearer 한 칸 띄고 token으로 구성되어 있기 때문에 split으로 가져옴
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // token의 길이가 500 아래이면 customAuth 이상이면 googleAuth

    let decodedData; // token에서 가져오는 data 선언

    if (token && isCustomAuth) {
      // token을 이용해서 각각의 맞는 user의 정보를 가져옴
      decodedData = jwt.verify(token, "test"); // "test" (secret) => controller에서 생성했던 것과 동일해야함

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub은 google에서 user를 구분하는 용도
    }

    // 이제 User가 원하는 동작을 할 수 있는 권한이 부여된 것
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth; // 이렇게 해서 Routes로 넘김
