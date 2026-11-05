# Publish Quiz Arena: dev → preview → main → production

The quiz update was created on the local `dev` branch. It is not merged into `main` or deployed by this guide. Your repository is https://github.com/Jalilfasith/flightpath.

## 1. Try the update locally

Open the Flightpath folder in VS Code. Choose Terminal → New Terminal and run:

```bash
bash start.sh
```

Open http://localhost:8080/#quiz. Try each track, a correct answer, a wrong answer, a complete round, and the answer review. Check a narrow/mobile window. XP and completed missions are local to the browser and origin; preview and production do not share them.

## 2. Publish the dev branch from VS Code

The lower-left branch indicator should say `dev`. The feature is already committed, so there is no need to create this branch again or commit the same changes again.

1. Open Source Control (Ctrl+Shift+G).
2. Click Publish Branch. If a remote picker appears, choose origin.
3. Complete GitHub browser sign-in if prompted.
4. If Publish Branch is not visible, use Source Control → … → Push.
5. On GitHub, choose `dev` in the branch selector and confirm the quiz files are present.

Terminal equivalent:

```bash
git push -u origin dev
```

If Git rejects the push because an existing remote dev branch has different commits, do not force-push. Inspect and reconcile the remote changes first.

## 3. Configure the existing Vercel project

Open the Vercel project already connected to this repository. Do not create a duplicate if it already exists.

- Connected Git repository: Jalilfasith/flightpath.
- Production branch: main (under the production environment / branch settings).
- Root Directory: repository root, not dist.
- Framework Preset: Other.
- Output Directory: dist.
- Build Command: empty / no build required.
- Install Command: empty / no installation required.

The checked-in vercel.json defines the static output directory and no build/install commands. Setting the dashboard Root Directory to dist would hide this config; keep the root at the repository root. No secrets or environment variables are needed.

If the repository is not connected, use Add New → Project → Import Git Repository and select it. Deploy main for production; keep dev as a preview branch.

Once connected, a push to dev normally creates a Preview deployment. Open the deployment whose branch and commit match this update. If the earlier push occurred before connecting Vercel, trigger a new deployment of dev in the dashboard.

## 4. Review before merging

Open https://github.com/Jalilfasith/flightpath/compare/main...dev and choose Create pull request.

Suggested title: Add DevOps and cloud Quiz Arena

Suggested description: Adds 24 questions across DevOps, cloud infrastructure, and Kubernetes, with filtered missions, streak scoring, explanations, and local progress. Includes static Vercel configuration and quiz rule tests.

Use base: main and compare: dev. Review Files changed, then open the Vercel preview from the checks/deployment section. Confirm:

- The homepage links to Quiz Arena.
- All track and difficulty combinations start a round.
- Answer buttons lock after one answer and show explanations.
- A completed mission awards XP once and shows the review.
- Existing lessons, concepts, and architecture still work.

The test suite can be run locally with Node.js 22 or later:

```bash
node --test tests/quiz.test.cjs
```

No GitHub Actions workflow is included; these tests do not automatically run on GitHub unless you add one.

## 5. Merge dev into main

On the pull request, choose Merge pull request → Confirm merge when satisfied. Do not change the Vercel production branch to dev to bypass review.

Vercel's Git integration normally builds a Production deployment from the main-branch merge. In Vercel → Deployments, verify the deployment shows main, the merge commit, and Ready. Open the production URL and check /#quiz. Your existing custom domain remains attached to production.

## 6. Refresh the local main branch

In VS Code, click the branch indicator and select main. Then Source Control → … → Pull. This fetches the merged update onto local main.

For a later feature, create a branch from the updated main with the branch indicator → Create new branch. If reusing dev, switch to dev and use Git: Merge Branch → main before making more changes.

## Troubleshooting

- 404 on the homepage: check Root Directory is repository root and Output Directory is dist.
- Quiz link exists but page fails: confirm quiz-core.js and quiz.js both deployed, then inspect the browser console.
- No preview: confirm the Git integration, branch, deployment permissions, and latest deployment logs.
- Old production site: confirm the merged commit deployed successfully to Production, not only Preview.
- Git authentication: use VS Code browser sign-in or a token, never an account password for HTTPS Git.

Official references:
- https://vercel.com/docs/git/vercel-for-github
- https://vercel.com/docs/deployments/environments
