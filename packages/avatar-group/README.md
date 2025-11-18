# @jolyui/avatar-group

A flexible and accessible Avatar Group component for React applications.

## Features

- 🎨 Customizable size and orientation
- 🔄 RTL support
- 📦 Truncation with overflow counter
- ♿ Accessible
- 🎭 Composable with any avatar component
- 🌗 Works with any styling solution

## Installation

```bash
npm install @jolyui/avatar-group
# or
pnpm add @jolyui/avatar-group
# or
yarn add @jolyui/avatar-group
```

## Usage

```tsx
import { AvatarGroup } from '@jolyui/avatar-group';

function App() {
  return (
    <AvatarGroup size={40} max={3}>
      <img src="/avatar1.jpg" alt="User 1" />
      <img src="/avatar2.jpg" alt="User 2" />
      <img src="/avatar3.jpg" alt="User 3" />
      <img src="/avatar4.jpg" alt="User 4" />
    </AvatarGroup>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `40` | Size of each avatar in pixels |
| `max` | `number` | `undefined` | Maximum number of avatars to display |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `reverse` | `boolean` | `false` | Reverse the stacking order |
| `asChild` | `boolean` | `false` | Use Radix UI Slot pattern |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Vertical Layout

```tsx
<AvatarGroup orientation="vertical" size={40}>
  <img src="/avatar1.jpg" alt="User 1" />
  <img src="/avatar2.jpg" alt="User 2" />
  <img src="/avatar3.jpg" alt="User 3" />
</AvatarGroup>
```

### With Truncation

```tsx
<AvatarGroup max={3} size={40}>
  {users.map((user) => (
    <img key={user.id} src={user.avatar} alt={user.name} />
  ))}
</AvatarGroup>
```

### RTL Support

```tsx
<AvatarGroup dir="rtl" size={40}>
  <img src="/avatar1.jpg" alt="User 1" />
  <img src="/avatar2.jpg" alt="User 2" />
  <img src="/avatar3.jpg" alt="User 3" />
</AvatarGroup>
```

## License

MIT © [johuniq](https://github.com/johuniq)
