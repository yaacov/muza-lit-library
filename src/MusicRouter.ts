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

// Player interface
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

// Route configuration interface
export interface CustomRouteConfig {
  path: string;
  name: string;
  component: HTMLElement | (() => HTMLElement);
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

  @property({ type: Array })
  routes: CustomRouteConfig[] = [];

  @property({ type: String })
  currentPage = 'home';

  private router: Router = new Router(this, []);

  connectedCallback() {
    super.connectedCallback();
    this.initializeRouter();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('routes') && this.routes.length > 0) {
      this.initializeRouter();
    }
    
    if (changedProps.has('currentPage')) {
      this.dispatchEvent(new CustomEvent('currentPageChanged', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true
      }));
    }
  }

  private initializeRouter() {
    if (!this.routes || this.routes.length === 0) return;

    const routerConfig: RouteConfig[] = this.routes.map(routeConfig => ({
      path: routeConfig.path,
      render: (params: { [key: string]: string | undefined }) => {
        this.currentPage = routeConfig.name;
        
        let component;
        if (typeof routeConfig.component === 'function') {
          component = routeConfig.component();
        } else {
          component = routeConfig.component;
        }

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
    }));

    this.router = new Router(this, routerConfig);
  }

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

    this.player.details = data;
  }

  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.router.goto(path);
  }

  render() {
    return html`<div class="router-outlet">${this.router.outlet()}</div>`;
  }
}