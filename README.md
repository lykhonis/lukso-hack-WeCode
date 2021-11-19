# WeCode

Teach &amp; Learn how to code.

## Authors

Volodymyr Lykhonis (@lykhonis)

## How it works

- Login or create new universal profile
- When logged in, there is LSP7 social token automatically created for a user
- Publish some lessons
- Take some lessons to earn author's social token
- When a lesson is taken, author earns own social token
- (Not completed) Redeem or use social tokens for perks

## How To Use

To try demo go [here](https://lukso-hack-we-code.vercel.app/). To watch a demo see [here](https://youtu.be/9jnbkvrBBVQ).

Uses `L14` Lukso test network.

To run locally:
```
npm run dev
```

- Login with new version of Universal Profile address or sign up to create one.
- Browse lessons on main page. Whener you like a lesson, take time to learn, when done hit `Complete & Claim`. You and creator of a lesson will earn creator's social token.
- Publish your own lessons by clicking on `Publish` button on top of the page. Write down a subject and content to publish it.
- Go to `Stats` to see earned tokens.
- In order to log out click `Sign Out` icon on left top of the main page or clean all cookies of the website and reload the page.

NOTE: lessons are stored via a simplistic JSON models on S3 bucket.

## Structure

#### `/contracts`

Deployed manually via Remix.

- `Token` - a social token contract to award and redeem tokens. Each token is auto created per a user of app.
- `TokenFactory` - a predetermined and deployed factory contract to locate created tokens and create new ones if needed.

TokenFactory contract is `0x4EB20f05B542D935318c7AA6A53B0B3a51B450A3`.

#### `/components`, `/pages`

Source code for UI and some business logic

#### `/hooks`, `/lukso`

Utilities to communicate with react state, contracts, ipfs, etc.

## Wishlist

- Secure contracts by utilizing key manager instead of admin of the website/app.
- Improve logs / events of tokens to scan for all tokens that has been awarded to particular account. This is what displayed on stats page.
