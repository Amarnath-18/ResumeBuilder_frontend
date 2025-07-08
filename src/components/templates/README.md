# Template Selection Component

## Overview

The Template Selection component provides users with a comprehensive interface to choose from multiple professional resume templates. Each template is designed for different industries and professional levels.

## Features

### 🎨 Six Professional Templates

1. **Modern Professional** - Clean and contemporary design
2. **Classic Traditional** - Traditional format for conservative industries
3. **Creative Design** - Bold template for design-focused roles
4. **Minimal Clean** - Minimalist design focusing on content clarity
5. **Executive Premium** - Premium template for senior-level positions
6. **Tech Professional** - Modern template optimized for tech professionals

### ✨ Key Features

- **Live Preview**: See how your resume will look in real-time
- **Responsive Design**: Works on all device sizes
- **Easy Switching**: Change templates anytime without losing data
- **Industry-Specific**: Templates designed for different professional fields
- **ATS-Friendly**: Templates optimized for Applicant Tracking Systems
- **Modal Preview**: Full-size preview in a modal window

## Component Structure

```
components/
├── TemplateSelection.jsx          # Main template selection interface
├── templates/
│   ├── TemplatePreview.jsx       # Template preview wrapper
│   ├── ModernTemplate.jsx        # Modern professional template
│   ├── ClassicTemplate.jsx       # Classic traditional template
│   ├── CreativeTemplate.jsx      # Creative design template
│   ├── MinimalTemplate.jsx       # Minimal clean template
│   ├── ExecutiveTemplate.jsx     # Executive premium template
│   └── TechTemplate.jsx         # Tech professional template
└── TemplateSelectionDemo.jsx     # Demo component
```

## Usage

### Basic Implementation

```jsx
import React from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import TemplateSelection from '../components/TemplateSelection';

const App = () => {
  return (
    <ResumeProvider>
      <TemplateSelection />
    </ResumeProvider>
  );
};
```

### Integration with Resume Builder

The component is already integrated into the main Builder flow:

```jsx
// In Builder.jsx
const steps = [
  // ... other steps
  { title: "Template", component: TemplateSelection, icon: "🎨" },
  // ... other steps
];
```

### Context Integration

The component uses the ResumeContext to:
- Get current template selection (`currentTemplate`)
- Set new template selection (`setCurrentTemplate`)
- Access resume data for live preview (`resumeData`)

## Template Data Structure

Each template expects data in this format:

```javascript
{
  personalInfo: {
    fullName: "string",
    email: "string",
    phone: "string",
    address: "string",
    website: "string",
    linkedin: "string",
    summary: "string"
  },
  experience: [
    {
      company: "string",
      position: "string",
      startDate: "string",
      endDate: "string",
      description: "string"
    }
  ],
  education: [
    {
      school: "string",
      degree: "string",
      graduationDate: "string"
    }
  ],
  skills: ["string"],
  projects: [
    {
      name: "string",
      description: "string"
    }
  ],
  certifications: [
    {
      name: "string",
      date: "string"
    }
  ]
}
```

## Template Characteristics

### Modern Template
- **Best for**: General professional use
- **Design**: Clean, contemporary with blue accents
- **Features**: Professional header, clear sections, skill tags

### Classic Template
- **Best for**: Conservative industries (finance, law, government)
- **Design**: Traditional black and white format
- **Features**: Centered header, uppercase section titles, bullet points

### Creative Template
- **Best for**: Design, marketing, creative industries
- **Design**: Purple/pink gradient with visual elements
- **Features**: Colorful header, sidebar layout, emoji icons

### Minimal Template
- **Best for**: Modern professionals who prefer simplicity
- **Design**: Ultra-clean with lots of white space
- **Features**: Light typography, minimal styling, content focus

### Executive Template
- **Best for**: Senior-level positions and leadership roles
- **Design**: Professional with dark header and structured layout
- **Features**: Executive summary, bordered sections, premium styling

### Tech Template
- **Best for**: Software developers, engineers, IT professionals
- **Design**: Teal/cyan theme with tech-focused elements
- **Features**: Skills with progress bars, project showcase, tech icons

## Customization

### Adding New Templates

1. Create a new template component in `/templates/` folder:
```jsx
// NewTemplate.jsx
import React from 'react';

const NewTemplate = ({ data, className = "" }) => {
  return (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${className}`}>
      {/* Your template design */}
    </div>
  );
};

export default NewTemplate;
```

2. Add the template to the TemplatePreview component
3. Add template configuration to the TemplateSelection component

### Styling

All templates use Tailwind CSS for styling. Key classes:
- Layout: `grid`, `flex`, `space-y-*`, `gap-*`
- Typography: `text-*`, `font-*`, `leading-*`
- Colors: `text-gray-*`, `bg-gray-*`, `border-gray-*`
- Spacing: `p-*`, `m-*`, `mb-*`, `mt-*`

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Responsive design works on mobile, tablet, and desktop
- Print-friendly styling for PDF generation

## Performance

- Lazy loading of template previews
- Optimized re-renders using React context
- Efficient DOM updates with proper key props

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast ratios
- Focus indicators

## Testing

To test the template selection:

1. Run the demo component:
```jsx
import TemplateSelectionDemo from './components/TemplateSelectionDemo';
// Render TemplateSelectionDemo
```

2. Or integrate into the main Builder flow and navigate to the Template step

## Future Enhancements

- [ ] Template customization options (colors, fonts)
- [ ] More template variations
- [ ] Template categories and filtering
- [ ] Template ratings and popularity
- [ ] Custom template upload
- [ ] Template sharing functionality
