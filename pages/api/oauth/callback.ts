import {NextApiRequest, NextApiResponse} from 'next'
import {createToken} from '@octokit/oauth-app'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default async function CallbackHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {token} = await createToken({
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    state: req.query.state as string,
    code: req.query.code as string,
  })
  const userPromise = axios.get('https://api.github.com/user/', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  })
  const emailsPromise = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  })
  const [user, emails] = await Promise.all([userPromise, emailsPromise])
  const cookie = jwt.sign(
    {
      user: user.data,
      emails: emails.data,
      token,
    },
    process.env.SESSION_SECRET!,
  )

  res.setHeader(
    'Set-Cookie',
    `strapless.session=${Buffer.from(cookie, 'utf-8').toString('base64')}; ${
      req.headers.host ? `Domain=${req.headers.host}; ` : ''
    }Path="/"; Secure; Http-Only; Same-Site=Strict`,
  )
  res.redirect('/')
}
