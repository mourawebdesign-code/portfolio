/**
 * Asset references for the layout-fidelity pass.
 *
 * These point at the reference site's public CDN rather than at local copies:
 * the artwork belongs to the template's author and must not be redistributed
 * inside this repository. They exist so the composition, crop and proportion
 * can be validated against the reference. Every one of them gets replaced with
 * the client's own artwork in the personalisation pass.
 */

const CDN = "https://framerusercontent.com/images";

/**
 * Framer's own CDN resizes an image on request via `?width=&height=` query
 * params (the reference site uses this itself — e.g. its 80x100 tooth badge
 * is requested at `?width=320&height=400`). Asking for roughly 2x the
 * display size keeps photos crisp on retina screens while cutting the
 * downloaded bytes for anything that would otherwise arrive at its full
 * original resolution — same crop, same aspect ratio, just fewer pixels.
 */
function sized(url: string, width: number, height: number) {
  return `${url}?width=${width}&height=${height}`;
}

export const A = {
  // Navbar — BrightSmile Dental Care's own logo (public/Logo.png), built
  // for dark backgrounds: white "Bright" + cyan "Smile", white tooth mark.
  logo: "/Logo.png",
  // Cropped from the same file down to just the tooth mark (no wordmark) —
  // used as the footer's giant-lettering badge. The generated favicons
  // (app/icon.png, app/apple-icon.png) come from this same crop.
  logoMark: "/logo-mark.png",

  // Hero
  heroToothBadge: `${CDN}/6NNKP1etoSddDofOCNNFluwJ0D0.png`, // 80x100, inside white circle
  heroShapeLeft: `${CDN}/8SLTcB5PwCzmNcEX3xMDO2UE.png`, // 140x140 decorative
  heroShapeRight: `${CDN}/YQCGHFWl4Zi8SdMJx8leZUEFsug.png`, // 140x140 decorative
  heroIconClock: `${CDN}/d7wIN9QG3r2yNES3gMYWGsUIzA.png`, // 52x52
  heroIconPhone: `${CDN}/AmeromzPtCFG68vD8KcYpOnNAY.png`, // 52x52
  heroPortrait: sized(`${CDN}/vnPPHcccofJMIxqu0RlNYlsCC0.png`, 858, 932), // 429x466 r24
  heroSignature: `${CDN}/HroJEyaQWkZdWEoPwaL8cI8dp8.svg`, // 85x40
  heroCardMedia: sized(`${CDN}/ayzeEO4BIbMPAfPIh0wMQnNKdo.png`, 696, 364), // 348x182 r16
  arrowWhite: `${CDN}/oA1iduunO37xWxz3aAs1IrDmrg8.svg`, // 20x15
  arrowDark: `${CDN}/GVNpc3tZmIBK8CoSaFC8akADtUE.svg`, // 20x15

  // Benefits marquee
  marqueeIcon: `${CDN}/Z2zN4cS7xD3uB27mhzvBNEf19Y.png`, // circular icon between words

  // Journey
  journeyEyebrowIcon: `${CDN}/yg6WKDjqWVH3l8jeqWzqTYRAM.svg`, // 20x20
  journeyBadge: sized(`${CDN}/pUip57JIkzBXCZdIHS7vqVT968.png`, 420, 120), // 210x60 "400+ Expert Doctors"
  journeyImageLeft: sized(`${CDN}/Jr3i1BzIMPqxVq9cHo9d5cOqLA.png`, 824, 560), // 412x280 r24
  journeyImageRight: sized(`${CDN}/CPqJUKAF4hOhfRu6dijhXSDQEus.png`, 1134, 868), // 567x434 r24
  metricIcon1: `${CDN}/u4wfjcMB0qgonOtP1QVAdqwfe40.svg`, // 36x36
  metricIcon2: `${CDN}/hspzi1ISAlAFsQVgJlMQihgR50.svg`, // 36x36
  metricIcon3: `${CDN}/nlkPF6bvu5bBckYyvOPPhwYN1KE.svg`, // 36x36

  // Solutions
  solutionsEyebrowIcon: `${CDN}/zbRTNRTskzaVBrynCwvzyvp5P1c.svg`, // 20x20
  solutionIcon1: `${CDN}/bohdIn1sYv4ffNoUl63WIHvqlJU.svg`, // 80x80
  solutionIcon2: `${CDN}/tcgh4JCeACBzrmSMd3BAChVKZUo.svg`, // 80x80
  solutionIcon3: `${CDN}/znYkwie1jN7tFefeegVMpOEbdYc.svg`, // 80x80

  // Success stories — 8 tiles, 417x314 r24
  storiesEyebrowIcon: `${CDN}/2Y8GI4WzrezIIYXzq6vspHWXk.svg`,
  story: [
    sized(`${CDN}/yWDMzc6L0Jii7BEuWKItwNzdD2w.png`, 834, 628),
    sized(`${CDN}/kQXDD5V7z4mGhCuYWNjkSMNYhQs.png`, 834, 628),
    sized(`${CDN}/dD9p8QEvTsqQx2EpmJs8dmEugFw.png`, 834, 628),
    sized(`${CDN}/cNxpOTGotdaHQpifSrjnjtwcQ.png`, 834, 628),
    sized(`${CDN}/aK18uHH3N0XdNoYK2mbYHmiuxE.png`, 834, 628),
    sized(`${CDN}/lcnLzDq1bnw8W8Hqqebh3xTs56s.png`, 834, 628),
    sized(`${CDN}/kpavLB8pUnkozzFEyncAYgznk.png`, 834, 628),
    sized(`${CDN}/Hb6CXsFbgt3HmdA14j8pmDJl2Q.png`, 834, 628),
  ],

  // Appointment
  appointmentBg: sized(`${CDN}/RozotAFsZ5JkUwxeVSP29nc.png`, 1920, 1359), // 1425x1009 full bleed
  appointmentImage: sized(`${CDN}/gabi1yZS5nkN0ft4hHAMFSHRx0E.png`, 1100, 1458), // 550x729 r32
  appointmentEyebrowIcon: `${CDN}/ZeRZtpaRiO71h1YjS8fpxbME.svg`,

  // Testimonials
  testimonialsEyebrowIcon: `${CDN}/mprRpsxtmCcvZU5Vgh7Z1o6YBQ.svg`,
  testimonialAvatar: sized(`${CDN}/tFaMvqAZdrMW53dt9kIyY8gc.jpg`, 120, 120), // 60x60 round

  // Emergency CTA
  emergencyShape: `${CDN}/9tq985P14514jVntJG3diuIWkg.png`, // 1087x1129 backdrop
  emergencyPerson: sized(`${CDN}/KajB8fkQVIZz7iqxeBUrf7WbfQ.png`, 946, 1086), // 473x543
  emergencyBadge: `${CDN}/U4wxDDYzInscsZmk5Ro3LgtYcE.png`, // 109x96
  emergencyEyebrowIcon: `${CDN}/HFIujzPNZiaYAPCSrOVQiAbwAoM.svg`,

  // Blog — 2 posts, 607x373 r16
  blogEyebrowIcon: `${CDN}/HMTaY7cslYRpWyJliOxDZQ6o2bw.svg`,
  blogImage1: sized(`${CDN}/trR1syVyXuqt0uW9BDWduoMQ8.png`, 1214, 746),
  blogImage2: sized(`${CDN}/NAOWyoJQOE5tET1VRpRwFhiBUdY.jpg`, 1214, 746),
  blogMetaIcon1: `${CDN}/HAQhSvIV69kV5Lyp5eLE1gEfY.svg`, // 20x20 author
  blogMetaIcon2: `${CDN}/WjCOibelAY7xQlV4gJfjaRsOC0.svg`, // 20x20 read time

} as const;
