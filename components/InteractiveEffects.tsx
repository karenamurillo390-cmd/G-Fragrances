'use client';

import { useEffect } from 'react';

const selector = '.button, .round, .social-link, .cart-trigger, .admin-trigger, .search-trigger';

export default function InteractiveEffects() {
  useEffect(() => {
    const createRipple = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(selector);
      if (!target || event.button !== 0) return;
      const bounds = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    };
    document.addEventListener('pointerdown', createRipple);
    return () => document.removeEventListener('pointerdown', createRipple);
  }, []);

  return null;
}
