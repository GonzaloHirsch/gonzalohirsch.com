---
dqid: 'semantic-release-gh-action-branch-protection'
title: 'Semantic Release and Branch Protection Rules | Gonzalo Hirsch'
description: "Semantic Release and branch protection rules in GitHub don't always work well. By using a GitHub App and a GitHub Action, you can effortlessly deploy a new version."
headline: 'Semantic Release and Branch Protection Rules'
excerpt: "Semantic Release and branch protection rules in GitHub don't always work well. By using a GitHub App and a GitHub Action, you can effortlessly deploy a new version."
date: '2023-09-09T12:00:00'
dateUpdated: '2023-09-11T12:00:00'
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--semantic-release-and-branch-protection-rules.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Semantic Release and Branch Protection Rules"'
  width: 1200
  height: 630
faq:
  - question: 'How does Semantic Release work?'
    answer: 'Semantic Release automates the package release workflow, including determining version numbers, generating a release note, and publishing the package. Not limited to those capabilities, you can extend Semantic Release using plugins. In automated, git-based environments, Semantic Release looks at previous releases and your commit message since the latest release to generate a changelog (using the Conventional Commit standard) and determine the following semantic version number (for a new git tag). When given credentials to publish packages, Semantic Release will also upload your package following your instructions.'
  - question: 'Why should I use Semantic Release?'
    answer: 'Automatic releases have become a standard in the industry in the past few years, much like Conventional Commits. No matter the scale at which you work, you will always benefit from an automated release pipeline. It includes generating a changelog, a new release on GitHub, a new git tag (with said version). Semantic Release provides a way to integrate that behavior into your continuous deployment and integration pipelines. Integration is seamless and fast; it can take you 10 minutes to add this to your workflow.'
  - question: How should I use Semantic Release?'
    answer: 'In your development workflow, you probably have a source branch (which has the latest version of your code), a release branch, and other feature branches (any hotfix branch accounted for here). Your workflow with Semantic Release would involve developing over a feature branch (or hotfix branch or development branch) and, if satisfied, a merge to the source branch in your GitHub repo (a protected branch in your repo). Once those changes are in the source branch (generally main or master), you can merge them into the release branch (another protected branch in your GitHub repo). It will trigger the automatic workflow so that the release candidate is published and the rest of the semantic release plugins take effect. So, for instance, the version is updated based on the commit messages.'
  - question: 'What are GitHub Actions?'
    answer: 'GitHub Actions is a Continuous Integration and Continuous Delivery (CI/CD) platform that allows you to automate your software development pipelines (build, test, deploy, etc.). Using a declarative language (YAML), you define workflows and triggers for them, and then GitHub handles running those pipelines when it meets the specified conditions.'
  - question: 'Why should I use GitHub Actions?'
    answer: "GitHub Actions is a free service that you can use within your existing GitHub repositories to automate any software development tasks you've been doing manually. The integration process is seamless, as it's all within the GitHub ecosystem, making adoption very simple and fast."
  - question: 'What are GitHub Apps?'
    answer: "GitHub Apps are integrations you can build to extend GitHub and provide new features. There are many use cases for GitHub Apps, but we'll focus on providing authenticated actions against GitHub."
  - question: 'Why does a GitHub App help?'
    answer: "You can leverage GitHub Apps to authenticate applications in the CI/CD environment automatically. This way, you don't need to create and handle access-rich credentials that put your system at risk. And, at the same time, simplifying the management process."
  - question: 'What is GitHub Branch Protection?'
    answer: 'Branch Protection is a great practice when working on collaborative projects and when you intend to have more control over some branches. It allows administrators to set limits and requirements for contributions to a specific branch. It can help ensure, for instance, that no one can commit by accident to said branch.'
# tags: []
---

**Semantic Release** is one of the most widely used JavaScript libraries for automatic release workflows. With [roughly 1 million weekly downloads](https://www.npmjs.com/package/semantic-release), it's one of the most significant players. Having Semantic Release in your workflow is a must nowadays, and integrating Semantic Release in your GitHub Actions can take YOUR workflow to the next level.

There's one minor issue with this. **What happens if you have branch protection rules in your release process?** It sparks **several problems in general**, and people start finding workarounds for this. Workarounds that, in general, involve security risks or are too complex.

By combining Semantic Release, GitHub Actions, and GitHub Apps, you can implement semantic releases and semantic versioning in your GitHub Actions workflows while maintaining scalability and security.

## Semantic Release

### How does Semantic Release work?

[Semantic Release](https://github.com/semantic-release/semantic-release) automates the package release workflow, including determining version numbers, generating a release note, and publishing the package. Not limited to those capabilities, you can extend Semantic Release using plugins.

In automated, git-based environments, Semantic Release looks at previous releases and your commit message since the latest release to generate a changelog (using the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standard) and determine the following semantic version number (for a new git tag). When given credentials to publish packages, Semantic Release will also upload your package following your instructions.

### Why should I use Semantic Release?

**Automatic releases have become a standard in the industry in the past few years**, much like Conventional Commits. No matter the scale at which you work, you will always benefit from an automated release pipeline. It includes generating a changelog, a new release on GitHub, a new git tag (with said version).

Semantic Release provides a way to integrate that behavior into your continuous deployment and integration pipelines. Integration is seamless and fast; it can take you 10 minutes to add this to your workflow.

### How should I use Semantic Release?

In your development workflow, you probably have a source branch (which has the latest version of your code), a release branch, and other feature branches (any hotfix branch accounted for here).

Your workflow with Semantic Release would involve developing over a feature branch (or hotfix branch or development branch) and, if satisfied, a merge to the source branch in your GitHub repo (a protected branch in your repo).

Once those changes are in the source branch (generally main or master), you can merge them into the release branch (another protected branch in your GitHub repo). It will trigger the automatic workflow so that the release candidate is published and the rest of the semantic release plugins take effect. So, for instance, the version is updated based on the commit messages.

## GitHub Actions

### What are GitHub Actions?

[GitHub Actions](https://docs.github.com/en/actions) is a [Continuous Integration and Continuous Delivery](https://about.gitlab.com/topics/ci-cd/) (CI/CD) platform that allows you to automate your software development pipelines (build, test, deploy, etc.). Using a declarative language (YAML), you define workflows and triggers for them, and then GitHub handles running those pipelines when it meets the specified conditions.

### Why should I use GitHub Actions?

GitHub Actions is a [free service](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions) that you can use within your existing GitHub repositories to automate any software development tasks you've been doing manually.

The integration process is seamless, as it's all within the GitHub ecosystem, making adoption very simple and fast.

## GitHub Apps

### What are GitHub Apps?

[GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps) are integrations you can build to extend GitHub and provide new features.

There are many use cases for GitHub Apps, but we'll focus on providing authenticated actions against GitHub.

### Why does a GitHub App help?

You can leverage GitHub Apps to authenticate applications in the CI/CD environment automatically. This way, you don't need to create and handle access-rich credentials that put your system at risk. And, at the same time, simplifying the management process.

## Branch Protection

### What is GitHub Branch Protection?

[Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) is a great practice when working on collaborative projects and when you intend to have more control over some branches. It allows administrators to set limits and requirements for contributions to a specific branch. It can help ensure, for instance, that no one can commit by accident to said branch.

## The Problem

When protecting your main branch (or other release branch), you will probably set rules like not allowing anyone to commit without a Pull Request. It is the safest option but limits what Semantic Release can do when generating new releases.

**By not allowing pushes without pull requests, Semantic Release cannot push new tags to the branch.** Without that ability, it cannot create a new GitHub release. If it cannot generate the GitHub release, your pipeline is useless.

There's another issue as well. Recently, there were changes to the branch protection rules in GitHub, meaning that most wikis and guides are outdated. Almost no new tutorials explain how to set up semantic versioning in an environment with branch protection rules, which is becoming more common. Most still use a Personal Access Token as the GitHub token, which is less than ideal.

## Options

You have several options for getting around this limitation:

1. You can use GitHub Personal Access Tokens (PATs) to authenticate as an administrator with permission to override the branch protection. This option is not very safe and requires more secret management.
2. You can create pull requests for the new releases. This option is cumbersome and hinders your automatic deployments because you need to approve the PR.

By using GitHub Apps, you can get around this issue more safely.

## The solution

Install a GitHub App and permit it to perform a force push to the protected branches. It will allow the app to bypass the branch protection without managing secrets or Personal Access Tokens.

Let's get into how to set this up. Start with an empty repository.

### The GitHub App configuration

Let's start by creating and configuring a GitHub App. Go to _Settings > Developer Settings > GitHub Apps_ (Developer Settings is at the bottom of the Settings page). Click on New GitHub App.

Once you are creating a new GitHub app, make sure to configure the following:

- Complete the necessary details for the application.
- Uncheck the active webhook.
- From the _Repository Permissions_, set the following:
  - Administration to _Read and Write_.
  - Contents to _Read and Write_.
  - Issues to _Read and Write_.
  - Metadata to _Read Only_.
  - Pull Requests to _Read and Write_.
- Check _Install Only on this account_.

Once you have created the app, you need to install it on the repository you want to use it. Follow GitHub's [guide](https://docs.github.com/en/apps/using-github-apps/installing-your-own-github-app) on installing your apps to repositories you own.

One more thing you need to do from the app's settings. Go to the app's settings and generate a new private key. Copy that private key to a safe place and then copy the app ID. You will need both values as repository secrets.

After installing your new GitHub app, you need to configure the repository.

### The GitHub repository configuration

To configure the repository branch protection rules, go to _Settings > Branches_. Within that section, create a new branch protection rule against the branch you intend on releasing against. For example, it can be the main branch, master branch, release branch, etc.

Set the following rules for your protection configuration:

- Check the option to _Require a pull request before merging_ and select the following options within that section:
  - _Dismiss stale pull request approvals when new commits are pushed._
  - _Require review from Code Owners._
- Check the option to _Require status checks to pass before merging_, and select the following options within that section:
  - _Require branches to be up to date before merging._
- Check the option to _Allow force pushes_ and specify that the only allowed actor is the GitHub app you already installed.

Save your changes for the rule to start applying in the repository.

Next, go to _Settings > Secrets and Variables > Actions_ to create new secrets. Add one secret for the private key and another for the app ID. Once you've done this, the last thing is configuring the workflows.

### The Semantic Release Action workflow

The GitHub Action workflow is straightforward, and it only needs to do the following:

1. Get a GitHub token for your GitHub app. The GitHub token helps authenticate the action as your app.
2. Check out your code.
3. Perform the automatic release action for a new release.

The following Semantic Release GitHub action contains everything necessary to make the automatic releases work:

```yaml[.github/workflows/release.yml]
# Info on the action
name: Automatic Release
run-name: ${{ github.actor }} is automatically releasing 🚀

on:
  # Run automatically on main pushes
  push:
    branches:
      - main

jobs:
  # As per https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/ci-configurations/github-actions.md
  release:
    runs-on: ubuntu-latest
    steps:
      - name: 'Generate token'
        id: generate_token
        uses: tibdex/github-app-token@v1
        with:
          app_id: ${{ secrets.BOT_APP_ID }}
          private_key: ${{ secrets.BOT_PRIVATE_KEY }}
      # Check out the code to be able to deploy
      - name: 'Checking out code'
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          token: ${{ steps.generate_token.outputs.token }}
      # Setting up Node, 18 is LTS
      - name: 'Setting up Node'
        uses: actions/setup-node@v3
        with:
          node-version: 18
      # Make sure all the dependencies are ok and installed
      - name: 'Installing dependencies'
        run: npm ci
      - name: 'Verifying the signatures'
        run: npm audit signatures
      # Install semantic release
      - name: 'Releasing via Semantic Release'
        run: npx semantic-release@21
        env:
          GITHUB_TOKEN: ${{ steps.generate_token.outputs.token }}
```

Note that it doesn't matter if your project is not Node-based. You can still use the Semantic Release library to do all those operations. If your project is Node-based and you want to publish an NPM package, you can use an NPM token.

You can find an example of this configuration for automatic releases in the following [repository](https://github.com/GonzaloHirsch/alexa-skill-movie-integrations). Said repo has branch protection rules, automatic releases, and a GitHub app installed to allow all of those processes to work together.

Note the Semantic Release package will automatically generate a GitHub release version following the semantic versioning guideline (based on your commit message) with a release note file.

### The Semantic Release configuration

You don't need it to deploy a new version, but you can change the Semantic Release configuration file and plugins. You can do so by changing the `package.json` or `.release.rc` files. You can specify any module or extra plugins for the semantic release action.

You can specify what happens on a new release, such as changelog generation, which commit message generates version bumps, and which version range you are working with, among many others.

Here are some examples of the configuration of both files (including commit analyzer, release note generation, GitHub package version update, and `package.json` version update):

```json[package.json]
"release": {
    "branches": [
      "main"
    ],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      [
        "@semantic-release/changelog",
        {
          "changelogFile": "docs/changelog.md"
        }
      ],
      "@semantic-release/npm",
      [
        "@semantic-release/git",
        {
          "assets": [
            "docs/changelog.md",
            "package.json"
          ]
        }
      ],
      "@semantic-release/github"
    ]
  }
```

```json[.release.rc]
{
    "release": {
        "branches": [
            "main"
        ]
    },
    "repositoryUrl": "https://github.com/GonzaloHirsch/alexa-skill-movie-integrations.git",
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "docs/changelog.md"
            }
        ],
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                "assets": [
                    "docs/changelog.md",
                    "package.json"
                ]
            }
        ],
        "@semantic-release/github"
    ]
}
```

## Takeaway

**Leverage automatic releases via a GitHub action even on your projects**. Working on your projects while **being rigorous with your deployment pipeline can help you prepare for real-life scenarios in which you use those same technologies**. Use [this guide](/blog/semantic-release-and-branch-protection-rules/) and my example repositories to help you navigate this. You will realize how useful it is with each new version you publish and commit you write.

If you want more guides, you can continue reading my Nuxt implementation guides ([SSG caching for Nuxt 3](/blog/ultimate-guide-ssg-caching-with-nuxt-3/), [Nuxt 3 blog implementation](/blog/zero-to-blog-building-with-nuxt-3/), [dark mode in Nuxt 3](/blog/dark-mode-with-tailwind-css-in-nuxt-3/), and [free newsletter integration for Nuxt 3](/blog/nuxt-3-free-newsletter-integration/)) or the [Auth0 guide on saving money with your app setup](/blog/reducing-auth0-bill-by-3000-dollars/).
