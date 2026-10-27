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
        imagePath: "/Resources/events/2026-10-31-la-ultima-noche/assets/terror-crowd.webp",
        status: "Completado (100%)",
      },
      {
        id: "after-dark-2026-10-28",
        title: "AFTER DARK",
        date: "2026-10-28",
        category: "Nightlife / Special Series",
        theme: "Nightlife / Special Series",
        url: "https://dvoid.vercel.app/after-dark",
        imagePath: "/Resources/events/2026-10-28-after-dark/assets/after-dark-hero.jpg",
        status: "Completado (100%)",
      },
      {
        id: "freak-show-2026-10-24",
        title: "Halloween Freak Show",
        date: "2026-10-24",
        category: "Halloween / Circo Oscuro",
        theme: "Halloween / Circo Oscuro",
        url: "https://dvoid.vercel.app/2026-10/24-freak-show.html",
        imagePath: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
        status: "Completado (100%)",
      },
      {
        id: "secret-cult-2026-10-23",
        title: "Secret Cult",
        date: "2026-10-23",
        category: "Secret Society / Misterio",
        theme: "Secret Society / Misterio",
        url: "https://dvoid.vercel.app/2026-10/23-secret-cult.html",
        imagePath: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop",
        status: "Aún no iniciado (Brief recibido)",
      },
      {
        id: "hollywood-never-dies-2026-10-22",
        title: "Old Hollywood (Hollywood Never Dies)",
        date: "2026-10-22",
        category: "Vintage Horror / Cinema Premiere",
        theme: "Vintage Horror / Cinema Premiere",
        url: "https://dvoid.vercel.app/hollywood-never-dies",
        imagePath: "/Resources/events/2026-10-22-hollywood-never-dies/assets/the-last-premiere-master-v1-1280.webp",
        status: "Completado (100%)",
      },
      {
        id: "fashion-week-2026-10-15",
        title: "Fashion Week",
        date: "2026-10-15",
        category: "Moda / Satin Bow",
        theme: "Moda / Satin Bow",
        url: "https://dvoid.vercel.app/fashion-week",
        imagePath: "/Resources/events/2026-10-15-fashion-week/assets/bow.webp",
        status: "Completado (100%)",
      },
      {
        id: "medicine-after-dark-2026-10-08",
        title: "MEDICINE After Dark",
        date: "2026-10-08",
        category: "Techno / CRT Medical Monitor",
        theme: "Techno / CRT Medical Monitor",
        url: "https://dvoid.vercel.app/medicine",
        imagePath: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        status: "Completado (100%)",
      },
      {
        id: "la-tentacion-2026-10-01",
        title: "La Tentación",
        date: "2026-10-01",
        category: "Halloween / Pre-Halloween Brutalista",
        theme: "Halloween / Pre-Halloween Brutalista",
        url: "https://dvoid.vercel.app/la-tentacion",
        imagePath: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
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
        imagePath: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        status: "Completado (100%)",
      },
      {
        id: "casino-night-2026-09-17",
        title: "Casino Night",
        date: "2026-09-17",
        category: "Casino / Gaming Night",
        theme: "Casino / Gaming Night",
        url: "https://dvoid.vercel.app/casino",
        imagePath: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop",
        status: "Completado (100%)",
      },
    ],
  },
];

export const allEvents: EventItem[] = groupedEvents.flatMap(
  (group) => group.events
);
