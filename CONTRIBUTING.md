# 🧑‍💻 Git Workflow

This project uses a **simple Git-based workflow** with `main` as the production branch and `staging` as the pre-production branch. All development happens in **feature branches** created from `staging`.

---

## 🔀 Branch Structure

- **`main`** – Stable, production-ready code.
- **`staging`** – Pre-production for staging deployments and QA.
- **`feature/*`** – Short-lived branches for new features or improvements.
- **`hotfix/*`** – Urgent fixes applied to `main`, then backported to `staging`.

---

## 🧭 Diagram

```
                +----------------+
                |  feature/*     |
                +----------------+
                        |
                        v
                  [Pull Request]
                        |
                        v
                   +---------+
                   | staging |
                   +---------+
                        |
                        v
               Test & QA in Staging
                        |
                        v
                  [Pull Request]
                        |
                        v
                   +--------+
                   |  main  |
                   +--------+
                        |
                 Tag & Deploy to Prod
```

---

## 🚀 Workflow Steps

### 1. Create a Feature Branch

Start by branching from `staging`:
```bash
git checkout staging
git pull origin staging
git checkout -b feature/short-description
```

> 💡 Use clear names like `feature/signup-flow` or `feature/fix-navbar`.

---

### 2. Develop and Commit

Make your changes and commit regularly:
```bash
git add .
git commit -m "feat(signup): add client-side validation"
```

> Follow [Conventional Commits](https://www.conventionalcommits.org/) when possible.

---

### 3. Open a Pull Request to `staging`

When ready:
```bash
git push -u origin feature/short-description
```

- Open a **pull request into `staging`**.
- Request reviews and ensure tests pass.

---

### 4. Merge into `staging`

After review:
- **Squash merge** to keep history clean.
- Delete the feature branch after merge.

---

### 5. Test on Staging

Deploy the `staging` branch to a pre-production environment for QA and validation.

---

### 6. Promote to Production

When staging is ready:
- Open a **pull request from `staging` to `main`**.
- After approval, merge and tag:
  ```bash
  git checkout main
  git pull
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin --tags
  ```

---

### 7. Deploy to Production

Deploy the updated `main` branch.

---

## 🔥 Hotfixes

Sometimes production needs an urgent fix. In that case:

### 1. Create a Hotfix Branch from `main`

```bash
git checkout main
git pull
git checkout -b hotfix/urgent-issue
```

### 2. Fix, Commit, and Push

```bash
git add .
git commit -m "fix: patch login redirect bug"
git push -u origin hotfix/urgent-issue
```

### 3. PR into `main` (and Deploy)

- Open a **pull request into `main`**, review, and merge.
- Deploy to production immediately.

### 4. Backport to `staging`

```bash
git checkout staging
git pull
git cherry-pick <commit-sha>
git push origin staging
```

---

## 🍒 Cherry-Picking

Cherry-picking lets you apply a specific commit to another branch.

### Example: Backport a Hotfix from `main` to `staging`

```bash
git checkout staging
git pull origin staging
git cherry-pick <commit-sha-from-main>
git push origin staging
```

> 💡 Only cherry-pick commits that are small, isolated, and non-breaking. Avoid cherry-picking large merges.

---

## ✅ Summary

| Task                         | Branch        | Action                                         |
|-----------------------------|---------------|------------------------------------------------|
| New feature                 | `staging`     | Create `feature/*`, PR → `staging`             |
| Release                     | `staging`     | PR → `main`, then tag                          |
| Hotfix                      | `main`        | Create `hotfix/*`, PR → `main`, cherry-pick → `staging` |
| Cherry-pick                 | any           | Use `git cherry-pick <sha>`                    |
| Never do                    | `main`/`staging` | Direct commits (use PRs always)             |

---

## 🔁 Automated Release Tagging

To **automate release tagging** when code is merged into `main`, you can GitHub Actions will automatically tag a new release version.


---
