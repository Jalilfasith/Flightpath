# Flightpath — DevOps Learning Lab

A responsive, dependency-free learning dashboard with a 60-day curriculum, clickable reference architecture, pipeline simulation, browser-local progress, and official documentation library.

## Edition 02

Warm ivory, graphite, and sage interface with subtle entrance, orbit, and pipeline animations. Motion can be disabled in the header and follows the operating system reduced-motion preference.

The Essential concepts page contains 24 searchable, filterable field notes. Each note explains a concept, gives an example, and highlights a common mistake. The same notes are available in the relevant lesson.

## Run

Requires Python 3 (no Node.js or npm required).

```bash
cd /path/to/flightpath
bash start.sh
```

Open http://localhost:8080. Stop with Ctrl+C. Use `bash start.sh 8083` if 8080 is busy. Replace `/path/to/flightpath` with the folder you extracted. On Windows, open the extracted folder in a terminal and run `py -m http.server 8080 --bind 127.0.0.1 --directory dist`.

Alternatively, serve `dist/` with any static web server. The optional Google Fonts stylesheet needs internet; system fonts work offline. External documentation requires internet.

## Learn

1. Linux and networking, days 1–7.
2. Git collaboration, days 8–13.
3. Containers, days 14–21.
4. CI and security, days 22–29.
5. Terraform, days 30–36.
6. Kubernetes and GitOps, days 37–46.
7. Observability, days 47–54.
8. End-to-end capstone, days 55–60.

Click each module for exercises, example commands, an outcome checkpoint, and an official reference. Mark completion manually after passing the checkpoint. Progress uses localStorage on the current browser and origin; it is not synced to an account.

## Architecture

Delivery: GitHub → GitHub Actions tests/build + Trivy scan → GHCR image → GitOps manifest update → Argo CD → Kubernetes.
Runtime: browser → ingress/Service → frontend → API → PostgreSQL.
Support: Terraform provisions resources; Prometheus scrapes metrics; Grafana displays them; Alertmanager routes alerts.

This is an educational reference architecture. The website does not install or run these infrastructure services. Its pipeline lab is explicitly a simulation with successful, test-failure, and scan-failure scenarios. Real infrastructure implementation is performed by the learner through linked official tutorials. Prefer isolated local labs; review cloud cost and resource plans before creating paid resources.

## Files

- `dist/index.html`: accessible page structure and lesson dialog.
- `dist/style.css`: responsive design and reduced-motion support.
- `dist/app.js`: curriculum, navigation, architecture, simulator, and progress.
- `.openai/hosting.json`: private Sites hosting identity.

## References

Core references consulted 2026-11-05:
- https://docs.docker.com/get-started/tutorials/run-an-app/
- https://docs.github.com/en/actions/get-started/understand-github-actions
- https://kubernetes.io/docs/tutorials/kubernetes-basics/
- https://developer.hashicorp.com/terraform/tutorials
- https://argo-cd.readthedocs.io/en/stable/
- https://prometheus.io/docs/introduction/overview/

Additional official reading: https://git-scm.com/book/en/v2, https://www.gnu.org/software/bash/manual/bash.html, https://trivy.dev/latest/docs/, https://grafana.com/docs/grafana/latest/.

## Additional references for advanced notes

- https://kubernetes.io/docs/concepts/workloads/pods/probes/
- https://sre.google/sre-book/service-level-objectives/
- https://developer.hashicorp.com/terraform/language/manage-sensitive-data

## Portable folder

The ZIP includes the application, this guide, and start.sh. It excludes Git history, hosting identity, and temporary files. You do not need npm or a cloud account to run it.

## Quiz Arena

Open `/#quiz` to play 4–5 question missions from a 24-question bank. Choose DevOps delivery, cloud infrastructure, Kubernetes/reliability, or a mixed mission. Foundations and advanced filters are available. Every answer includes an explanation and reference; completed missions include a debrief.

Correct answers earn 100 XP plus a streak bonus capped at 100 additional XP per answer. Incorrect answers reset the streak. Only completed missions contribute to saved XP. Replays earn XP too: this is a practice game, not a certification or competitive leaderboard. Stats are browser-local, not authenticated or tamper-proof. Active missions survive page navigation in the same session, but not a page reload.

Run tests with `node --test tests/quiz.test.cjs` (Node.js 22+; no npm install). The dashboard itself still only needs a static server.

See [GITHUB-VERCEL-GUIDE.md](GITHUB-VERCEL-GUIDE.md) for the VS Code dev-branch → Vercel preview → GitHub pull request → main/production workflow.
