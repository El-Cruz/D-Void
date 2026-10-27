export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  theme?: string;
  url: string;
  imagePath: string;
  status?: string;
}

export interface MonthGroup {
  month: string;
  events: EventItem[];
}

export const groupedEvents: MonthGroup[] = [
  {
    month: "NOVIEMBRE 2026",
    events: [
      {
        id: "greek-odyssey-2026-11-19",
        title: "Greek Odyssey (Santorini Night)",
        date: "2026-11-19",
        category: "Mitología Griega / D-Void in Colors",
        theme: "Mitología Griega / D-Void in Colors",
        url: "https://dvoid.vercel.app/greek-odyssey",
        imagePath: "/Resources/events/2026-11-19-greek-odyssey/assets/poseidon-greek.png",
        status: "Completado (100%)",
      },
      {
        id: "padre-guilherme-2026-11-12",
        title: "DJ Padre Guilherme – Pre-Party (Countdown Party)",
        date: "2026-11-12",
        category: "Electrónica / Countdown Party",
        theme: "Electrónica / Countdown Party",
        url: "https://dvoid.vercel.app/padre-guilherme",
        imagePath: "/Resources/events/2026-11-12-padre-guilherme/assets/20251003_guilherme_008.jpg",
        status: "Completado (100%)",
      },
      {
        id: "criminix-2026-11-07",
        title: "CRIMINIX",
        date: "2026-11-07",
        category: "Caso Forense / PUCE",
        theme: "Caso Forense / PUCE",
        url: "https://dvoid.vercel.app/criminix",
        imagePath: "/Resources/events/2026-11-07-criminix/assets/lineup-poster.webp",
        status: "Completado (100%)",
      },
    ],
  },
  {
    month: "OCTUBRE 2026",
    events: [
      {
        id: "la-ultima-noche-2026-10-31",
        title: "La Última Noche",
        date: "2026-10-31",
        category: "Halloween Finale",
        theme: "Halloween Finale",
        url: "https://dvoid.vercel.app/la-ultima-noche",
        imagePath: "/Resources/events/2026-10-31-la-ultima-noche/assets/cover.PNG",
        status: "Completado (100%)",
      },
      {
        id: "after-dark-2026-10-28",
        title: "AFTER DARK",
        date: "2026-10-28",
        category: "Nightlife / Special Series",
        theme: "Nightlife / Special Series",
        url: "https://dvoid.vercel.app/after-dark",
        imagePath: "/Resources/events/2026-10-28-after-dark/assets/cover.png",
        status: "Completado (100%)",
      },
      {
        id: "freak-show-2026-10-24",
        title: "Halloween Freak Show",
        date: "2026-10-24",
        category: "Halloween / Circo Oscuro",
        theme: "Halloween / Circo Oscuro",
        url: "https://dvoid.vercel.app/2026-10/24-freak-show.html",
        imagePath: "/Resources/events/2026-10-24-freak-show/assets/cover.png",
        status: "Completado (100%)",
      },
      {
        id: "hollywood-never-dies-2026-10-22",
        title: "Old Hollywood (Hollywood Never Dies)",
        date: "2026-10-22",
        category: "Vintage Horror / Cinema Premiere",
        theme: "Vintage Horror / Cinema Premiere",
        url: "https://dvoid.vercel.app/hollywood-never-dies",
        imagePath: "/Resources/events/2026-10-22-hollywood-never-dies/assets/cover.png",
        status: "Completado (100%)",
      },
      {
        id: "fashion-week-2026-10-15",
        title: "Fashion Week",
        date: "2026-10-15",
        category: "Moda / Satin Bow",
        theme: "Moda / Satin Bow",
        url: "https://dvoid.vercel.app/fashion-week",
        imagePath: "/Resources/events/2026-10-15-fashion-week/assets/cover.png",
        status: "Completado (100%)",
      },
      {
        id: "medicine-after-dark-2026-10-08",
        title: "MEDICINE After Dark",
        date: "2026-10-08",
        category: "Techno / CRT Medical Monitor",
        theme: "Techno / CRT Medical Monitor",
        url: "https://dvoid.vercel.app/medicine",
        imagePath: "/Resources/events/2026-10-08-medicine-after-dark/assets/cover.png",
        status: "Completado (100%)",
      },
      {
        id: "la-tentacion-2026-10-01",
        title: "La Tentación",
        date: "2026-10-01",
        category: "Halloween / Pre-Halloween Brutalista",
        theme: "Halloween / Pre-Halloween Brutalista",
        url: "https://dvoid.vercel.app/la-tentacion",
        imagePath: "/Resources/events/2026-10-01-la-tentacion/assets/cover.png",
        status: "Completado (100%)",
      },
    ],
  },
  {
    month: "SEPTIEMBRE 2026",
    events: [
      {
        id: "ibiza-vibes-2026-09-25",
        title: "Ibiza Vibes (Inicio de Semestre ASEUDLA)",
        date: "2026-09-25",
        category: "Universitario / Inicio de Semestre",
        theme: "Universitario / Inicio de Semestre",
        url: "https://dvoid.vercel.app/evento-udla",
        imagePath: "/Resources/events/2026-09-25-evento-udla/assets/cover.webp",
        status: "Completado (100%)",
      },
      {
        id: "casino-night-2026-09-17",
        title: "Casino Night",
        date: "2026-09-17",
        category: "Casino / Gaming Night",
        theme: "Casino / Gaming Night",
        url: "https://dvoid.vercel.app/casino",
        imagePath: "/Resources/events/2026-09-17-casino-night/assets/cover.jpg",
        status: "Completado (100%)",
      },
    ],
  },
];

export const allEvents: EventItem[] = groupedEvents.flatMap(
  (group) => group.events
);
