## Tech Stack Context

- Language: TypeScript 5.8
- Framework: React 18.3.1
- Styling: Tailwind CSS 4.1 with Tailwind Plus
- Backend / Auth / Data: AWS Amplify Gen 2

---

## Copilot Goals

### Code Style and Structure
- Prioritize clarity and conciseness over cleverness or unnecessary abstraction.
- Use TypeScript types and interfaces for function arguments and component props.
- Suggest React functional components with clear naming and consistent structure.
- Automatically factor out components when JSX gets long or reused.
- Promote clean separation of concerns (e.g., avoid mixing data logic with presentational code).

### Component Design
- Create small, focused components—prefer composition over inheritance.
- Follow Tailwind utility-first styling—avoid unnecessary CSS files or className logic unless required.
- Use Tailwind Plus features where applicable for clarity and DRY code.

### Security Best Practices
- Sanitize or validate all user-generated content before rendering.
- Use Amplify’s built-in authorization features (owner/group auth, Cognito roles) to restrict access to data.
- Prevent direct DOM manipulation unless absolutely necessary.
- Avoid inline JavaScript in JSX that could lead to XSS vulnerabilities.
- Do not hardcode secrets or credentials—use Amplify's secure configuration management.

### Amplify Gen 2 Usage
- Use Amplify’s Data, Auth, and Storage helpers instead of raw AWS SDK unless needed.
- When defining models, favor clear field types and validation rules.
- Use Lambda functions for business logic—keep frontend focused on UI and interactivity.
- For side effects (e.g., API calls), use `useEffect`, `useMutation`, or `async` event handlers.

### Performance and Maintainability
- Use React Suspense/lazy loading for large or rarely used components.
- Encourage memoization (`useMemo`, `React.memo`, `useCallback`) for expensive renders.
- Avoid unnecessary re-renders by lifting state or using context strategically.
- When rendering lists with `.map`, include stable keys and avoid inline functions if performance is critical.
