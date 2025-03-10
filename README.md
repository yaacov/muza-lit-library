# Muza Lit Library

[![npm version](https://badge.fury.io/js/@muza-music%2Fmuza-lit-library.svg)](https://badge.fury.io/js/@muza-music%2Fmuza-lit-library)

A lightweight web components library for displaying music albums and sections using Lit.

![Muza Library Screenshot](art/muza.png)

## Features

- `<music-album` - Display individual music albums with artwork
- `<music-section>` - Create sections of multiple music albums
- `<music-sidebar>` - Navigation sidebar with customizable sections and menu items
- `<music-topbar>` - Top navigation bar with search and volume controls
- `<song-details>` - display song setails - image , name and artist. 

## Installation

```bash
npm install muza-lit-library
```

## Usage

Import and use the components in your HTML:

```html
<!-- Top Navigation Bar -->
<music-topbar></music-topbar>

<!-- Single Album -->
<music-album 
  image-src="art/album.jpg" 
  title="Album Title" 
  sub-title="2023"
></music-album>

<!-- Album Section -->
<music-section 
  title="Featured Albums" 
  albums='[
    {"imageSrc": "art/album1.jpg", "title": "Album 1", "subTitle": "2023"},
    {"imageSrc": "art/album2.jpg", "title": "Album 2", "subTitle": "2023"}
  ]'
></music-section>

<!-- Sidebar Navigation -->
<music-sidebar
  logo-src="art/logo.jpg"
  logo-alt="Music Library">
</music-sidebar>


<song-line details='{
            "src": "songLine.audioUrl",
            "imageSrc": "songLine.imageSrc",
            "title": "songLine.title",
            "artist": "songLine.artist",
            "album": "songLine.album",
            "year": 1988
          }'></song-line>

<song-details details='{
  "imageSrc": "art/imag_2.jpg",
  "title": "song",
  "artist": "song artist"
}' ></song-details>


<script>
  // Configure sidebar sections and items
  const sidebar = document.querySelector('music-sidebar');
  sidebar.sections = [
    {
      title: 'My Muza',
      items: [
        { icon: 'house', text: 'Home' },
        { icon: 'search', text: 'Explore' }
      ]
    },
    {
      title: 'Library',
      items: [
        { icon: 'square-plus', text: 'Playlists' },
        { icon: 'heart', text: 'Albums' }
      ]
    }
  ];
</script>
```

### Topbar Features

The `<music-topbar>` component provides:
- Search functionality with real-time updates
- Volume control with slider
- User menu icon
- Emits events:
  - `search-change`: When search input changes
  - `volume-change`: When volume is adjusted
  - `user-icon-click`: When user icon is clicked

### Sidebar Properties

- `logo-src`: URL of the logo image
- `logo-alt`: Alt text for the logo image
- `sections`: Array of section objects containing:
  - `title`: Section header text
  - `items`: Array of menu items with:
    - `icon`: Font Awesome icon name
    - `text`: Menu item text
    - `action`: Optional click handler function

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## License

MIT License - See LICENSE file for details
