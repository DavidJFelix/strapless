import {
  createToken,
  checkToken,
  resetToken,
  deleteToken,
} from '@octokit/oauth-app'
import {NextApiResponse, NextApiRequest} from 'next'
import {config} from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const credentials = {
    clientId: config.github.clientId,
    clientSecret: config.github.clientSecret,
  }

  if (req.method === 'POST') {
    const {token, scopes} = await createToken({
      ...credentials,
      state: req.body.state as string,
      code: req.body.code as string,
    })

    return res.json({token, scopes})
  }

  const token = (req.headers.authorization || '').substr('token '.length)
  if (!token) {
    res.status(400)
    return res.json({
      error: '"Authorization" header is required',
    })
  }

  switch (req.method) {
    case 'GET':
    case 'PATCH':
    case 'DELETE':
      const method = {
        GET: checkToken,
        PATCH: resetToken,
        DELETE: deleteToken,
      }[req.method]
      try {
        const result = await method({
          ...credentials,
          token,
        })

        if (!result) {
          res.status(204)
          return res.end()
        }

        return res.json(result)
      } catch (error) {
        if (error.status === 404) {
          res.status(400)
          return res.json({
            error: `Invalid authentication`,
          })
        }

        throw error
      }
      break
    default:
      res.status(400)
      return res.json({
        error: `${req.method} is not supported`,
      })
  }
}
