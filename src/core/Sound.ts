import * as Tone from "tone";

export const rockSynth = new Tone.PolySynth(Tone.Synth, {
  maxPolyphony: 8, // or higher if needed
  volume: 0,
  envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
}).toDestination();
