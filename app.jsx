// Tweaks panel for the showreel — typography, accent color, motion intensity, palette.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typography": "round",
  "accent": "#D9B97A",
  "palette": "ink",
  "motion": "medium"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#D9B97A", // champagne
  "#86B5FF", // electric ice
  "#FF6B47", // signal coral
  "#9CFF66"  // acid lime
];

const PALETTE_DEFS = {
  ink:      { bg: "#06080d", surface: "#10141c", border: "#1d2330", paper: "#ECE7DD", muted: "#6C7080" },
  navy:     { bg: "#070b18", surface: "#101732", border: "#1b2547", paper: "#ECE7DD", muted: "#6C7080" },
  graphite: { bg: "#0e0e10", surface: "#181820", border: "#26262e", paper: "#F0EDE6", muted: "#7A7782" }
};

const MOTION_MULT = { subtle: 0.55, medium: 1, heavy: 1.7 };

// Four typography pairings, all in the friendly humanist/rounded family.
// Each pairing supplies display, sans, mono, the display tracking, italic mode,
// and a display weight (rounded sans need 600–800 to feel substantial at the
// massive hero sizes). None of these fonts have a true italic, so emphasis is
// carried by accent color, not slant.
const TYPOGRAPHY_DEFS = {
  round: {
    label: "Round",
    display:    "'Varela Round', ui-sans-serif, -apple-system, sans-serif",
    sans:       "'Varela Round', ui-sans-serif, -apple-system, sans-serif",
    mono:       "'JetBrains Mono', ui-monospace, monospace",
    tighten:    "-.02em",
    italic:     "normal",
    weight:     400    // Varela Round is single-weight; needs no boost
  },
  soft: {
    label: "Soft",
    display:    "'Nunito', ui-sans-serif, -apple-system, sans-serif",
    sans:       "'Nunito', ui-sans-serif, -apple-system, sans-serif",
    mono:       "'JetBrains Mono', ui-monospace, monospace",
    tighten:    "-.025em",
    italic:     "normal",
    weight:     800
  },
  geometric: {
    label: "Geometric",
    display:    "'Quicksand', ui-sans-serif, -apple-system, sans-serif",
    sans:       "'Quicksand', ui-sans-serif, -apple-system, sans-serif",
    mono:       "'Space Mono', ui-monospace, monospace",
    tighten:    "-.02em",
    italic:     "normal",
    weight:     700
  },
  comfort: {
    label: "Comfort",
    display:    "'Comfortaa', ui-sans-serif, -apple-system, sans-serif",
    sans:       "'Mulish', ui-sans-serif, -apple-system, sans-serif",
    mono:       "'IBM Plex Mono', ui-monospace, monospace",
    tighten:    "-.02em",
    italic:     "normal",
    weight:     700
  }
};

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;

    // accent + palette
    r.style.setProperty('--accent', t.accent);
    const p = PALETTE_DEFS[t.palette] || PALETTE_DEFS.ink;
    r.style.setProperty('--bg', p.bg);
    r.style.setProperty('--surface', p.surface);
    r.style.setProperty('--border', p.border);
    r.style.setProperty('--paper', p.paper);
    r.style.setProperty('--muted', p.muted);

    // motion intensity → animation-speed multiplier
    r.style.setProperty('--motion-speed', MOTION_MULT[t.motion] || 1);

    // typography pairing
    const ty = TYPOGRAPHY_DEFS[t.typography] || TYPOGRAPHY_DEFS.round;
    r.style.setProperty('--display', ty.display);
    r.style.setProperty('--sans', ty.sans);
    r.style.setProperty('--mono', ty.mono);
    r.style.setProperty('--display-tighten', ty.tighten);
    r.style.setProperty('--display-italic', ty.italic);
    r.style.setProperty('--display-weight', String(ty.weight));

    // tag body for variant-specific tweaks (e.g. accent on em instead of italic)
    document.body.setAttribute('data-typography', t.typography);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Typography">
        <TweakSelect
          label="Pairing"
          value={t.typography}
          options={[
            { value: 'round',     label: 'Round — Varela Round' },
            { value: 'soft',      label: 'Soft — Nunito' },
            { value: 'geometric', label: 'Geometric — Quicksand' },
            { value: 'comfort',   label: 'Comfort — Comfortaa × Mulish' }
          ]}
          onChange={(v) => setTweak('typography', v)}
        />
      </TweakSection>
      <TweakSection label="Accent">
        <TweakColor
          label="Color"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection label="Palette">
        <TweakRadio
          label="Base"
          value={t.palette}
          options={[
            { value: 'ink', label: 'Ink' },
            { value: 'navy', label: 'Navy' },
            { value: 'graphite', label: 'Graphite' }
          ]}
          onChange={(v) => setTweak('palette', v)}
        />
      </TweakSection>
      <TweakSection label="Motion">
        <TweakRadio
          label="Intensity"
          value={t.motion}
          options={[
            { value: 'subtle', label: 'Subtle' },
            { value: 'medium', label: 'Medium' },
            { value: 'heavy', label: 'Heavy' }
          ]}
          onChange={(v) => setTweak('motion', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
