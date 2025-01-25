import { describe, it, expect } from "vitest";
import { MusicTrack } from "../src/MusicTrack";
import { fixture, html } from "@open-wc/testing";

describe("MusicTrack", () => {
  it("renders with default properties", async () => {
    const el = await fixture<MusicTrack>(html`<music-track></music-track>`);
    
    // Wait for element to be updated
    await el.updateComplete;
    
    expect(el.imageSrc).toBe("");
    expect(el.title).toBe("");
    expect(el.subTitle).toBe("");
  });

  it("renders with custom properties", async () => {
    const el = await fixture<MusicTrack>(
      html`<music-track
        imageSrc="test.jpg"
        title="Test Song"
        subTitle="Test Artist"
      ></music-track>`
    );

    expect(el.imageSrc).toBe("test.jpg");
    expect(el.title).toBe("Test Song");
    expect(el.subTitle).toBe("Test Artist");

    const img = el.shadowRoot?.querySelector("img");
    const h3 = el.shadowRoot?.querySelector("h3");
    const p = el.shadowRoot?.querySelector("p");

    expect(img?.src).to.contain("test.jpg");
    expect(h3?.textContent).toBe("Test Song");
    expect(p?.textContent).toBe("Test Artist");
  });
});
