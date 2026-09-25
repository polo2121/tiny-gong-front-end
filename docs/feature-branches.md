# Isolated protected sections

Each `feature/<section>` branch contains the shared app plus only its own folder under `app/(protected)`. The common ancestor is `shared-base`, which has no protected feature folders. `main` remains the existing combined app until integration.

Shared draft models, image grouping, the preview component, and error messages live outside route folders because multiple sections use them. Navigation detects available folders when Next starts; restart the dev server after switching branches. The optional code explorer shows only sources present on the current branch.

## Working on a section

Commit or stash local work before switching branches. Work in `app/(protected)/<section>` on its `feature/<section>` branch. Make shared changes on `shared-base` and merge that branch into the feature branches that need them. Do not merge `main` into isolated branches: it contains all sections.

## Final integration

Start a fresh integration branch from the latest shared base, then merge all feature branches:

```sh
git fetch origin
git checkout -b integration/all-features origin/shared-base
git merge origin/feature/daily-sales origin/feature/expenses origin/feature/inventory origin/feature/invoices origin/feature/playground origin/feature/products origin/feature/profits origin/feature/purchase
```

Verify the combined app, then merge `integration/all-features` into `main`. Do not merge an individual isolated branch directly into `main`: that branch omits the other sections. If `main` has changed independently, reconcile those changes during final integration.

The initial split uses commit `948c16d`. Uncommitted edits in the original workspace were intentionally not included; commit those to the appropriate section or shared branch separately.
