const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달
  const { email, password} = req.body
  const userInfo=await user.findOne({where : {email,password}})

  // if(!userInfo) return res.status(404).json({data:null})
  if(!userInfo) return res.status(404).send('invalid user')
  // 여기서는 이유를 모르겠으나 json으로 메시지를 넘겨주면 오류가 뜸

  delete userInfo.dataValues.password

  const accessToken = generateAccessToken(userInfo.dataValues)
  sendAccessToken(res,accessToken)
};
