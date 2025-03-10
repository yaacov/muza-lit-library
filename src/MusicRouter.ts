import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Router, RouteConfig, PathRouteConfig } from '@lit-labs/router';
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

// Our custom route configuration interface
export interface CustomRouteConfig {
  path: string;
  name: string;
  component: HTMLElement | (() => HTMLElement);
  // For parameterized routes
  params?: Record<string, string>;
}

@customElement('music-router')
export class MusicRouter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: var(--muza-router-width, 100%);
    }

    .router-outlet {
      width: 100%;
    }
  `;

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

  // Array of route configurations
  @property({ type: Array })
  routes: CustomRouteConfig[] = [];

  // Keep track of currently selected page
  @property({ type: String })
  currentPage = 'home';

  // Reference to the router - initialized in constructor
  private router: Router = new Router(this, []);

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeRouter();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('routes') && this.routes.length > 0) {
      this.initializeRouter();
    }
  }

  // Initialize router with the provided routes
  private initializeRouter() {
    if (!this.routes || this.routes.length === 0) return;

    // Convert our custom route config to the format expected by Router
    const routerConfig: RouteConfig[] = this.routes.map(routeConfig => {
      const pathConfig: PathRouteConfig = {
        path: routeConfig.path,
        render: (params: { [key: string]: string | undefined }) => {
          this.currentPage = routeConfig.name;
          
          // Handle component function or element
          let component;
          if (typeof routeConfig.component === 'function') {
            component = routeConfig.component();
          } else {
            component = routeConfig.component;
          }

          // If it's a parameterized route, dispatch event with params
          if (routeConfig.path.includes(':')) {
            this.dispatchEvent(new CustomEvent('route-params-changed', {
              detail: { 
                params: params as Record<string, string>, 
                routeName: routeConfig.name 
              },
              bubbles: true,
              composed: true
            }));
          }

          return component;
        }
      };

      return pathConfig;
    });

    // Initialize router with new config
    this.router = new Router(this, routerConfig);
  }

  // Method to play a song
  playSong(song: ExtendedSongDetails) {
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

  // Generic navigation method
  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.router.goto(path);
  }

  render() {
    return html`<div class="router-outlet">${this.router ? this.router.outlet() : html`<slot></slot>`}</div>`;
  }
}