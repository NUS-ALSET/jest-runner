# jest-runner
Run jest on node files in AWS lambda

# Prerequisite
Add github access token in script of `index.html` file

`
    this._accessToken = '<github_access_token>';
`
#step to deploy
`npm i`
`serverless config credentials --provider aws --key <API KEY> --secret <SECRET KEY>`
`npm run deploy`