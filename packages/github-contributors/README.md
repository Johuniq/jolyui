# @jolyui/github-contributors

A beautiful GitHub Contributors component with animations and rich tooltips.

## Installation

```bash
npm install @jolyui/github-contributors
```

## Usage

```tsx
import { GitHubContributors } from '@jolyui/github-contributors';

export default function App() {
  return (
    <GitHubContributors 
      repo="vercel/next.js" 
      limit={12}
    />
  );
}
```

## Props

- `repo` (required): GitHub repository in format "owner/repo"
- `limit`: Number of contributors to show (default: 12)
- `className`: Additional CSS classes
- `token`: Optional GitHub token to increase rate limit

## Features

- 🎨 Beautiful animations with Motion
- 💫 Rich tooltips with contributor details
- 📊 Contribution progress bars
- ⭐ Top contributor badge
- 🔗 Direct links to GitHub profiles
- 📱 Responsive grid layout
