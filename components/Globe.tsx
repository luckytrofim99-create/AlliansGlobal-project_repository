"use client";

import { useEffect, useId, useRef } from "react";
import { useAllianceLocale, tx } from "./alliance/AllianceLocale";

type Coordinate = readonly [longitude: number, latitude: number];
type Projected = { x: number; y: number; depth: number };
type Projection = (coordinate: Coordinate, elevation?: number) => Projected;

const CENTER = 450;
const RADIUS = 338;
const RADIAN = Math.PI / 180;
const INITIAL_LONGITUDE = -18;
const GOLD = "#c8aa73";

// Deliberately simplified coastlines. The geometry lives locally, so the globe
// never depends on a mapping service, a remote asset, or a WebGL context.
const CONTINENTS: readonly (readonly Coordinate[])[] = [
  [
    [-168, 71],
    [-149, 71],
    [-139, 69],
    [-131, 70],
    [-125, 72],
    [-111, 75],
    [-96, 74],
    [-86, 70],
    [-78, 73],
    [-66, 68],
    [-60, 61],
    [-64, 56],
    [-56, 53],
    [-60, 47],
    [-67, 45],
    [-71, 41],
    [-75, 36],
    [-80, 32],
    [-81, 25],
    [-84, 30],
    [-89, 29],
    [-96, 23],
    [-98, 19],
    [-91, 18],
    [-87, 16],
    [-84, 11],
    [-78, 8],
    [-82, 9],
    [-88, 15],
    [-96, 16],
    [-103, 20],
    [-109, 24],
    [-114, 29],
    [-117, 32],
    [-123, 40],
    [-125, 49],
    [-132, 55],
    [-140, 59],
    [-148, 60],
    [-155, 57],
    [-163, 58],
    [-168, 64],
  ],
  [
    [-73, 59],
    [-49, 60],
    [-42, 67],
    [-23, 72],
    [-20, 80],
    [-35, 83],
    [-52, 82],
    [-63, 76],
    [-61, 69],
  ],
  [
    [-81, 12],
    [-75, 10],
    [-71, 12],
    [-64, 10],
    [-60, 7],
    [-51, 4],
    [-48, -1],
    [-35, -5],
    [-35, -12],
    [-40, -22],
    [-48, -28],
    [-53, -33],
    [-57, -39],
    [-65, -54],
    [-70, -55],
    [-74, -48],
    [-75, -40],
    [-72, -30],
    [-70, -19],
    [-76, -9],
    [-80, -3],
    [-81, 5],
  ],
  [
    [-17, 15],
    [-17, 21],
    [-11, 29],
    [-5, 36],
    [5, 37],
    [11, 33],
    [20, 33],
    [25, 31],
    [32, 31],
    [35, 27],
    [34, 20],
    [40, 13],
    [51, 12],
    [45, 3],
    [42, -2],
    [40, -12],
    [35, -20],
    [32, -26],
    [24, -34],
    [18, -35],
    [14, -28],
    [12, -18],
    [13, -8],
    [9, -1],
    [4, 5],
    [-3, 5],
    [-9, 5],
    [-15, 11],
  ],
  [
    [-10, 36],
    [-9, 43],
    [-2, 44],
    [-5, 49],
    [1, 51],
    [7, 54],
    [9, 57],
    [5, 59],
    [8, 63],
    [17, 69],
    [29, 71],
    [35, 68],
    [42, 67],
    [53, 69],
    [68, 70],
    [80, 73],
    [104, 77],
    [119, 73],
    [139, 72],
    [154, 68],
    [170, 65],
    [179, 67],
    [177, 59],
    [164, 55],
    [157, 51],
    [151, 46],
    [142, 45],
    [136, 48],
    [130, 43],
    [123, 39],
    [121, 31],
    [117, 25],
    [110, 20],
    [108, 12],
    [104, 9],
    [103, 2],
    [99, 8],
    [96, 17],
    [90, 22],
    [87, 22],
    [81, 8],
    [77, 9],
    [72, 20],
    [68, 24],
    [62, 25],
    [57, 26],
    [56, 19],
    [51, 14],
    [44, 13],
    [38, 21],
    [35, 29],
    [30, 31],
    [26, 36],
    [23, 36],
    [24, 40],
    [20, 39],
    [18, 41],
    [16, 38],
    [13, 38],
    [12, 44],
    [7, 44],
    [4, 43],
    [0, 40],
    [-5, 36],
  ],
  [
    [-11, 51],
    [-7, 55],
    [-6, 58],
    [-3, 59],
    [-1, 54],
    [1, 52],
    [-2, 50],
  ],
  [
    [-25, 63],
    [-22, 67],
    [-15, 66],
    [-13, 64],
    [-18, 63],
  ],
  [
    [113, -22],
    [114, -29],
    [119, -34],
    [129, -32],
    [136, -35],
    [141, -38],
    [149, -38],
    [153, -29],
    [151, -23],
    [146, -18],
    [142, -11],
    [136, -12],
    [131, -12],
    [126, -15],
    [121, -18],
    [116, -20],
  ],
  [
    [166, -34],
    [178, -38],
    [175, -42],
    [169, -46],
    [166, -45],
    [172, -40],
  ],
  [
    [47, -13],
    [50, -16],
    [49, -23],
    [45, -26],
    [44, -20],
  ],
  [
    [130, 32],
    [132, 35],
    [136, 36],
    [140, 40],
    [142, 45],
    [145, 44],
    [143, 39],
    [139, 35],
    [134, 33],
  ],
  [
    [95, 5],
    [103, -1],
    [106, -6],
    [113, -7],
    [119, -8],
    [115, -3],
    [109, 1],
    [108, 7],
    [114, 7],
    [119, 1],
    [125, 1],
    [130, -3],
    [139, -3],
    [145, -7],
    [137, -9],
    [129, -6],
    [121, -9],
    [113, -9],
    [106, -7],
    [100, -2],
  ],
];

function containsPoint(
  longitude: number,
  latitude: number,
  polygon: readonly Coordinate[],
) {
  let inside = false;
  for (
    let index = 0, previous = polygon.length - 1;
    index < polygon.length;
    previous = index++
  ) {
    const [x, y] = polygon[index];
    const [previousX, previousY] = polygon[previous];
    if (
      y > latitude !== previousY > latitude &&
      longitude < ((previousX - x) * (latitude - y)) / (previousY - y) + x
    )
      inside = !inside;
  }
  return inside;
}

const LAND_POINTS: Coordinate[] = [];
for (let latitude = -54; latitude < 81; latitude += 3.2) {
  const spacing = 3.2 / Math.max(0.42, Math.cos(latitude * RADIAN));
  for (let longitude = -179; longitude < 179; longitude += spacing) {
    const shiftedLongitude =
      longitude + Math.sin(latitude * 7.1 + longitude * 1.7) * 0.34;
    const shiftedLatitude = latitude + Math.cos(longitude * 4.3) * 0.28;
    if (
      CONTINENTS.some((continent) =>
        containsPoint(shiftedLongitude, shiftedLatitude, continent),
      )
    )
      LAND_POINTS.push([shiftedLongitude, shiftedLatitude]);
  }
}

const GRID: Coordinate[][] = [];
for (let latitude = -60; latitude <= 60; latitude += 20) {
  const line: Coordinate[] = [];
  for (let longitude = -180; longitude <= 180; longitude += 3)
    line.push([longitude, latitude]);
  GRID.push(line);
}
for (let longitude = -180; longitude < 180; longitude += 20) {
  const line: Coordinate[] = [];
  for (let latitude = -90; latitude <= 90; latitude += 3)
    line.push([longitude, latitude]);
  GRID.push(line);
}

const HUBS = [
  {
    name: "TORONTO",
    coordinate: [-79.38, 43.65] as Coordinate,
    dx: -12,
    dy: -13,
    anchor: "end",
  },
  {
    name: "LONDON",
    coordinate: [-0.12, 51.5] as Coordinate,
    dx: -11,
    dy: -16,
    anchor: "end",
  },
  {
    name: "BELGRADE",
    coordinate: [20.46, 44.8] as Coordinate,
    dx: 13,
    dy: 2,
    anchor: "start",
  },
  {
    name: "DUBAI",
    coordinate: [55.27, 25.2] as Coordinate,
    dx: 13,
    dy: 2,
    anchor: "start",
  },
  {
    name: "SINGAPORE",
    coordinate: [103.82, 1.35] as Coordinate,
    dx: 12,
    dy: 14,
    anchor: "start",
  },
] as const;

function makeRoute(start: Coordinate, end: Coordinate) {
  const toVector = ([longitude, latitude]: Coordinate) => [
    Math.cos(latitude * RADIAN) * Math.cos(longitude * RADIAN),
    Math.sin(latitude * RADIAN),
    Math.cos(latitude * RADIAN) * Math.sin(longitude * RADIAN),
  ];
  const from = toVector(start);
  const to = toVector(end);
  const angle = Math.acos(
    Math.min(
      1,
      Math.max(
        -1,
        from.reduce((total, value, index) => total + value * to[index], 0),
      ),
    ),
  );
  const points: { coordinate: Coordinate; elevation: number }[] = [];
  for (let index = 0; index <= 64; index++) {
    const progress = index / 64;
    const first = Math.sin((1 - progress) * angle) / Math.sin(angle);
    const second = Math.sin(progress * angle) / Math.sin(angle);
    const vector = from.map((value, axis) => value * first + to[axis] * second);
    points.push({
      coordinate: [
        Math.atan2(vector[2], vector[0]) / RADIAN,
        Math.asin(vector[1]) / RADIAN,
      ],
      elevation: Math.sin(progress * Math.PI) * 0.16,
    });
  }
  return points;
}

const ROUTES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
].map(([from, to]) => makeRoute(HUBS[from].coordinate, HUBS[to].coordinate));

const VECTOR_CACHE = new WeakMap<
  Coordinate,
  readonly [number, number, number]
>();

function makeProjection(rotation: number, tilt: number): Projection {
  const rotationSine = Math.sin(rotation * RADIAN);
  const rotationCosine = Math.cos(rotation * RADIAN);
  const tiltSine = Math.sin(tilt * RADIAN);
  const tiltCosine = Math.cos(tilt * RADIAN);

  return (coordinate, elevation = 0) => {
    let vector = VECTOR_CACHE.get(coordinate);
    if (!vector) {
      const [longitude, latitude] = coordinate;
      const cosine = Math.cos(latitude * RADIAN);
      vector = [
        cosine * Math.cos(longitude * RADIAN),
        Math.sin(latitude * RADIAN),
        cosine * Math.sin(longitude * RADIAN),
      ];
      VECTOR_CACHE.set(coordinate, vector);
    }
    const longitudeDepth =
      vector[0] * rotationCosine + vector[2] * rotationSine;
    const x = vector[2] * rotationCosine - vector[0] * rotationSine;
    const y = tiltCosine * vector[1] - tiltSine * longitudeDepth;
    const depth = tiltSine * vector[1] + tiltCosine * longitudeDepth;
    const radius = RADIUS * (1 + elevation);
    return { x: CENTER + x * radius, y: CENTER - y * radius, depth };
  };
}

function linePath(
  coordinates: readonly Coordinate[],
  project: Projection,
  close = false,
) {
  let path = "";
  let drawing = false;
  const points = close ? [...coordinates, coordinates[0]] : coordinates;
  for (const coordinate of points) {
    const point = project(coordinate);
    if (point.depth < 0.005) {
      drawing = false;
      continue;
    }
    path += `${drawing ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    drawing = true;
  }
  return path;
}

function geometry(rotation: number, tilt: number) {
  const project = makeProjection(rotation, tilt);
  let land = "";
  let horizonLand = "";
  for (const coordinate of LAND_POINTS) {
    const point = project(coordinate);
    if (point.depth <= 0) continue;
    // A round-capped, near-zero-length segment is a dot without the two arc
    // commands per point. This substantially reduces SVG repaint work.
    const dot = `M${point.x.toFixed(1)},${point.y.toFixed(1)}h.1`;
    if (point.depth > 0.25) land += dot;
    else horizonLand += dot;
  }
  return {
    grid: GRID.map((line) => linePath(line, project)).join(""),
    coast: CONTINENTS.map((line) => linePath(line, project, true)).join(""),
    land,
    horizonLand,
    routes: ROUTES.map((route) => {
      let drawing = false;
      let path = "";
      for (const { coordinate, elevation } of route) {
        const point = project(coordinate, elevation);
        if (point.depth < 0.025) {
          drawing = false;
          continue;
        }
        path += `${drawing ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
        drawing = true;
      }
      return path;
    }),
    hubs: HUBS.map((hub) => project(hub.coordinate)),
  };
}

const INITIAL_GEOMETRY = geometry(INITIAL_LONGITUDE, 12);

export function Globe({
  className,
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const { locale } = useAllianceLocale();
  const root = useRef<SVGSVGElement>(null);
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const grid = svg.querySelector<SVGPathElement>("[data-globe-grid]");
    const coast = svg.querySelector<SVGPathElement>("[data-globe-coast]");
    const land = svg.querySelector<SVGPathElement>("[data-globe-land]");
    const horizon = svg.querySelector<SVGPathElement>("[data-globe-horizon]");
    const routes = [
      ...svg.querySelectorAll<SVGPathElement>("[data-globe-route]"),
    ];
    const hubs = [...svg.querySelectorAll<SVGGElement>("[data-globe-hub]")];
    let frame = 0;
    let visible = false;
    let previousTime = 0;
    let elapsed = 0;
    let lastDraw = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const draw = () => {
      const next = geometry(
        INITIAL_LONGITUDE + elapsed * 0.0015 + smoothX,
        12 + smoothY,
      );
      grid?.setAttribute("d", next.grid);
      coast?.setAttribute("d", next.coast);
      land?.setAttribute("d", next.land);
      horizon?.setAttribute("d", next.horizonLand);
      routes.forEach((route, index) => {
        route.setAttribute("d", next.routes[index]);
        route.style.strokeDashoffset = `${-elapsed * 0.009 - index * 8}`;
      });
      hubs.forEach((hub, index) => {
        const point = next.hubs[index];
        hub.setAttribute(
          "transform",
          `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`,
        );
        hub.setAttribute(
          "opacity",
          `${Math.max(0, Math.min(1, point.depth * 5))}`,
        );
      });
    };

    const tick = (time: number) => {
      if (!visible || document.hidden || reducedMotion.matches) {
        frame = 0;
        return;
      }
      if (previousTime) elapsed += Math.min(time - previousTime, 64);
      previousTime = time;
      if (time - lastDraw >= (finePointer.matches ? 32 : 48)) {
        smoothX += (pointerX - smoothX) * 0.065;
        smoothY += (pointerY - smoothY) * 0.065;
        draw();
        lastDraw = time;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      if (visible && !document.hidden && !reducedMotion.matches)
        frame = window.requestAnimationFrame(tick);
      else if (reducedMotion.matches) {
        smoothX = 0;
        smoothY = 0;
        draw();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: "80px" },
    );
    observer.observe(svg);
    reducedMotion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);

    const onPointerMove = (event: PointerEvent) => {
      if (
        !interactive ||
        !finePointer.matches ||
        event.pointerType === "touch" ||
        reducedMotion.matches
      )
        return;
      const bounds = svg.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    svg.addEventListener("pointermove", onPointerMove, { passive: true });
    svg.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      svg.removeEventListener("pointermove", onPointerMove);
      svg.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [interactive]);

  return (
    <svg
      ref={root}
      className={className}
      viewBox="0 0 900 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={tx(locale, "Глобус Alliance Global: международные направления и маршруты")}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${uniqueId}-atmosphere`}>
          <stop offset="0.58" stopColor={GOLD} stopOpacity="0.025" />
          <stop offset="0.79" stopColor={GOLD} stopOpacity="0.055" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-sphere`} cx="38%" cy="32%" r="72%">
          <stop offset="0" stopColor="#1a2c3d" stopOpacity="0.16" />
          <stop offset="0.8" stopColor="#0a1726" stopOpacity="0.15" />
          <stop offset="1" stopColor="#06111f" stopOpacity="0.44" />
        </radialGradient>
        <linearGradient
          id={`${uniqueId}-rim`}
          x1="180"
          y1="130"
          x2="730"
          y2="790"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#edd7aa" stopOpacity="0.65" />
          <stop offset="0.45" stopColor={GOLD} stopOpacity="0.12" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <circle
        cx={CENTER}
        cy={CENTER}
        r="444"
        fill={`url(#${uniqueId}-atmosphere)`}
      />
      <g stroke={GOLD} strokeWidth="0.7" opacity="0.16">
        <circle cx={CENTER} cy={CENTER} r="373" strokeDasharray="1 13" />
        <path d="M450 62V79M450 821V838M62 450H79M821 450H838" opacity="0.8" />
        <ellipse
          cx={CENTER}
          cy={CENTER}
          rx="418"
          ry="132"
          transform="rotate(-27 450 450)"
        />
      </g>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill={`url(#${uniqueId}-sphere)`}
        stroke={`url(#${uniqueId}-rim)`}
        strokeWidth="0.85"
      />
      <path
        data-globe-grid
        d={INITIAL_GEOMETRY.grid}
        stroke={GOLD}
        strokeWidth="0.5"
        opacity="0.22"
      />
      <path
        data-globe-coast
        d={INITIAL_GEOMETRY.coast}
        stroke={GOLD}
        strokeWidth="0.55"
        strokeLinejoin="round"
        opacity="0.29"
      />
      <path
        data-globe-horizon
        d={INITIAL_GEOMETRY.horizonLand}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        data-globe-land
        d={INITIAL_GEOMETRY.land}
        stroke={GOLD}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.72"
      />
      {INITIAL_GEOMETRY.routes.map((route, index) => (
        <path
          key={index}
          data-globe-route
          d={route}
          stroke="#e0c28c"
          strokeWidth="0.9"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}
      {HUBS.map((hub, index) => {
        const point = INITIAL_GEOMETRY.hubs[index];
        return (
          <g
            key={hub.name}
            data-globe-hub
            transform={`translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`}
            opacity={Math.max(0, Math.min(1, point.depth * 5))}
          >
            <circle r="9" stroke={GOLD} strokeWidth="0.65" opacity="0.65" />
            <circle r="3.1" fill="#e6cea2" />
            <text
              x={hub.dx}
              y={hub.dy}
              textAnchor={hub.anchor}
              fill="#d6c099"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "8px",
                fontWeight: 500,
                letterSpacing: "1.7px",
              }}
            >
              {hub.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default Globe;
