# Contributing to Wallie de Sensei Backend

Thank you for your interest in contributing! This document provides guidelines for contributing to the Wallie de Sensei Backend project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/wallie-de-sensei-backend.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up your environment variables (see `.env.example`)

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications

Examples:
- `feature/add-payment-stream`
- `fix/websocket-connection-issue`
- `docs/update-api-examples`

### Commit Messages

Follow conventional commit format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

Examples:
- `feat: add recommendation caching layer`
- `fix: resolve race condition in stream updates`
- `docs: add WebSocket connection examples`

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use async/await over raw promises

### Testing Requirements

All contributions must include appropriate tests:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

- Unit tests for new functions and classes
- Integration tests for API endpoints
- WebSocket tests for real-time features
- Maintain 95% coverage threshold

### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Run the linter (if configured)
4. Update the README.md if adding features
5. Submit PR with clear description:
   - What changes were made
   - Why these changes are needed
   - How to test the changes
   - Screenshots (if applicable)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How to test these changes

## Checklist
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Code follows project style
- [ ] Self-review completed
```

## The Wave Program

We participate in The Wave Program with structured sprint cycles. Check open issues tagged with `wave-program` for scoped contribution opportunities including:
- Bug fixes
- Feature development
- Documentation improvements
- Test coverage enhancement
- Performance optimization

See [plan.md](./plan.md) for details on contribution types.

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Tag maintainers for questions about implementation

## Code Review

All submissions require review. We aim to:
- Respond to PRs within 48 hours
- Provide constructive feedback
- Help contributors improve their code

Thank you for contributing to Wallie de Sensei! 🚀
