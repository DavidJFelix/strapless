import * as fs from 'fs'
import * as path from 'path'

import {NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import * as jwt from 'jsonwebtoken'
import * as handlebars from 'handlebars'
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

interface GithubSession {
  user: {
    login: string
    name: string
  }
  emails: {
    email: string
    primary: boolean
  }[]
  token: string
}

function getSession(req: NextApiRequest): GithubSession {
  // FIXME: actually make sure this exists
  const session: GithubSession = JSON.parse(
    Buffer.from(req.cookies['strapless.auth.session'], 'base64').toString(
      'utf-8',
    ),
  )
  return session
}

interface TemplateParams {
  githubName: string
  githubEmail: string
  githubUsername: string
  githubToken: string
}

export const strapHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader('content-type', 'application/octet-stream')
  const templatePath = path.resolve('./templates/strapless.sh.hbs')
  const template = handlebars.compile<TemplateParams>(
    fs.readFileSync(templatePath).toString('utf8'),
    {strict: true},
  )

  const session = getSession(req)

  const renderedTemplate = template({
    githubName: session.user.name,
    // FIXME: make this less janky
    githubEmail: (session.emails.find((email) => email.primary) || {email: ''})
      .email,
    githubUsername: session.user.login,
    githubToken: session.token,
  })

  return res.send(renderedTemplate)
}

export default AuthRedirectMiddleware(strapHandler)
