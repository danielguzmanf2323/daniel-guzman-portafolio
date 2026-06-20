
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private animationFrameId: number | null = null;

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    // Detiene una animación anterior si se pulsa otro enlace rápidamente.
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const headerOffset = 84;
    const startPosition = window.scrollY;

    const targetPosition = Math.max(
      0,
      section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset,
    );

    const distance = targetPosition - startPosition;

    // Aumenta este número si quieres que vaya todavía más lento.
    const duration = 1200;

    const startTime = performance.now();

    const easeInOutCubic = (progress: number): number => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(
        0,
        startPosition + distance * easedProgress,
      );

      if (progress < 1) {
        this.animationFrameId =
          requestAnimationFrame(animateScroll);
      } else {
        this.animationFrameId = null;
      }
    };

    this.animationFrameId =
      requestAnimationFrame(animateScroll);
  }
}

