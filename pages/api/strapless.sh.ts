import fs from 'fs'
import path from 'path'

import {NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import * as jwt from 'jsonwebtoken'
import {config} from './config'

function AuthRedirectMiddleware(next: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      req.cookies['strapless.auth.session'] &&
      jwt.verify(
        Buffer.from(req.cookies['strapless.auth.session'], 'base64').toString(
          'utf-8',
        ),
        config.auth.secret,
      )
    ) {
      return next(req, res)
    } else {
      res.setHeader(
        'Set-Cookie',
        `strapless.auth.callbackRedirectUrl=${req.url}; ${
          req.headers.host ? `Domain=${req.headers.host};` : ''
        }Path=/; Secure; Http-Only; Same-Site=Strict;`,
      )
      res.redirect('/api/oauth/github/login')
      return res.end()
    }
  }
}

export const strapHandler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader('content-type', 'application/octet-stream')
  const templatePath = path.resolve('./templates/strapless.sh.hbs')
  const template = fs.readFileSync(templatePath)
  return res.send(template)
}

export default AuthRedirectMiddleware(strapHandler)
