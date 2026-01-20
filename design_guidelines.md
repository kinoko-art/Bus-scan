# Design Guidelines: Hiroden Bus Destination Verification App

## Design Approach

**Selected Framework:** Material Design (adapted for maximum accessibility)

**Rationale:** This utility-focused mobile app prioritizes usability and clarity for elderly users and tourists. Material Design provides strong visual feedback patterns, excellent accessibility guidelines, and proven mobile camera interface patterns that align perfectly with the app's OCR scanning functionality.

## Core Design Principles

1. **Immediate Clarity** - Users must understand their next action within 2 seconds
2. **Large Touch Targets** - All interactive elements minimum 56px height
3. **High Contrast** - Ensure readability in outdoor lighting conditions
4. **Minimal Cognitive Load** - One primary action visible at any time

## Typography

**Font Family:** 
- Primary: Noto Sans JP (Google Fonts) - excellent Japanese character support
- Fallback: system-ui, sans-serif

**Type Scale:**
- Hero/Results: 48px, bold (destination match indicators)
- Primary Headings: 24px, semi-bold
- Body Text: 18px, regular (larger than typical for elderly accessibility)
- Labels: 14px, medium
- Route Numbers: 32px, bold (high visibility)

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, and 8 (p-4, mt-6, mb-8)
- Consistent 24px (p-6) padding for main content areas
- 32px (space-y-8) vertical rhythm between major sections
- 16px (p-4) for compact elements like buttons

**Container Structure:**
- Full viewport height sections for each app state
- max-w-2xl centered container for content
- Mobile-first: Base styles for 360px+ viewports

## Component Library

### 1. Camera Interface
- Full-screen camera viewfinder (100vh)
- Centered capture button (80px diameter, elevated with shadow)
- Top bar with destination input (56px height, fixed position)
- Grid overlay (subtle) to guide bus display board alignment
- Flash toggle button (top-right corner)

### 2. Destination Input
- Large text input field (56px height)
- Placeholder: "目的地を入力 (例: 八丁堀)"
- Clear button (×) when text entered
- Floating label pattern when focused

### 3. Judgment Display
- Full-screen result state
- Giant ◯ or × symbol (200px) centered
- ◯ Green (#4CAF50) with subtle glow effect
- × Red (#F44336) with subtle glow effect
- Destination name displayed prominently below symbol (32px)
- "このバスに乗れます" / "このバスには乗れません" confirmation text

### 4. Candidate Routes Section
- Horizontal scrollable chip list
- Each route chip: 48px height, rounded-full
- Route number + destination name
- Active state: filled background
- Inactive state: outlined style
- Bottom sheet pattern (slides up from bottom)

### 5. Scan Button
- Primary action: "スキャン開始" (Start Scan)
- 56px height, full-width on mobile
- Elevated button style with camera icon
- Background: Material Blue (#2196F3)

### 6. Navigation
- Minimal top bar (64px height)
- App title: "バス行先確認"
- Back button (when in camera/results mode)
- Settings icon (gear, top-right) for future features

## Visual Feedback Patterns

**Scanning States:**
1. **Idle:** Blue scan button with subtle pulse animation
2. **Processing:** Circular progress indicator, "認識中..." text
3. **Success:** Brief checkmark animation before showing results
4. **Error:** Shake animation + error message toast

**Interactive Feedback:**
- Button press: Scale down to 0.95
- Haptic feedback on major actions (camera capture, result display)
- Toast messages: Bottom-center, 4 seconds duration

## Images

**Hero Section:** Not applicable - this is a utility app with camera-first interface

**Placeholder Images:**
- Example bus display board image in onboarding/tutorial (if added)
- Icon illustrations for empty states

## Accessibility Standards

- WCAG AA contrast ratios minimum (4.5:1 for text)
- Focus indicators: 3px solid outline
- Screen reader labels for all interactive elements
- Japanese voice-over support for result announcements
- Large text mode compatibility

## State Management & Screens

**Screen Flow:**
1. **Home/Input** - Destination input + scan button
2. **Camera** - Live viewfinder + capture controls
3. **Processing** - Loading state with progress
4. **Results** - Judgment display + candidate routes
5. **Error** - Retry option with helpful guidance

**Empty States:**
- No destination entered: Disabled scan button
- OCR failed: "もう一度撮影してください" with retry button
- No matches: Helpful message suggesting route alternatives

## Mobile-Specific Considerations

- Safe area insets for notched devices
- Prevent zoom on input focus
- Landscape mode disabled (portrait only for consistency)
- Pull-to-refresh disabled (prevent accidental triggers)
- Bottom navigation zone (56px) reserved for primary actions

This design creates a trustworthy, accessible tool that elderly users and tourists can confidently use to verify bus destinations through a simple, stress-free scanning experience.