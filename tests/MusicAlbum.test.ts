import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { MusicAlbum } from '../src/MusicAlbum';

describe('MusicAlbum', () => {
  it('is defined', () => {
    const el = document.createElement('music-album');
    expect(el).toBeInstanceOf(MusicAlbum);
  });

  it('renders with default properties', async () => {
    const el = await fixture<MusicAlbum>(html`<music-album></music-album>`);

    expect(el.imageSrc).toBe('');
    expect(el.title).toBe('');
    expect(el.subTitle).toBe('');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('');
    expect(h3?.textContent).toBe('');
    expect(p?.textContent).toBe('');
  });

  it('renders with provided properties', async () => {
    const el = await fixture<MusicAlbum>(html`
      <music-album
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test Artist"
      ></music-album>
    `);

    expect(el.imageSrc).toBe('test.jpg');
    expect(el.title).toBe('Test Album');
    expect(el.subTitle).toBe('Test Artist');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(h3?.textContent).toBe('Test Album');
    expect(p?.textContent).toBe('Test Artist');
  });

  it('dispatches album-selected event on click', async () => {
    const el = await fixture<MusicAlbum>(html`
      <music-album
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test Artist"
      ></music-album>
    `);

    let eventDetail: unknown;
    el.addEventListener('album-selected', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const container = el.shadowRoot!.querySelector('div');
    container?.click();

    expect(eventDetail).toEqual({
      title: 'Test Album',
      subTitle: 'Test Artist',
      imageSrc: 'test.jpg',
    });
  });
});
