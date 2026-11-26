import type { Comparison, Media, Project, ProjectImage } from "@/lib/types";

/**
 * HOW TO ADD A PROJECT
 * 1. Put the images in  public/images/projects/{slug}/  (JPG, about 2000px on the long edge).
 * 2. Copy one entry below, change the slug, text and the shots list.
 * 3. Use kind: "design" for 3D visualisations and kind: "built" for site photographs.
 *    Add location, area, duration, year and clientType only when you know them.
 *
 * Images can also come from Cloudinary: enable auto-discovery (see README).
 */

type Shot = {
  /** File name without extension, inside public/images/projects/{slug}/ */
  file: string;
  /** Short label shown on the site, e.g. "Day", "Night", "Foundation". */
  stage: string;
  caption: string;
  size: readonly [width: number, height: number];
  /** CSS object-position that keeps the house in view when a frame crops the image. */
  position?: string;
};

type Seed = Omit<Project, "images" | "cover" | "status" | "comparison"> & {
  shots: readonly Shot[];
  /** File name of the shot used on cards and at the top of the project page. */
  coverFile: string;
  compare?: Omit<Comparison, "before" | "after"> & { files: readonly [before: string, after: string] };
};

function project({ shots, coverFile, compare, ...rest }: Seed): Project {
  const images: ProjectImage[] = shots.map((s) => ({
    publicId: `upedge/projects/${rest.slug}/${s.file}`,
    src: `/images/projects/${rest.slug}/${s.file}.jpg`,
    width: s.size[0],
    height: s.size[1],
    position: s.position,
    stage: s.stage,
    caption: s.caption,
    alt: `${rest.title}${rest.kind === "design" ? " 3D design" : ""}, ${s.stage.toLowerCase()}. ${s.caption}`,
  }));
  const find = (file: string): ProjectImage => {
    const img = images[shots.findIndex((s) => s.file === file)];
    if (!img) throw new Error(`${rest.slug}: no shot named "${file}"`);
    return img;
  };
  const cover: Media = { ...find(coverFile), alt: `${rest.title}, ${rest.category.toLowerCase()} ${rest.kind === "design" ? "3D design" : "project"}` };

  let comparison: Comparison | undefined;
  if (compare) {
    const { files, ...text } = compare;
    comparison = { ...text, before: find(files[0]), after: find(files[1]) };
  }
  return { ...rest, status: "live", images, cover, comparison };
}

const portrait = [1440, 1800] as const;
/** Stills from reels. */
const still = [720, 1280] as const;
const wide = [1280, 720] as const;
/** Instagram carousel images. */
const feed = [1440, 1800] as const;
const tall = [893, 1600] as const;
const corner = [1450, 1800] as const;

const dayAndNight = {
  labels: ["Day", "Night"] as [string, string],
  eyebrow: "Day and night",
  title: "One house, two moods",
  lead: "Drag the handle to compare the same view in daylight and after dark.",
};

export const projects: Project[] = [
  project({
    slug: "green-veil-house",
    title: "Green Veil House",
    category: "Residential",
    kind: "design",
    summary: "A two-storey home in grey plaster, rubble stone and terracotta, with trailing greenery shading the front balcony.",
    story: [
      "Deep roof slabs with timber-finished soffits shade the full-height glazing, and planting trails over the edge to soften the upper floor.",
      "A black metal screen gives the side rooms privacy while letting air and light through. Below it, a rough stone pier and a terracotta tile wall frame the car porch and entrance.",
    ],
    services: ["residential-construction", "architectural-planning", "landscaping"],
    coverFile: "day-corner",
    shots: [
      { file: "day-front", stage: "Front", caption: "The street elevation in daylight.", size: corner, position: "50% 68%" },
      { file: "day-corner", stage: "Corner", caption: "From the corner, showing both faces of the house.", size: corner, position: "50% 55%" },
      { file: "rain-corner", stage: "Rainy evening", caption: "The same corner on a wet evening, with the wall lamps on.", size: corner, position: "50% 55%" },
    ],
    compare: {
      files: ["day-corner", "rain-corner"],
      labels: ["Day", "Rainy evening"],
      eyebrow: "Day and evening",
      title: "Made for the monsoon too",
      lead: "Drag the handle to compare the same view on a clear day and a rainy evening.",
    },
  }),
  project({
    slug: "terrace-screen-house",
    title: "Terrace Screen House",
    category: "Residential",
    kind: "built",
    location: "Madurai",
    summary: "A two-storey home with exposed brick, a patterned terracotta screen on the terrace and warm, finished interiors.",
    story: [
      "A tiled-edge terrace wraps the upper floor, where a terracotta screen gives privacy and glows when lit. Exposed brick and grey texture carry the same palette down to the gate.",
      "Inside, timber ceilings, a glass-sided staircase, a planted prayer niche and a modular kitchen complete the home. It was followed through to the housewarming.",
    ],
    services: ["residential-construction", "interiors-and-fit-outs"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Front", caption: "The completed front elevation from the road.", size: still, position: "50% 55%" },
      { file: "screen-day", stage: "Terrace screen", caption: "The terracotta screen above the entrance.", size: still, position: "50% 55%" },
      { file: "screen-night", stage: "Screen at night", caption: "Light behind the terracotta pattern.", size: still, position: "50% 55%" },
      { file: "entrance", stage: "Entrance", caption: "Steps, planting and wall lamps at the gate.", size: still, position: "50% 55%" },
      { file: "brick-wall", stage: "Brickwork", caption: "Exposed brick under a slim canopy.", size: still, position: "50% 55%" },
      { file: "living", stage: "Living", caption: "A timber ceiling band and a floating media unit.", size: still, position: "50% 55%" },
      { file: "prayer-niche", stage: "Niche", caption: "A planted niche set into the wall.", size: still, position: "50% 55%" },
      { file: "staircase", stage: "Staircase", caption: "Timber treads with a glass guard.", size: still, position: "50% 55%" },
      { file: "kitchen", stage: "Kitchen", caption: "A modular kitchen with a long window.", size: still, position: "50% 55%" },
      { file: "dining", stage: "Dining", caption: "A slim metal and timber divider.", size: still, position: "50% 55%" },
    ],
  }),
  project({
    slug: "salon-interior",
    title: "Salon Interior",
    category: "Interiors",
    kind: "built",
    location: "Madurai",
    summary: "A salon fit-out with lit arches, rattan pendants, timber flooring and a moon feature wall.",
    story: [
      "Soft arches frame each styling station, with light washing down from behind them.",
      "Woven pendant lamps and timber-finish flooring keep the room warm, and a backlit moon relief gives it a single bold focal point.",
    ],
    services: ["interiors-and-fit-outs"],
    coverFile: "stations",
    shots: [
      { file: "stations", stage: "Stations", caption: "Styling chairs below the lit arches.", size: still, position: "50% 55%" },
      { file: "arches", stage: "Arches", caption: "Backlit arches along the mirror wall.", size: still, position: "50% 55%" },
      { file: "wide", stage: "Room", caption: "The seating side of the salon.", size: still, position: "50% 55%" },
      { file: "moon-wall", stage: "Moon wall", caption: "A backlit moon relief beside a fluted panel.", size: still, position: "50% 55%" },
      { file: "lamps", stage: "Lamps", caption: "Woven pendant lamps.", size: still, position: "50% 55%" },
    ],
  }),
  project({
    slug: "tiled-roof-house",
    title: "Tiled Roof House",
    category: "Residential",
    kind: "design",
    summary: "A traditional-style home with clay tile roofs, timber pillars, a long verandah and a swing deck upstairs.",
    story: [
      "Sloping tiled roofs and carved timber posts shade a deep verandah, set against terracotta and raw plaster walls.",
      "A white tower with round openings breaks up the front, and a spiral stair links the upper deck to the roof terrace.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "day-front",
    shots: [
      { file: "day-front", stage: "Front", caption: "The front elevation in daylight.", size: wide, position: "10% 50%" },
      { file: "day-corner", stage: "Corner", caption: "The car porch and upper decks from an angle.", size: wide },
      { file: "swing-deck", stage: "Swing deck", caption: "A swing under its own tiled roof.", size: wide },
      { file: "night-front", stage: "Night", caption: "Wall lamps and warm windows after dark.", size: wide },
    ],
  }),
  project({
    slug: "pine-grove-house",
    title: "Pine Grove House",
    category: "Residential",
    kind: "design",
    location: "Kamuthi, Ramanathapuram",
    summary: "A single-storey home with a framed panel facade, brick entrance and hanging greenery.",
    story: [
      "A tall square frame clad in slim panels forms the front, next to a brick pier that marks the way in.",
      "Planting hangs from the roof slab and runs along the compound wall, with warm light picking out the steps.",
    ],
    services: ["residential-construction", "architectural-planning", "landscaping"],
    coverFile: "night-front",
    shots: [
      { file: "night-front", stage: "Front", caption: "The front elevation in the evening.", size: feed, position: "50% 68%" },
      { file: "night-close", stage: "Entrance", caption: "The gate, steps and brick pier.", size: feed, position: "50% 68%" },
      { file: "night-wide", stage: "Wide view", caption: "The house within its planting.", size: feed, position: "50% 68%" },
      { file: "day", stage: "Day", caption: "The same house in daylight.", size: feed, position: "50% 68%" },
    ],
    compare: { files: ["day", "night-wide"], ...dayAndNight },
  }),
  project({
    slug: "perunali-house",
    title: "Perunali House",
    category: "Residential",
    kind: "built",
    location: "Perunali, Ramanathapuram",
    summary: "A grey textured home with an exposed brick entrance, a shaded sit-out and a planted garden walk.",
    story: [
      "A tall grey frame with fine white grooves and three metal ornaments marks the front, while a brick pier and slim canopy signal the way in.",
      "Behind the compound wall, granite steps lead to a covered sit-out. Broad-leaf planting, lawn and stepping stones wrap the side of the house.",
    ],
    services: ["residential-construction", "landscaping"],
    coverFile: "street",
    shots: [
      { file: "street", stage: "Street view", caption: "The front wall, gate pier and steps from the road.", size: still },
      { file: "aerial", stage: "From above", caption: "The house and its planting seen from a neighbouring roof.", size: still },
      { file: "front", stage: "Elevation", caption: "The grooved grey frame above the boundary planting.", size: still },
      { file: "brick-pier", stage: "Brick pier", caption: "Exposed brick with a wall lamp at the entrance.", size: still },
      { file: "porch", stage: "Sit-out", caption: "A covered sit-out on granite steps.", size: still },
      { file: "garden-path", stage: "Garden path", caption: "Stepping stones through lawn and broad-leaf plants.", size: still },
      { file: "garden-steps", stage: "Garden", caption: "Path lighting beside the steps.", size: still },
    ],
  }),
  project({
    slug: "brick-porch-house",
    title: "Brick Porch House",
    category: "Residential",
    kind: "built",
    summary: "A home followed from foundation to handover, finished with a framed brick porch and a planted front court.",
    story: [
      "The work is shown in order: foundations, columns, masonry and plaster, then the finished interior and porch.",
      "At handover, a white frame surrounds the brick-lined porch, with stepping slabs, lawn and wall lights leading in from the gate.",
    ],
    services: ["residential-construction", "landscaping"],
    coverFile: "handover",
    shots: [
      { file: "foundation", stage: "Foundation", caption: "Footings and column reinforcement going in.", size: still, position: "50% 55%" },
      { file: "columns", stage: "Structure", caption: "Columns up, with bricks stacked for the walls.", size: still, position: "50% 55%" },
      { file: "masonry", stage: "Masonry", caption: "Brickwork and external plastering.", size: still, position: "50% 55%" },
      { file: "plaster", stage: "Plastered shell", caption: "The shell plastered and ready for finishes.", size: still, position: "50% 55%" },
      { file: "corridor", stage: "Interior", caption: "A finished passage with a screen-block window.", size: still, position: "50% 55%" },
      { file: "porch", stage: "Porch", caption: "The framed porch with its brick feature wall.", size: still, position: "50% 55%" },
      { file: "garden-steps", stage: "Front court", caption: "Stepping slabs, lawn and planting.", size: still, position: "50% 55%" },
      { file: "handover", stage: "Handover", caption: "The house lit and decorated, ready to hand over.", size: still, position: "50% 30%" },
    ],
  }),
  project({
    slug: "white-frame-house",
    title: "White Frame House",
    category: "Residential",
    kind: "design",
    summary: "A clean white composition with a wide car porch, a timber-finish wall and a tall gridded window.",
    story: [
      "Two interlocking white frames organise the front: one shelters the car porch, the other rises around the timber-finish wall and double-height glazing.",
      "Thin lines of light follow the soffits, and slatted metal gates keep the entrance open to view while securing it.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "evening",
    shots: [{ file: "evening", stage: "Evening", caption: "The front elevation at dusk.", size: [1920, 1080], position: "47% 50%" }],
  }),
  project({
    slug: "garden-gable-house",
    title: "Garden Gable House",
    category: "Residential",
    kind: "design",
    summary: "A pitched-roof home set back behind a garden, with brick, plaster and layered outdoor lighting.",
    story: [
      "Steep tiled roofs and timber-lined gables sit above a brick ground floor, with planting trailing from the balcony.",
      "The garden, driveway, compound wall and gate are designed together with the house.",
    ],
    services: ["residential-construction", "architectural-planning", "landscaping"],
    coverFile: "approach",
    shots: [
      { file: "approach", stage: "Approach", caption: "The drive, steps and lit garden.", size: feed, position: "50% 65%" },
      { file: "night-street", stage: "Night", caption: "The house from the road after dark.", size: feed, position: "50% 65%" },
      { file: "night-gate", stage: "Gate", caption: "The gate and compound wall at night.", size: feed, position: "50% 65%" },
      { file: "day", stage: "Day", caption: "The street view in daylight.", size: feed, position: "50% 65%" },
    ],
    compare: { files: ["day", "night-street"], ...dayAndNight },
  }),
  project({
    slug: "sage-kitchen-house",
    title: "Sage Kitchen House",
    category: "Interiors",
    kind: "built",
    summary: "Finished interiors with a sage green modular kitchen, timber stairs and a ring chandelier in the stair well.",
    story: [
      "Timber treads climb beside a glass balustrade, against a panelled wall washed by small wall lights. A tiered ring chandelier drops through the double height.",
      "The kitchen pairs sage green shutters and ribbed glass with warm timber. The bedroom adds a painted tree mural and herringbone flooring, and the bathroom uses a bold geometric tile.",
    ],
    services: ["interiors-and-fit-outs", "residential-construction"],
    coverFile: "kitchen",
    shots: [
      { file: "exterior-night", stage: "Exterior", caption: "The house lit up at night.", size: still, position: "50% 35%" },
      { file: "kitchen", stage: "Kitchen", caption: "An L-shaped modular kitchen with under-cabinet lighting.", size: still, position: "50% 55%" },
      { file: "kitchen-entry", stage: "Kitchen entry", caption: "A timber-framed opening and breakfast counter.", size: still },
      { file: "staircase", stage: "Staircase", caption: "Timber treads with a glass balustrade.", size: still },
      { file: "chandelier", stage: "Chandelier", caption: "Tiered rings of light in the stair well.", size: still },
      { file: "stair-wall", stage: "Feature wall", caption: "Panelled finish with small wall washers.", size: still },
      { file: "bedroom", stage: "Bedroom", caption: "A mural headboard wall, track lights and herringbone flooring.", size: still },
      { file: "bedroom-balcony", stage: "Balcony side", caption: "Full-height glazing opening to the balcony.", size: still },
      { file: "dresser", stage: "Dresser", caption: "A backlit round mirror over a floating timber shelf.", size: still },
      { file: "bathroom", stage: "Bathroom", caption: "Wall-hung fittings against geometric tile.", size: still },
    ],
  }),
  project({
    slug: "floating-frame-house",
    title: "Floating Frame House",
    category: "Residential",
    kind: "design",
    location: "TVS Nagar, Madurai",
    summary: "A compact two-storey home where a white box frame holds the balcony under a tilted, timber-lined roof.",
    story: [
      "The upper floor projects forward as a single white frame, giving the balcony shade and making it the focus of the elevation.",
      "Vertical timber-finish fins run past the ground floor windows, and a slatted gate closes the car porch in the same warm tone.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "night-front",
    shots: [
      { file: "day-front", stage: "Daylight", caption: "The front elevation under a clear sky.", size: tall, position: "50% 62%" },
      { file: "rain-front", stage: "Rain", caption: "A rainy evening, with the interiors lit.", size: tall, position: "50% 62%" },
      { file: "dusk-front", stage: "Dusk", caption: "The front elevation as the light fades.", size: portrait, position: "50% 58%" },
      { file: "night-front", stage: "Night", caption: "Warm lighting picks out the frame, the timber and the planting.", size: portrait, position: "50% 58%" },
      { file: "dusk-corner", stage: "Corner at dusk", caption: "An angled view showing the depth of the balcony frame.", size: portrait, position: "50% 55%" },
      { file: "night-corner", stage: "Corner at night", caption: "The same angle after dark.", size: portrait, position: "50% 55%" },
    ],
    compare: {
      files: ["dusk-front", "night-front"],
      labels: ["Dusk", "Night"],
      eyebrow: "Dusk and night",
      title: "How the lighting changes it",
      lead: "Drag the handle to compare the same view before and after the lights come on.",
    },
  }),
  project({
    slug: "arch-window-house",
    title: "Arch Window House",
    category: "Residential",
    kind: "design",
    summary: "A traditional-style home with steep tiled roofs, brick walls and a tall arched window.",
    story: [
      "Overlapping gables give the front its shape, lined in timber and finished with clay tiles.",
      "An arched window set in white plaster stands out against the surrounding brick.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Front", caption: "The gabled elevation at dusk.", size: feed, position: "50% 62%" },
      { file: "arch", stage: "Arched window", caption: "A closer view of the window and entrance.", size: feed, position: "50% 62%" },
    ],
  }),
  project({
    slug: "brick-screen-house",
    title: "Brick Screen House",
    category: "Residential",
    kind: "design",
    summary: "A narrow-front home led by a tall exposed brick wall, a slim vertical window and a spiral stair to the terrace.",
    story: [
      "A dark textured frame wraps a full-height brick wall, where projecting bricks cast shadows that move through the day. A slim ribbed-glass window brings light in without giving up privacy.",
      "Beside it, a stone-clad entrance sits below a small planted terrace, and a spiral stair makes use of the tight footprint to reach the roof.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "night",
    shots: [
      { file: "day", stage: "Day", caption: "Brick, dark texture and white plaster in daylight.", size: portrait, position: "50% 62%" },
      { file: "night", stage: "Night", caption: "A concealed light line traces the frame after dark.", size: portrait, position: "50% 62%" },
      { file: "night-street", stage: "From the street", caption: "The evening view with passing traffic.", size: portrait, position: "50% 62%" },
    ],
    compare: { files: ["day", "night"], ...dayAndNight },
  }),
  project({
    slug: "light-line-house",
    title: "Light Line House",
    category: "Residential",
    kind: "built",
    summary: "A two-storey home on site, its roof slabs and tall frame traced with warm strip lighting.",
    story: [
      "Photographed while work was in progress, with scaffolding still up as the exterior finishes go on.",
      "Thin lines of light run along the projecting slabs and around the tall front frame, and timber-finish soffits sit above full-height glazing.",
    ],
    services: ["residential-construction"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Work in progress", caption: "The front of the house with the lighting switched on.", size: still, position: "50% 30%" },
      { file: "corner", stage: "Corner", caption: "Seen from the approach road at dusk.", size: still, position: "50% 35%" },
      { file: "side", stage: "Side", caption: "Stacked slabs and glazing behind the scaffolding.", size: still, position: "50% 35%" },
      { file: "roof-lights", stage: "Roof detail", caption: "Light lines under the upper roof slabs.", size: still, position: "50% 30%" },
      { file: "balcony-lights", stage: "Balcony detail", caption: "Timber-finish soffit above the glazing.", size: still, position: "50% 40%" },
    ],
  }),
  project({
    slug: "lotus-living-room",
    title: "Lotus Living Room",
    category: "Interiors",
    kind: "built",
    summary: "A living room with a large lotus line artwork, concealed lighting and ring pendants.",
    story: [
      "A hand-fitted lotus design runs across the long wall, drawn in fine warm lines so it reads as art without crowding the room.",
      "A lit cove, a timber panel and layered ring pendants frame it.",
    ],
    services: ["interiors-and-fit-outs"],
    coverFile: "room",
    shots: [
      { file: "room", stage: "Living room", caption: "The finished wall with pendants and seating.", size: still, position: "50% 55%" },
      { file: "lotus-wall", stage: "Feature wall", caption: "The lotus artwork beside a fluted timber panel.", size: still, position: "50% 55%" },
      { file: "artwork", stage: "Detail", caption: "Line work under the cove light.", size: still, position: "50% 55%" },
      { file: "installation", stage: "Installation", caption: "Fitting the wall design on site.", size: still, position: "50% 55%" },
    ],
  }),
  project({
    slug: "gable-brick-house",
    title: "Gable Brick House",
    category: "Residential",
    kind: "design",
    summary: "A tropical home with a white gable roof, a brick feature wall and terracotta screen blocks that let the breeze in.",
    story: [
      "The pitched gable sheds heavy rain and gives the upper room its height, while an open terrace sits beside it above the car porch.",
      "Terracotta screen blocks, exposed brick and raw grey plaster keep the palette simple and easy to maintain, with trailing plants at both levels.",
    ],
    services: ["residential-construction", "architectural-planning", "landscaping"],
    coverFile: "night",
    shots: [
      { file: "day", stage: "Day", caption: "The front elevation in daylight.", size: portrait, position: "50% 96%" },
      { file: "night", stage: "Night", caption: "Wall lights and warm windows after dark.", size: portrait, position: "50% 96%" },
      { file: "dusk", stage: "Dusk", caption: "The house against an evening sky.", size: still, position: "50% 75%" },
    ],
    compare: { files: ["day", "night"], ...dayAndNight },
  }),
  project({
    slug: "twin-volume-house",
    title: "Twin Volume House",
    category: "Residential",
    kind: "design",
    summary: "A gabled brick wing and a squared grey frame side by side, with trailing greenery between them.",
    story: [
      "One half of the house rises into a timber-lined gable, the other into a crisp box frame around full-height glazing.",
      "Brick walls, a covered car porch and planting along the boundary keep the front warm and private.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "evening-front",
    shots: [
      { file: "evening-front", stage: "Front", caption: "The front elevation in the evening.", size: [1350, 1800], position: "50% 55%" },
      { file: "evening-corner", stage: "Corner", caption: "A wider view from the corner at sunset.", size: [1350, 1800], position: "50% 55%" },
    ],
  }),
  project({
    slug: "tiled-porch-house",
    title: "Tiled Porch House",
    category: "Residential",
    kind: "built",
    summary: "A home with clay-tiled gables, carved timber pillars and a terracotta screen compound wall, shown at its housewarming.",
    story: [
      "Two small tiled gables mark the gate and the entrance, with a low compound wall finished in screen blocks.",
      "Carved timber pillars hold up the front verandah, where the family welcomed guests on the day of the housewarming.",
    ],
    services: ["residential-construction"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Front", caption: "The gabled front and compound wall.", size: still, position: "50% 45%" },
      { file: "gate", stage: "Gate", caption: "The tiled gateway dressed for the day.", size: still, position: "50% 45%" },
      { file: "entrance", stage: "Entrance", caption: "Carved pillars at the front door.", size: still, position: "50% 45%" },
      { file: "verandah", stage: "Verandah", caption: "Guests under the tiled verandah roof.", size: still, position: "50% 45%" },
    ],
  }),
  project({
    slug: "brick-stone-house",
    title: "Brick and Stone House",
    category: "Residential",
    kind: "design",
    summary: "A tropical home mixing exposed brick, rubble stone and white plaster under timber-lined roofs.",
    story: [
      "A white upper box with a framed window sits on a solid brick base, beside a stone gable with a deep timber eave.",
      "Brick screens, a planted balcony and a swing seat at the entrance give the house shade and places to pause.",
    ],
    services: ["residential-construction", "architectural-planning", "landscaping"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Front", caption: "The street elevation in late light.", size: still },
      { file: "corner", stage: "Corner", caption: "A closer angle across the planting.", size: still },
      { file: "window", stage: "Window", caption: "The framed window above the brickwork.", size: still },
      { file: "gable", stage: "Stone gable", caption: "Stone, timber and a planted balcony.", size: still },
      { file: "planting", stage: "Planting", caption: "Boundary planting beside the slatted railing.", size: still },
      { file: "swing", stage: "Entrance seat", caption: "A swing seat against the stone wall.", size: still },
    ],
  }),
  project({
    slug: "gomathipuram-house",
    title: "Gomathipuram House",
    category: "Residential",
    kind: "design",
    location: "Gomathipuram, Madurai",
    area: 1300,
    clientType: "Private homeowner",
    summary: "A 1,300 sq. ft. residential design with open balconies, a brick screen and a planted frontage.",
    story: [
      "Stacked balconies and projecting slabs shade the front rooms, with timber-finish panels adding warmth.",
      "A brick screen at the upper level gives privacy while keeping the breeze.",
    ],
    services: ["residential-construction", "architectural-planning"],
    coverFile: "front",
    shots: [
      { file: "front", stage: "Front", caption: "The front elevation in the evening.", size: still, position: "50% 48%" },
      { file: "evening", stage: "Evening", caption: "Warm light across the balconies.", size: still, position: "50% 48%" },
      { file: "street", stage: "Street view", caption: "The house seen from the road.", size: still, position: "50% 48%" },
      { file: "corner", stage: "Corner", caption: "An angled view of both faces.", size: still, position: "50% 48%" },
    ],
  }),
];

export const categories: Project["category"][] = ["Residential", "Commercial", "Interiors"];

/** Featured on the home page, in this order. */
export const featuredSlugs = [
  "green-veil-house",
  "terrace-screen-house",
  "salon-interior",
  "perunali-house",
];
