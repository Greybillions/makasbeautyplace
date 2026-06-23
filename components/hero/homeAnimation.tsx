import gsap from 'gsap';

export function homeAnimation(elements: {
  badge: HTMLElement | null;
  heading: HTMLElement | null;
  para: HTMLElement | null;
  buttons: (HTMLElement | null)[];
}) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    elements.badge,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
  )
    .fromTo(
      elements.heading,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4',
    )
    .fromTo(
      elements.para,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.5',
    )
    .fromTo(
      elements.buttons.filter(Boolean),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
      '-=0.4',
    );

  return tl;
}
