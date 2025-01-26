# Muza Lit Library

A lightweight web components library for displaying music tracks and sections using Lit.

## Features

- `<music-track>` - Display individual music tracks with artwork
- `<music-section>` - Create sections of multiple music tracks

## Installation

```bash
npm install muza-lit-library
```

## Usage

Import and use the components in your HTML:

```html
<!-- Single Track -->
<music-track 
  image-src="art/track.jpg" 
  title="Track Title" 
  sub-title="2023"
></music-track>

<!-- Track Section -->
<music-section 
  title="Featured Tracks" 
  tracks='[
    {"imageSrc": "art/track1.jpg", "title": "Track 1", "subTitle": "2023"},
    {"imageSrc": "art/track2.jpg", "title": "Track 2", "subTitle": "2023"}
  ]'
></music-section>
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## License

MIT License - See LICENSE file for details
