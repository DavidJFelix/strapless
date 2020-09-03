import {getAuthorizationUrl} from '@octokit/oauth-app'
import {NextApiRequest, NextApiResponse} from 'next'
import {config} from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = await getAuthorizationUrl({
    clientId: config.github.clientId,
    state: req.query.state as string,
    scopes:
      typeof req.query.scopes === 'string' ? req.query.scopes.split(',') : [],
    allowSignup: req.query.allowSignup === 'true' ? true : false,
    redirectUrl: req.query.redirectUrl as string,
  })

  res.writeHead(302, {location: url})
  return res.end()
}
