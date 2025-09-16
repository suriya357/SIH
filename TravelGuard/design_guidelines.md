# Tourist Safety App Design Guidelines

## Design Approach
**System-Based Approach**: Utility-focused application prioritizing clarity, accessibility, and quick user actions during emergency situations. Following Material Design principles for intuitive interactions and consistent UI patterns.

## Color Palette
**Light Mode:**
- Primary: 220 91% 50% (Blue - trustworthy, emergency services)
- Secondary: 210 20% 25% (Dark gray for text)
- Success: 142 76% 36% (Green for confirmations)
- Warning: 38 92% 50% (Orange for alerts)
- Danger: 0 84% 60% (Red for SOS/panic button)
- Background: 0 0% 98% (Off-white)
- Surface: 0 0% 100% (Pure white for cards)

**Dark Mode:**
- Primary: 220 91% 65%
- Secondary: 220 9% 85%
- Success: 142 76% 45%
- Warning: 38 92% 65%
- Danger: 0 84% 70%
- Background: 220 13% 9%
- Surface: 220 13% 12%

## Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Inter 600-700 weight
- **Body**: Inter 400 weight
- **Buttons**: Inter 500 weight
- **Scale**: text-sm, text-base, text-lg, text-xl, text-2xl

## Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- **Padding**: p-4, p-6, p-8 for cards and sections
- **Margins**: m-2, m-4, m-6 for element spacing
- **Gaps**: gap-4, gap-6 for flex/grid layouts

## Component Library

### Cards
- Clean white/dark surface cards with subtle shadows
- Rounded corners (rounded-lg)
- Border: 1px solid gray-200/gray-700

### Buttons
- **Primary**: Solid blue background, white text, rounded-md
- **Danger/SOS**: Large, prominent red button with bold text
- **Secondary**: Outline style with border
- **Sizes**: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)

### Form Elements
- Input fields with border, focus states, and validation styling
- Error states with red border and helper text
- Success states with green accent
- Consistent padding (p-3) and border radius (rounded-md)

### Navigation
- Simple header with app title and minimal navigation
- Progress indicators for multi-step registration
- Clean back/forward button styling

## Page-Specific Design

### Instructions Page
- Centered content layout with maximum width container
- Numbered or bulleted list format for instructions
- "I Agree" button prominently positioned at bottom
- Clean, readable typography with adequate line spacing

### Registration Page
- Multi-step form with progress indicator
- Form validation with inline error messages
- OTP input with numeric keypad optimization
- Clear field labels and placeholder text
- Responsive two-column layout on desktop

### Home Page
- **Hero Section**: Large SOS/Panic button as primary focal point
- **Travel Details Card**: Clean display of user information
- **Emergency Contacts**: Quick access section
- **Status Indicators**: Visual feedback for app connectivity

## Key Design Principles
1. **Emergency-First**: SOS button must be immediately accessible and unmistakable
2. **High Contrast**: Ensure readability in various lighting conditions
3. **Touch-Friendly**: Large tap targets (minimum 44px) for mobile use
4. **Progressive Disclosure**: Show only necessary information at each step
5. **Accessibility**: WCAG 2.1 AA compliance with proper focus management

## Animations
**Minimal and Purposeful**:
- Subtle fade-in for page transitions (200ms)
- Button press feedback with scale animation
- Loading states for form submissions
- No decorative animations that could delay emergency actions