# Contributing to Joly UI

Thank you for your interest in contributing to Joly UI! This guide will help you get started with contributing to both our components and documentation.

## Project Structure

Joly UI is organized into multiple packages and documentation:

- `/packages/*` - Component packages (publishable to npm)
  - `@jolyui/avatar-group` - Avatar Group component
  - _More components coming soon..._
- `/docs/*` - Documentation website
  - `/app/*` - Next.js App Router pages
  - `/content/docs/*` - MDX documentation files
  - `/components/*` - React components used in documentation
  - `/registry/*` - Component registry that imports from packages
  - `/styles/*` - Global styles and Tailwind CSS configurations

## Best Practices

**Packages vs Registry:**
- **Packages** (`/packages/*`) contain the actual component source code that can be published to npm
- **Registry** (`/docs/registry/*`) imports from packages and provides styled wrappers and examples
- This dual approach allows both npm installation and copy-paste usage

**Why This Structure?**
1. **Packages** are framework-agnostic, headless components
2. **Registry** provides styled, ready-to-use examples with your design system
3. Users can either `npm install @jolyui/component` or copy-paste from registry

## Development Setup

1. Fork the repository

2. Clone the repository:

   ```bash
   git clone https://github.com/johuniq/jolyui.git
   ```

3. Navigate to the project directory:

   ```bash
   cd jolyui
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Start the development server:

   ```bash
   turbo dev
   ```

## Contributing to Packages

### Creating a New Package

1. Create a new directory in `packages/` with your component name
2. Initialize the package with required files:

   - `package.json` - Package configuration
   - `README.md` - Package documentation
   - `tsconfig.json` - TypeScript configuration
   - `tsup.config.ts` - Build configuration
   - `src/` directory - Source code
   - `src/index.ts` - Main export file
   - `src/your-component.tsx` - Component implementation

### Package Structure Example

```text
packages/avatar-group/
├── src/
│   ├── index.ts              # Main export
│   └── avatar-group.tsx      # Component implementation
├── package.json
├── README.md
├── tsconfig.json
└── tsup.config.ts
```

### Connecting Package to Registry

After creating a package:

1. Add the package to docs dependencies:
   ```json
   {
     "dependencies": {
       "@jolyui/your-component": "workspace:*"
     }
   }
   ```

2. Create a registry wrapper in `/docs/registry/default/ui/your-component.tsx`:
   ```tsx
   import { YourComponent as YourComponentPrimitive } from "@jolyui/your-component";
   import { cn } from "@/lib/utils";

   export function YourComponent({ className, ...props }) {
     return <YourComponentPrimitive className={cn(className)} {...props} />;
   }
   
   export type { YourComponentProps } from "@jolyui/your-component";
   ```

3. Add examples in `/docs/registry/default/examples/your-component-demo.tsx`

4. Install dependencies:
   ```bash
   pnpm install
   ```

### Component Guidelines

#### TypeScript

- Use TypeScript for all components
- Export proper type definitions
- Use interfaces over types where appropriate
- Provide comprehensive type documentation

#### React Patterns

- Use functional components
- Implement proper prop types and defaults
- Use React Server Components where possible
- Follow the compound component pattern when appropriate

#### Styling

- Use `style` prop for styling
- Keep the `primitive` components as headless as possible
- Follow the `primitive` composition model

#### Accessibility

- Follow WAI-ARIA guidelines
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

## Contributing to Documentation

### Writing Documentation

#### MDX Files

- Place new documentation in the appropriate directory under `/content/docs/`
- Use MDX format for documentation files
- Include proper frontmatter with title, description, and other metadata
- Follow the existing documentation style and structure

#### Code Examples

- Include working examples for components and features
- Use TypeScript for all code examples
- Ensure examples are accessible and follow best practices
- Test examples locally before submitting

### Component Registry

When adding new component examples:

1. Create a new file in `/registry/default/examples/`
2. Add the component to the registry index
3. Include proper documentation and types
4. Test the component in isolation

### Style Guide

- Use clear, concise language
- Include code examples where appropriate
- Follow TypeScript best practices
- Use proper heading hierarchy
- Include proper accessibility information

## Testing

1. Write tests for your component:
   - Unit tests for utilities
   - Component tests with React Testing Library
   - Integration tests where necessary

1. Run tests:

```bash
pnpm test
```

## Version Control

- Follow semantic versioning
- Update CHANGELOG.md with changes
- Use conventional commits with the following pattern:

### Commit Convention

Use the format: `type(scope): description`

**Examples:**

```text
feat(media-player): optimize scrubbing performance
fix(combobox): resolve keyboard navigation issue
docs(mention): update API documentation
refactor(shared): simplify utility functions
test(tags-input): add validation tests
```

**Types:**

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation changes
- `refactor`: code refactoring
- `test`: adding or updating tests
- `chore`: maintenance tasks
- `perf`: performance improvements
- `ci`: continuous integration changes

**Scope:**

- Use the package/component name (e.g., `combobox`, `mention`, `tags-input`, `media-player`)
- Use `shared` for shared utilities
- Use `docs` for documentation-specific changes

## Code Style

- Follow the project's ESLint configuration
- Use Prettier for code formatting
- Follow existing patterns in the codebase

## Submitting Changes

1. Create a new branch for your changes
2. Make your changes following the guidelines above
3. Test your changes locally
4. Submit a pull request with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Updated tests
   - Documentation updates

## Need Help?

If you need help or have questions:

- Open an issue for component or documentation-related questions
- Join our community discussions
- Review existing components and documentation for examples
