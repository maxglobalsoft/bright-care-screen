export const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uSage;
  uniform vec3 uOrange;
  uniform vec3 uCream;
  uniform vec3 uDeep;

  // hash & simplex-ish noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  float blob(vec2 uv, vec2 c, float r) {
    float d = length(uv - c);
    return smoothstep(r, 0.0, d);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    float t = uTime * 0.18;

    // warp
    vec2 warp = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 5.2)) - 0.5;
    vec2 pw = p + warp * 0.35;

    // moving blobs
    vec2 c1 = vec2(sin(t * 1.1) * 0.35, cos(t * 0.9) * 0.45 + 0.05);
    vec2 c2 = vec2(cos(t * 0.7 + 1.3) * 0.4, sin(t * 1.3) * 0.35 - 0.1);
    vec2 c3 = vec2(sin(t * 0.5 + 2.1) * 0.5, cos(t * 0.6 + 0.8) * 0.5);

    float b1 = blob(pw, c1, 0.55);
    float b2 = blob(pw, c2, 0.5);
    float b3 = blob(pw, c3, 0.6);

    // base deep sage background
    vec3 col = uDeep;
    col = mix(col, uSage, b1);
    col = mix(col, uOrange, b2 * 0.75);
    col = mix(col, uCream, b3 * 0.35);

    // subtle noise grain
    float grain = (fbm(uv * 800.0) - 0.5) * 0.03;
    col += grain;

    // vignette
    float vig = smoothstep(1.1, 0.35, length(p));
    col *= mix(0.75, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;
