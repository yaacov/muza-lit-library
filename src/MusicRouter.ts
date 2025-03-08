import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import type { SongDetails } from './models';

// Define interfaces for album data structure
interface Album {
  id: string;
  imageSrc: string;
  title: string;
  subTitle: string;
  artist: string;
  songs?: number[];
}

interface AlbumCollection {
  featured: Album[];
  newReleases: Album[];
  recommended: Album[];
}

// Extended song details that includes albumId
interface ExtendedSongDetails extends SongDetails {
  albumId?: string;
  id?: number;
}

// Player interface to replace 'any' type
interface MusicPlayer {
  details: {
    src: string;
    imageSrc: string;
    title: string;
    artist: string;
    album: string;
    year: number;
    isPlaying: boolean;
  };
  updateVolume?: (volume: number) => void;
}

@customElement('music-router')
export class MusicRouter extends LitElement {
  @property({ type: Object })
  albums: AlbumCollection = {
    featured: [],
    newReleases: [],
    recommended: [],
  };

  @property({ type: Array })
  songs: ExtendedSongDetails[] = [];

  @property({ type: Object })
  player: MusicPlayer | null = null;

  // Keep track of currently selected page
  @property({ type: String })
  currentPage = 'home';

  // Reference to the router
  private router: Router;

  constructor() {
    super();

    // Initialize router with routes
    this.router = new Router(this, [
      {
        path: '/',
        render: () => {
          this.currentPage = 'home';
          return this.renderHomePage();
        },
      },
      {
        path: '/explore',
        render: () => {
          this.currentPage = 'explore';
          return this.renderExplorePage();
        },
      },
      {
        path: '/playlists',
        render: () => {
          this.currentPage = 'playlists';
          return this.renderPlaylistsPage();
        },
      },
      {
        path: '/albums',
        render: () => {
          this.currentPage = 'albums';
          return this.renderAlbumsPage();
        },
      },
      {
        path: '/artists',
        render: () => {
          this.currentPage = 'artists';
          return this.renderArtistsPage();
        },
      },
      {
        path: '/songs',
        render: () => {
          this.currentPage = 'songs';
          return this.renderSongsPage();
        },
      },
      {
        path: '/album/:id',
        render: (params) => {
          this.currentPage = 'album-detail';
          return this.renderAlbumDetail(params.id || '');
        },
      },
    ]);
  }

  // Main home page with all sections
  private renderHomePage() {
    return html`
      <div class="home-content">
        <slot name="home-content"></slot>
      </div>
    `;
  }

  // Song listing page
  private renderSongsPage() {
    // Move map operation outside of template
    const songElements = this.songs.map((song) => this.renderSong(song));

    return html`
      <div class="songs-content">
        <h2>All Songs</h2>
        <div id="songs-container">${songElements}</div>
      </div>
    `;
  }

  // Album listing page
  private renderAlbumsPage() {
    // Get albums from all categories
    const featuredAlbums = this.albums.featured || [];
    const newReleases = this.albums.newReleases || [];
    const recommended = this.albums.recommended || [];
    const allAlbums = [...featuredAlbums, ...newReleases, ...recommended];

    // Move map operation outside of template
    const albumElements = allAlbums.map(
      (album) => html`
        <music-album
          image-src=${album.imageSrc}
          title=${album.title}
          sub-title=${album.subTitle}
          @album-selected=${() => this.navigateToAlbum(album.id)}
        >
        </music-album>
      `
    );

    return html`
      <div class="albums-content">
        <h2>All Albums</h2>
        <div class="albums-grid">${albumElements}</div>
      </div>
    `;
  }

  // Album detail page
  private renderAlbumDetail(id: string) {
    // Find album by id from all categories
    const featuredAlbums = this.albums.featured || [];
    const newReleases = this.albums.newReleases || [];
    const recommended = this.albums.recommended || [];
    const allAlbums = [...featuredAlbums, ...newReleases, ...recommended];
    const album = allAlbums.find((a) => a.id === id);

    if (!album) {
      return html`<div>Album not found</div>`;
    }

    // Get songs for this album
    const albumSongs = this.songs.filter((song) => song.albumId === id);

    // Move map operation outside of template
    const songElements = albumSongs.map((song) => this.renderSong(song));

    return html`
      <div class="album-detail">
        <div class="album-header">
          <img src=${album.imageSrc} alt=${album.title} />
          <div class="album-info">
            <h1>${album.title}</h1>
            <h3>${album.artist} • ${album.subTitle}</h3>
          </div>
        </div>

        <div class="album-songs">${songElements}</div>
      </div>
    `;
  }

  // Template placeholders for other routes
  private renderExplorePage() {
    return html`<h2>Explore Music</h2>
      <p>Discover new music here...</p>`;
  }

  private renderPlaylistsPage() {
    return html`<h2>Your Playlists</h2>
      <p>Playlists will appear here...</p>`;
  }

  private renderArtistsPage() {
    return html`<h2>Artists</h2>
      <p>Your favorite artists will appear here...</p>`;
  }

  // Helper method to render a song with click handler
  private renderSong(song: ExtendedSongDetails) {
    // Type cast the element to include details property
    const songLine = document.createElement('song-line') as HTMLElement & {
      details: ExtendedSongDetails;
    };
    songLine.details = song;
    songLine.addEventListener('click', () => this.playSong(song));
    return songLine;
  }

  // Method to play a song - preserves the existing music playing logic
  private playSong(song: ExtendedSongDetails) {
    if (!this.player || !song) return;

    const data = {
      src: song.audioUrl || '',
      imageSrc: song.imageSrc || '',
      title: song.title || '',
      artist: song.artist || '',
      album: song.album || '',
      year: song.year || 0,
      isPlaying: true,
    };

    // Update the player details
    this.player.details = data;
  }

  // Navigation methods
  navigateToHome() {
    window.history.pushState({}, '', '/');
    this.router.goto('/');
  }

  navigateToExplore() {
    window.history.pushState({}, '', '/explore');
    this.router.goto('/explore');
  }

  navigateToPlaylists() {
    window.history.pushState({}, '', '/playlists');
    this.router.goto('/playlists');
  }

  navigateToAlbums() {
    window.history.pushState({}, '', '/albums');
    this.router.goto('/albums');
  }

  navigateToArtists() {
    window.history.pushState({}, '', '/artists');
    this.router.goto('/artists');
  }

  navigateToSongs() {
    window.history.pushState({}, '', '/songs');
    this.router.goto('/songs');
  }

  navigateToAlbum(id: string) {
    window.history.pushState({}, '', `/album/${id}`);
    this.router.goto(`/album/${id}`);
  }

  render() {
    return html`<div class="router-outlet">${this.router.outlet()}</div>`;
  }
}
