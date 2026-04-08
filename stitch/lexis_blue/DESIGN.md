# Design System Specification: The Authoritative Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Notary"**

This design system moves away from the "generic SaaS" look and toward a high-end, editorial experience that feels as permanent and reliable as a physical legal document. We achieve this through **The Digital Notary** aesthetic: a philosophy of visual weight, intentional asymmetry, and "The No-Line Rule."

Instead of standard grids, we use breathing room and sophisticated tonal layering to guide the user. The goal is to make the process of generating a rent agreement feel less like "filling out a form" and more like "drafting a manifesto." We break the template feel by using high-contrast typography scales (Manrope for authority, Inter for utility) and overlapping surfaces that mimic the stacking of fine parchment.

---

## 2. Colors & Surface Philosophy

### The Tonal Palette
Our palette is anchored in `primary` (#002045)—a deep, midnight blue that signals absolute legal authority. We avoid "pure" blacks, opting for the `on_surface` (#181c1e) to maintain a premium softness.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual clutter that distracts from legal clarity. Boundaries must be defined through:
1.  **Background Color Shifts:** A `surface_container_low` section sitting on a `surface` background.
2.  **Tonal Transitions:** Using `surface_container_highest` for interactive elements against a `surface_container` backdrop.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
*   **The Foundation:** Use `surface` (#f7fafc) for the main application background.
*   **The Workspace:** Use `surface_container_lowest` (#ffffff) for the actual document or "paper" area.
*   **The Utility:** Use `surface_container` (#ebeef0) for sidebars and navigation panels.

### The "Glass & Gradient" Rule
To inject "soul" into the professional aesthetic:
*   **Signature Gradients:** For primary CTAs, use a subtle linear gradient from `primary` (#002045) to `primary_container` (#1a365d) at a 135-degree angle.
*   **Glassmorphism:** For floating "Success" toasts or "Most Popular" badges, use `surface_bright` at 80% opacity with a 12px backdrop-blur.

---

## 3. Typography
We use a dual-font system to balance "Legal Authority" with "Modern Tech."

*   **Display & Headlines (Manrope):** These are our "Editorial" weights. Use `display-lg` for hero sections and `headline-sm` for agreement section titles. The geometric nature of Manrope provides a contemporary architectural feel.
*   **Body & Labels (Inter):** Inter is our "Utility" weight. It is used for the fine print, input labels, and legal clauses. Its high x-height ensures readability even at `body-sm` sizes.

**Hierarchy Note:** Always pair a `headline-md` (Manrope) with a `body-lg` (Inter) to create a clear distinction between "The Concept" and "The Detail."

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" rather than "shadowing." 
*   **Example:** Place a `surface_container_lowest` card (the Rent Agreement) on top of a `surface_container_low` background. The contrast in light is enough to signal elevation.

### Ambient Shadows
Where floating elements (like Modals or Dropdowns) are required, use "Ambient Shadows":
*   **Values:** `0px 20px 40px rgba(24, 28, 30, 0.06)`
*   **The Ghost Border Fallback:** If accessibility requires a border, use `outline_variant` (#c4c6cf) at **15% opacity**. This creates a "suggestion" of a boundary without the harshness of a solid line.

---

## 5. Components

### Refined Input Fields
*   **Styling:** No borders. Use `surface_container_highest` (#e0e3e5) as the background fill. 
*   **Focus State:** Transition the background to `primary_fixed` (#d6e3ff) and add a subtle 2px bottom-accent in `primary`.
*   **Corner Radius:** Use `md` (0.375rem) for a precise, tailored look.

### Buttons (The "Call to Action")
*   **Primary:** `primary` background, `on_primary` text. Apply `lg` (0.5rem) roundedness. Use a subtle shadow that inherits the `primary` hue at 10% opacity.
*   **Secondary:** `surface_container_high` background. No border. Text in `on_surface_variant`.
*   **Most Popular Badge:** Use `tertiary_fixed` (#ffddba) with `on_tertiary_fixed` text. This provides a warm, gold-like "premium" accent against the deep blues.

### Cards & Document Sections
*   **Constraint:** Forbid the use of divider lines. 
*   **Solution:** Separate content blocks using the Spacing Scale (typically 32px or 48px of vertical `surface` space) or by nesting a `surface_container_lowest` card inside a `surface_container` wrapper.

### Specialized Legal-Tech Components
*   **Clause Toggle:** A custom switch using `primary` for the active state, signifying "Agreed" or "Included."
*   **Signature Pad:** A high-contrast `surface_container_lowest` area with a `ghost-border` to simulate the importance of a physical signature line.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical white space. If a form is on the left, let the right side breathe with a high-level summary.
*   **Do** use `inverse_surface` for dark-mode tooltips to ensure they pop against the light document background.
*   **Do** use fast, 200ms "Spring" transitions (Framer Motion style) for hover states to mimic the responsiveness of high-end software.

### Don’t:
*   **Don't** use 100% opaque grey borders. It breaks the "Editorial" flow.
*   **Don't** use standard blue for links. Use `primary` for a more authoritative, grounded feel.
*   **Don't** crowd the text. Legal documents are intimidating; the UI should feel like it's providing "room to breathe."