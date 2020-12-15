[![Deploy with Vercel](https://img.shields.io/badge/Deploy-with%20Vercel-blue?style=flat-square&logo=vercel)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdavidjfelix%2Fstrapless)

# Strapless

This is a hard fork of [MikeMcQuaid/Strap](https://github.com/mikemcquaid/strap).
Strap is a stable and reliable project which is well maintained.
This project is inpired by Strap and the initial codebase is exactly the same as strap. Strapless aims to leverage serverless technology and provide a bootstrap script for a greater diversity of development machines.

Strapless is a script and interface for bootstraping a minimal development system.
It does not assume you're any specific type of development but installs a minimal set of software which a developer will want.
It also sets sane defaults and triggers additional, customized, provisioning.

## Motivation

Replacing [Strap](https://github.com/mikemcquaid/strap) with a serverless, cros-platform tool.

## Features

- Disables Java in Safari (for better security)
- Enables the macOS screensaver password immediately (for better security)
- Enables the macOS application firewall (for better security)
- Adds a `Found this computer?` message to the login screen (for machine recovery)
- Enables full-disk encryption and saves the FileVault Recovery Key to the Desktop (for better security)
- Installs the Xcode Command Line Tools (for compilers and Unix tools)
- Agree to the Xcode license (for using compilers without prompts)
- Installs [Homebrew](http://brew.sh) (for installing command-line software)
- Installs [Homebrew Bundle](https://github.com/Homebrew/homebrew-bundle) (for `bundler`-like `Brewfile` support)
- Installs [Homebrew Services](https://github.com/Homebrew/homebrew-services) (for managing Homebrew-installed services)
- Installs [Homebrew Cask](https://github.com/caskroom/homebrew-cask) (for installing graphical software)
- Installs the latest macOS software updates (for better security)
- Installs dotfiles from a user's `https://github.com/username/dotfiles` repository. If they exist and are executable: runs `script/setup` to configure the dotfiles and `script/strap-after-setup` after setting up everything else.
- Installs software from a user's `Brewfile` in their `https://github.com/username/homebrew-brewfile` repository or `.Brewfile` in their home directory.
- A simple web application to set Git's name, email and GitHub token (needs authorised on any organisations you wish to access)
- Idempotent

## Out of Scope Features

- Enabling any network services by default (instead enable them when needed)
- Installing Homebrew formulae by default for everyone in an organisation (install them with `Brewfile`s in project repositories instead of mandating formulae for the whole organisation)
- Opting-out of any macOS updates (Apple's security updates and macOS updates are there for a reason)
- Disabling security features (these are a minimal set of best practises)
- Add phone number to security screen message (want to avoid prompting users for information on installation)

## Usage

If you trust me and have no problem with the defaults, use https://strapless.dev

If you'd rather host your own:

### Vercel

https://strapless.dev is hosted on Vercel. You can deploy this exact repository using the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdavidjfelix%2Fstrapless)

After you deploy the code, be sure to set the following environment variables in Vercel:

- `AUTH_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`


## Status

Stable and in active development.


## License

Licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
The full license text is available in [LICENSE.txt](https://github.com/MikeMcQuaid/strap/blob/master/LICENSE.txt).
