# Contributing to Ormee Hair

Thank you for considering contributing to the Ormee Hair e-commerce platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue tracker to see if the problem has already been reported. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Describe the behavior you observed and what you expected to see
- Include screenshots if possible
- Include details about your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the code style used in the project
- Update any relevant documentation
- Include tests that verify your changes
- End all files with a newline

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Copy env-example.txt to .env and fill in required values
4. Run the development server: `pnpm dev`

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

- Use TypeScript for all code
- Follow the ESLint configuration in the project
- Prefer interfaces over type aliases for object types
- Use explicit types for function parameters and return values

### CSS/Tailwind Style Guide

- Use Tailwind CSS classes for styling
- Avoid inline styles
- Follow BEM naming convention for custom CSS classes

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues for bugs in the code
* `documentation` - Issues for improving or updating documentation
* `enhancement` - Issues for new features or improvements
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested 