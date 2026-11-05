# Flightpath — DevOps Learning Lab

A responsive, dependency-free learning dashboard with a 60-day curriculum, clickable reference architecture, pipeline simulation, browser-local progress, and official documentation library.

## Run

Requires Python 3 (no Node.js or npm required).

```bash
cd /home/btcchl002/devops-60-days/flightpath
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open http://localhost:8080. Stop with Ctrl+C. Use port 8083 if 8080 is busy.

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
