export const config = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
  auth: {
    secret: process.env.AUTH_SECRET!,
  },
}
