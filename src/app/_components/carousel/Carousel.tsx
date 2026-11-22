// app/_components/carousel/Carousel.tsx — Client Component
"use client";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./carousel.module.css";

// Firefox (and forks like LibreWolf) restores a button's `disabled` state on
// reload before hydration, so an arrow the user had enabled comes back
// mismatching the server HTML. autocomplete="off" opts the arrows out; React's
// types just don't list it for <button>.
declare module "react" {
    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: string;
    }
}

type Props<T> = {
    title: string;
    items: T[];
    getKey: (item: T) => string;
    renderItem: (item: T) => ReactNode;
};

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

export default function Carousel<T>({
    title,
    items,
    getKey,
    renderItem,
}: Props<T>) {
    const headingId = useId();
    const viewportRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRaf = useRef<number | null>(null);

    if (items.length === 0) return null;

    const showControls = items.length > 1;

    function scrollToIndex(index: number) {
        const clamped = Math.max(0, Math.min(index, items.length - 1));
        const slide = slideRefs.current[clamped];
        const viewport = viewportRef.current;
        if (!slide || !viewport) return;
        const target =
            slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2;
        viewport.scrollTo({
            left: target,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }

    // The active slide is always derived from the scroll container's actual,
    // live position — whether it got there from a click/key press or a
    // manual swipe — rather than being set separately by the handlers above.
    // One writer, so there's nothing for a click and a scroll event to race.
    function handleScroll() {
        if (scrollRaf.current !== null) return;
        scrollRaf.current = requestAnimationFrame(() => {
            scrollRaf.current = null;
            const viewport = viewportRef.current;
            if (!viewport) return;
            const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
            let best = 0;
            let bestDistance = Infinity;
            slideRefs.current.forEach((slide, i) => {
                if (!slide) return;
                const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
                const distance = Math.abs(slideCenter - viewportCenter);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = i;
                }
            });
            setActiveIndex(best);
        });
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault();
                scrollToIndex(activeIndex + 1);
                break;
            case "ArrowLeft":
                e.preventDefault();
                scrollToIndex(activeIndex - 1);
                break;
            case "Home":
                e.preventDefault();
                scrollToIndex(0);
                break;
            case "End":
                e.preventDefault();
                scrollToIndex(items.length - 1);
                break;
        }
    }

    return (
        <section
            className={styles.section}
            aria-roledescription="carousel"
            aria-labelledby={headingId}
        >
            <h2 id={headingId}>{title}</h2>
            <div className={styles.frame}>
                {showControls && (
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrowPrev}`}
                        onClick={() => scrollToIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        autoComplete="off"
                        aria-label={`Previous slide in ${title}`}
                    >
                        &#8592;
                    </button>
                )}
                <div
                    className={styles.viewport}
                    ref={viewportRef}
                    tabIndex={0}
                    role="group"
                    aria-labelledby={headingId}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                >
                    {items.map((item, i) => (
                        <div
                            key={getKey(item)}
                            ref={(el) => {
                                slideRefs.current[i] = el;
                            }}
                            className={styles.slide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${items.length}`}
                        >
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
                {showControls && (
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrowNext}`}
                        onClick={() => scrollToIndex(activeIndex + 1)}
                        disabled={activeIndex === items.length - 1}
                        autoComplete="off"
                        aria-label={`Next slide in ${title}`}
                    >
                        &#8594;
                    </button>
                )}
                {showControls && (
                    <div
                        className={styles.indicators}
                        role="group"
                        aria-label={`${title} slide navigation`}
                    >
                        {items.map((item, i) => (
                            <button
                                type="button"
                                key={getKey(item)}
                                className={
                                    i === activeIndex
                                        ? `${styles.tick} ${styles.tickActive}`
                                        : styles.tick
                                }
                                aria-label={`Go to slide ${i + 1} of ${items.length}`}
                                aria-current={i === activeIndex ? "true" : undefined}
                                onClick={() => scrollToIndex(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {showControls && (
                <p className={styles.status} aria-live="polite">
                    {`Slide ${activeIndex + 1} of ${items.length}`}
                </p>
            )}
        </section>
    );
}
