// app/_components/carousel/Carousel.tsx — Client Component
"use client";
import { useId, useRef, useState } from "react";
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

    if (items.length === 0) return null;

    const showControls = items.length > 1;

    function scrollToIndex(index: number) {
        const clamped = Math.max(0, Math.min(index, items.length - 1));
        const slide = slideRefs.current[clamped];
        viewportRef.current?.scrollTo({
            left: slide?.offsetLeft ?? 0,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
        setActiveIndex(clamped);
    }

    function handleScroll() {
        if (scrollRaf.current !== null) return;
        scrollRaf.current = requestAnimationFrame(() => {
            scrollRaf.current = null;
            const scrollLeft = viewportRef.current?.scrollLeft ?? 0;
            let nearest = 0;
            let nearestDistance = Infinity;
            slideRefs.current.forEach((slide, i) => {
                if (!slide) return;
                const distance = Math.abs(slide.offsetLeft - scrollLeft);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearest = i;
                }
            });
            setActiveIndex(nearest);
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
                        className={styles.arrow}
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
                        className={styles.arrow}
                        onClick={() => scrollToIndex(activeIndex + 1)}
                        disabled={activeIndex === items.length - 1}
                        aria-label={`Next slide in ${title}`}
                    >
                        &#8594;
                    </button>
                )}
            </div>
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
            {showControls && (
                <p className={styles.status} aria-live="polite">
                    {`Slide ${activeIndex + 1} of ${items.length}`}
                </p>
            )}
        </section>
    );
}
