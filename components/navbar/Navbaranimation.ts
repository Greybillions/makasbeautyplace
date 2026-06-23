import gsap from 'gsap';

export function navbarAnimation(
  navRef: HTMLElement | null,
  linksRef: (HTMLElement | null)[],
  ctaRef: HTMLElement | null,
) {
  if (!navRef) return;

  const tl = gsap.timeline();

  tl.fromTo(
    navRef,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
  )
    .fromTo(
      linksRef.filter(Boolean),
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.3',
    )
    .fromTo(
      ctaRef,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
      '-=0.2',
    );

  return tl;
}
