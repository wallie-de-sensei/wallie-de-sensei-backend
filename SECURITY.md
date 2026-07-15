# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### Do Not

- **Do not** open a public GitHub issue
- **Do not** disclose the vulnerability publicly until it has been addressed
- **Do not** exploit the vulnerability beyond what is necessary to demonstrate it

### Please Do

1. **Report privately** via GitHub Security Advisories or email the maintainers
2. **Provide details**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)
3. **Allow time** for us to respond (we aim for 48 hours initial response)

## Security Measures

This project implements several security best practices:

### Authentication & Authorization
- JWT-based authentication
- bcrypt password hashing
- Session management with secure tokens
- Role-based access control

### Input Validation
- Request payload validation using class-validator
- SQL injection prevention via parameterized queries (TypeORM)
- XSS protection through input sanitization

### Network Security
- CORS configuration for cross-origin requests
- Helmet middleware for security headers
- Rate limiting to prevent abuse
- HTTPS enforcement in production

### Data Protection
- Environment variable management for secrets
- No sensitive data in logs
- Secure database connection strings
- Redis password protection

### Dependencies
- Regular dependency updates
- Automated vulnerability scanning (if configured)
- Minimal dependency footprint

## Security Checklist for Contributors

When contributing code, ensure:

- [ ] No hardcoded secrets or credentials
- [ ] Input validation on all user-supplied data
- [ ] Proper error handling (no sensitive data in error messages)
- [ ] Authentication/authorization checks on protected routes
- [ ] SQL queries use parameterized statements
- [ ] No direct execution of user input
- [ ] Secure defaults for all configurations

## Known Security Considerations

### Environment Configuration
- Ensure `.env` files are never committed to version control
- Use strong JWT secrets in production
- Configure Redis and PostgreSQL with authentication
- Use HTTPS in production environments

### Rate Limiting
- Default rate limits are configured conservatively
- Adjust based on your deployment requirements
- Monitor for potential DoS attacks

### WebSocket Security
- WebSocket connections require authentication
- Implement proper origin checking
- Validate all incoming WebSocket messages

## Security Updates

Security patches will be released as soon as possible after a vulnerability is confirmed. Update notifications will be posted:

- GitHub Security Advisories
- Release notes
- Project README

## Contact

For security concerns, contact the project maintainers through:
- GitHub Security Advisories (preferred)
- Project issue tracker (for non-sensitive security discussions)

Thank you for helping keep Wallie de Sensei secure!
