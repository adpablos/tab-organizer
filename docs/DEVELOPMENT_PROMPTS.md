# Development Prompts for Tab Organizer

This document contains specific prompts for different stages of development in the Tab Organizer project. These prompts are designed to maintain consistency in development style, implementation, and commits.

## Prompts for Feature Implementation

### 1. Backend Development Prompt

```
Can you help me identify and solve this problem in the best possible way?

-- Final Instructions --
- Always use best practices, applying recognized design patterns and SOLID principles (such as SRP, YAGNI, DRY, and KISS) to ensure code that follows the basic principle of single responsibility, and is simple, clean, clear, modular, and maintainable.
- Prioritize simple and direct solutions; avoid overengineering and unnecessary complexity. If something is not used or is redundant, remove it.
- Since this code is the only consumer of our APIs, it should be free of legacy code and excessive defenses: include only the essentials.
- Ensure that all comments and documentation are in English, concise, and help understand the implementation logic.
- Validate the efficiency and readability of the code, ensuring that each component has a clear purpose.
- Before generating the final solution, take time to thoroughly analyze the problem, evaluating all necessary considerations and alternatives to ensure the best proposal.
- In summary, always seek the balance between robustness and simplicity, prioritizing the most direct solution that meets the functional requirements.

Follow these guidelines to generate optimal and clean solutions, avoiding the creation of 'Frankenstein' code and ensuring an approach that solves the problem directly and efficiently.

Remember, PLEASE, LESS is MORE. Solve this in the simplest way possible, the fewer lines of code we need, the BETTER.
```

### 2. Frontend Development Prompt

```
Can you help me identify and solve this problem in the best possible way?

Act as an expert in front-end development and application architectures. When asked to implement a new feature or make changes, follow these instructions, placing special emphasis on simple, direct, and minimalist solutions:

Review of existing code:
Carefully review the current structure and code. Reuse already implemented components and functions to avoid duplications and conflicts.

Application of best practices:
Apply principles such as DRY, KISS, and SOLID. Use common front-end design patterns and ensure that the solution is modular and easily maintainable.

Simplicity and minimalism:
The solution should be as simple, direct, and straightforward as possible, using the smallest viable number of lines of code.
Avoid overengineering: don't add unnecessary layers of abstraction or convoluted code.

Addressing the real problem:
Don't implement patches or defensive checks in each method to "patch" problems.
Identify the root problem (e.g., circular dependencies or poor initialization) and restructure the system from the base to solve it.
Eliminate redundant code instead of adding additional checks.

Consistency and coherence:
Ensure that the new code respects the standards, conventions, and styles already established in the project. Make minimal adjustments to maintain coherence without complicating the system.

Impact and efficiency:
Always consider performance, accessibility, and usability. Avoid introducing dependencies or duplications that could degrade the quality of the project.

Use of English:
All code, internal comments, and messages directed to the user must be in English to maintain uniformity and professionalism.

Follow these guidelines to generate optimal and clean solutions, avoiding the creation of 'Frankenstein' code and ensuring an approach that solves the problem directly and efficiently.

Remember, PLEASE, LESS is MORE. Solve this in the simplest way possible, the fewer lines of code we need, the BETTER.
```

## Prompt for Complete Issue Implementation

```
I need to implement issue #[NUMBER] from GitHub in the Tab Organizer project. The title of the issue is "[TITLE]" and it is found in milestone [MILESTONE].

Please help me develop a solution following the principles established in our workflow:

1. First, analyze the issue requirements in detail, including:
   - Description and objectives
   - Specific tasks
   - Technical details
   - Dependencies with other issues

2. Then, propose an implementation strategy that:
   - Follows SOLID principles and best practices
   - Prioritizes simplicity and readability
   - Maintains consistency with existing code
   - Avoids overengineering

3. Finally, implement the solution step by step, explaining key decisions and verifying that all requirements are met.

Remember that all comments and documentation should be in English, while our communication can be in Spanish.
```

## Prompt for Commits and Version Control

```
Act as a Git assistant. I want you to help me upload the pending changes in the project to my local repository. First, analyze the current state of my project repository, reviewing all changes (both staged and unstaged). Then, group related changes into logical commits that follow our conventions:

1. Each commit should represent a complete logical change
2. Messages should follow the Conventional Commits format:
   ```
   <type>(<scope>): <short description>
   
   [optional body with list of specific changes]
   
   [optional footer with references to issues]
   ```

3. Where type can be:
   - feat: New feature
   - fix: Bug fixes
   - docs: Documentation changes
   - style: Formatting changes
   - refactor: Refactoring
   - test: Tests
   - chore: Maintenance tasks

For each commit, generate clear and concise messages in English that adequately describe the changes.

IMPORTANT: If at any point you need to execute a diff (for example, using `git diff <file>`), always use `git diff <file> | cat` so that the complete content is shown without needing to paginate line by line.
```

## Prompt for Code Review

```
Please review the implementation I've done for issue #[NUMBER] titled "[TITLE]". I need you to verify:

1. That the solution meets all the requirements specified in the issue
2. That the code follows the conventions established in our project
3. That there is no unnecessary, redundant, or commented code
4. That the solution is simple, clean, and maintainable
5. That there are no potential performance or security issues

If you find any problems or areas for improvement, please suggest specific changes following our development principles: simplicity, clarity, and efficiency.
```

---

These prompts are designed to be used at different stages of development. Adjust the parameters as needed for each specific case. 