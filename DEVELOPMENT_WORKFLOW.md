# Tab Organizer - Development Workflow Guide

This document defines our approach to developing and implementing features in the Tab Organizer project, following a coherent and consistent workflow that ensures code quality and an organized git history.

## Table of Contents

1. [Development Cycle](#development-cycle)
2. [Issue Selection](#issue-selection)
3. [Feature Implementation](#feature-implementation)
4. [Code Conventions](#code-conventions)
5. [Commit Strategy](#commit-strategy)
6. [Review Process](#review-process)

## Development Cycle

Our development cycle follows these fundamental steps:

1. **Selection**: Identify the next issue to implement from GitHub
2. **Analysis**: Understand the requirements and plan the implementation
3. **Development**: Implement the solution following best practices
4. **Testing**: Verify that the implementation works correctly
5. **Commits**: Make logical commits with clear messages
6. **Pull Request**: Create PR for review (if applicable)
7. **Integration**: Merge changes into the main branch
8. **Update**: Mark the issue as completed in GitHub

## Issue Selection

To select the next issue to implement:

1. Visit the issues section on GitHub
2. Filter by active milestone and high priority
3. Review the issue dependencies to ensure that all prerequisites are already implemented
4. Analyze the issue in detail including:
   - Description and objectives
   - Specific tasks to perform
   - Technical details and requirements
   - Dependencies with other issues

## Feature Implementation

When implementing new features, we follow these principles:

### Backend Approach

```
- Always use best practices, applying recognized design patterns and SOLID principles
- Prioritize simple and direct solutions; avoid overengineering and unnecessary complexity
- Code should be free of legacy elements and excessive defenses
- All comments and documentation must be in English
- Validate code efficiency and readability
- Thoroughly analyze the problem before implementing
- Balance robustness and simplicity, with the principle of "less is more"
```

### Frontend Approach

```
- Carefully review the existing structure and code
- Apply DRY, KISS, and SOLID principles
- Seek maximum simplicity and minimalism
- Address the real problem, avoiding superficial patches
- Maintain consistency and coherence with existing code
- Consider performance, accessibility, and usability
- All code and comments must be in English
- Remember: "less is more"
```

## Code Conventions

To maintain consistency throughout the code:

1. **Language**: All code, comments, and documentation must be in English
2. **Style**:
   - Use Airbnb's style guide for JavaScript/React
   - Maintain descriptive names for variables and functions
   - Use camelCase for variables/methods and PascalCase for classes/components
3. **Structure**:
   - Keep files small and focused on a single responsibility
   - Organize imports by groups (external, internal, styles)
   - Use proper modularization to facilitate maintainability
4. **Documentation**:
   - Document public/exported functions with JSDoc
   - Add comments only when necessary to explain "why" and not "what"
   - Keep README updated with new features

## Commit Strategy

To maintain a clean and meaningful git history:

1. **Atomicity**: Each commit should represent a complete logical change
2. **Message Convention**: Follow the Conventional Commits format
   ```
   <type>(<scope>): <short description>
   
   [optional body]
   
   [optional footer]
   ```
   
   Where `type` can be:
   - `feat`: New feature
   - `fix`: Bug fixes
   - `docs`: Documentation changes
   - `style`: Formatting changes (spaces, indentation)
   - `refactor`: Refactoring without functional changes
   - `test`: Addition or correction of tests
   - `chore`: Maintenance or configuration tasks

3. **Example**:
   ```
   feat(tags): implement tag auto-completion
   
   - Add tag suggestion dropdown
   - Implement fuzzy matching for tag search
   - Cache existing tags for performance
   
   Closes #10
   ```

4. **Frequency**: Make small and frequent commits that represent a complete logical change
5. **History**: Maintain a linear history when possible, using rebase to integrate changes

## Review Process

Before considering an implementation complete:

1. **Self-review**:
   - Verify that all tasks in the issue have been completed
   - Check that the code follows established conventions
   - Ensure there is no unnecessary or commented code
   - Verify that tests cover the new functionality

2. **Manual testing**:
   - Verify that the functionality works as expected
   - Test edge cases and possible error scenarios
   - Ensure that the UI is intuitive and responsive

3. **Finalization**:
   - Update documentation if necessary
   - Mark the issue as resolved in GitHub
   - Create PR or merge changes according to the established workflow

---

By following these guidelines, we will maintain a coherent, efficient, and high-quality development process for the Tab Organizer project, facilitating collaboration and long-term maintenance. 