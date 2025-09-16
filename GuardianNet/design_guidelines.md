# Safety App Design Guidelines

## Design Approach: Utility-Focused with Trust-Building Elements

**Selected Approach:** Design System (Material Design) with trust-focused customizations
**Justification:** Safety applications require immediate clarity, accessibility, and user confidence. The utility-focused nature demands efficiency while trust-building elements ensure user adoption in critical situations.

## Core Design Principles

1. **Immediate Clarity:** Critical functions (SOS) must be instantly recognizable
2. **Trust Through Consistency:** Professional, reliable visual language
3. **Accessibility First:** High contrast, clear typography, touch-friendly targets
4. **Status Communication:** Clear visual indicators for safety zones and connectivity

## Color Palette

**Primary Colors:**
- Emergency Red: 0 85% 50% (SOS button, alerts)
- Safety Green: 120 60% 45% (safe zones, success states)
- Trust Blue: 220 85% 55% (primary actions, headers)

**Supporting Colors:**
- Warning Amber: 45 90% 60% (caution states, offline mode)
- Neutral Gray: 220 10% 20% (text, borders)
- Background: 220 15% 97% (light mode), 220 15% 8% (dark mode)

## Typography

**Font Stack:** Inter (Google Fonts)
- Headers: 600 weight, 24px-32px
- Body: 400 weight, 16px-18px  
- Buttons/Labels: 500 weight, 14px-16px
- Critical text (SOS): 700 weight, 18px+

## Layout System

**Spacing Units:** Tailwind 4, 6, 8, 12, 16
- Component padding: 4-6 units
- Section gaps: 8-12 units
- Critical button spacing: 16 units minimum

## Component Library

### Critical Components
- **SOS Button:** Large (min 80px), high contrast, thumb-friendly
- **Status Indicators:** Clear icons with color + text labels
- **Zone Display:** Map-based with clear safe/unsafe overlays
- **Connection Status:** Persistent indicator for LoRa/internet connectivity

### Forms & Input
- **KYC Forms:** Multi-step with clear progress indication
- **Input Fields:** Large touch targets, validation feedback
- **File Uploads:** Drag-and-drop with preview capabilities

### Navigation & Layout
- **Bottom Navigation:** Primary app functions always accessible
- **Header:** Status information and emergency access
- **Cards:** Clean containers for dashboard information

### Admin Dashboard
- **Data Tables:** Sortable, filterable SOS alerts and user data
- **Map Integration:** Real-time location display with clustering
- **Alert System:** Prominent notifications for new SOS signals

## Interactions & States

**Critical States:**
- SOS Active: Full-screen overlay with countdown
- Offline Mode: Persistent banner with sync status
- Emergency: High-contrast mode with simplified interface

**Feedback:**
- Haptic feedback for SOS button
- Audio confirmations for critical actions
- Visual progress for background sync operations

## Images & Media

**Hero Elements:**
- No large hero images (utility-focused)
- Small contextual icons for features
- Map-based visuals for location services
- Simple illustrations for onboarding flow

**Icon Strategy:**
- Material Icons for consistency
- Custom emergency icons where needed
- High contrast variants for accessibility

## Accessibility Considerations

- Minimum 44px touch targets
- WCAG AA color contrast ratios
- Screen reader optimization for critical functions
- Keyboard navigation support for admin dashboard
- Consistent dark mode throughout (forms, inputs, admin panels)

## Mobile-First Considerations

- One-handed operation for emergency functions
- Large, easily-accessible SOS button
- Swipe gestures for quick actions
- Offline-first design patterns
- Battery-conscious UI updates

This design framework prioritizes user safety and trust while maintaining the professional appearance needed for both tourist users and administrative oversight.