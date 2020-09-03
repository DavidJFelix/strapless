import {deleteAuthorization} from '@octokit/oauth-app'
import {NextApiRequest, NextApiResponse} from 'next'
import {config} from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(400)
    return res.json({
      error: `${req.method} is not supported`,
    })
  }

  const credentials = {
    clientId: config.github.clientId,
    clientSecret: config.github.clientSecret,
  }

  const token = (req.headers.authorization || '').substr('token '.length)
  if (!token) {
    res.status(400)
    return res.json({
      error: '"Authorization" header is required',
    })
  }

  try {
    await deleteAuthorization({
      ...credentials,
      token,
    })

    res.status(204)
    return res.end()
  } catch (error) {
    if (error.status === 404) {
      res.status(400)
      return res.json({
        error: `Invalid authentication`,
      })
    }

    throw error
  }
}
