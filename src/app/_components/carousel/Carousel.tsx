// app/_components/carousel/Carousel.tsx — Client Component
"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./carousel.module.css";

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

    // Centering the first/last slide needs symmetric run-up padding on the
    // viewport sized to half the leftover space around a slide — but that's
    // only solvable if the slide's own width and the padding aren't defined
    // in terms of each other. If .slide's width were a CSS percentage of
    // .viewport's content box (as it naively could be), and padding is then
    // chosen to center that width, the two equations are circular: shrinking
    // the content box (more padding) shrinks the slide, which calls for even
    // more padding, diverging toward all-padding-no-content. So instead both
    // the slide width and the padding are derived here from the same stable,
    // padding-independent reference (viewport.clientWidth, which doesn't
    // change as the padding/content split inside it changes), and the slide
    // width is handed to CSS via a custom property rather than a percentage
    // — see --slide-width in carousel.module.css. The ratio/cap constants
    // must be kept in sync with that file's breakpoint.
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        function syncSizing() {
            const viewport = viewportRef.current;
            if (!viewport) return;
            const isDesktop = window.matchMedia("(min-width: 768px)").matches;
            const ratio = 0.9;
            const cap = isDesktop ? 1200 : 340;
            const slideWidth = Math.min(viewport.clientWidth * ratio, cap);
            const pad = Math.max(0, (viewport.clientWidth - slideWidth) / 2);
            viewport.style.setProperty("--slide-width", `${slideWidth}px`);
            viewport.style.paddingInline = `${pad}px`;
        }

        syncSizing();
        const observer = new ResizeObserver(syncSizing);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [items.length]);

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
