const AWS = require('aws-sdk')
const jwt = require('jsonwebtoken')
const middy = require('middy')
const { cors, jsonBodyParser, httpErrorHandler } = require('middy/middlewares')


const generateToken = function (email) {
  return jwt.sign({
    email: email
  }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
}

const sendEmail = function (email, token, context) {
  const ses = new AWS.SES({
    region: process.env.SES_REGION
  })
  const eParams = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Data: `<strong>Log In</strong><br>
Hi!<br>
We received a request to log in to your Daily Idea account ${email}. Click this button to log in: <a href="https://${process.env.DOMAIN_NAME}/auth/verify?code=${token}&email=${email}">Login</a><br>

Alternatively visit this url in a browser: https://${process.env.DOMAIN_NAME}/auth/verify?code=${token}&email=${email} <br>
If you did not request this, you can ignore this email! The only way anybody can log in to your account is via links sent to your email (${email}). 
`
        }
      },
      Subject: {
        Data: `[Daily Idea] Log in link for ${email}`
      }
    },
    //environment variable
    Source: process.env.SOURCE_EMAIL
  }

  ses.sendEmail(eParams, function (err, data) {
    if (err) {
      console.log('error', err)
      // context.fail(err)
    } else {
      console.log('success')
      // context.succeed(event)
    }
  })
}

// This is your common handler, no way different than what you are used to do every day
// in AWS Lambda
const sendMail = (event, context, callback) => {
  const { email } = event.body
  console.log('generating log token', email)
  const token = generateToken(email)
  sendEmail(email, token, context)
  return callback(null, {
    body: JSON.stringify({ result: 'success' })
  })
}

const handler = middy(sendMail)
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .use(cors())

module.exports = { handler }