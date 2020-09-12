import {NextApiRequest, NextApiResponse} from 'next'
import {createToken} from '@octokit/oauth-app'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import {config} from '../../config'

export default async function CallbackHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {token} = await createToken({
    clientId: config.github.clientId,
    clientSecret: config.github.clientSecret,
    state: req.query.state as string,
    code: req.query.code as string,
  })
  const userPromise = axios.get('https://api.github.com/user', {
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
    config.auth.secret,
  )

  console.log(req.cookies)

  const redirectUrl =
    req.cookies['strapless.auth.callbackRedirectUrl'] !== undefined
      ? req.cookies['strapless.auth.callbackRedirectUrl']
      : '/'

  res.setHeader(
    'Set-Cookie',
    `strapless.auth.session=${Buffer.from(cookie, 'utf-8').toString(
      'base64',
    )}; ${
      req.headers.host ? `Domain=${req.headers.host}; ` : ''
    }Path="/"; Secure; Http-Only; Same-Site=Strict`,
  )

  res.setHeader(
    'Set-Cookie',
    `strapless.auth.callbackRedirectUrl="/"; ${
      req.headers.host ? `Domain=${req.headers.host};` : ''
    }Path="/"; Secure; Http-Only; Same-Site=Strict; Expires=${new Date().toUTCString()}`,
  )
  res.redirect(redirectUrl)
  return res.end()
}
