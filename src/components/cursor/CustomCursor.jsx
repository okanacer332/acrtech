import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let animFrame;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dot) {
                dot.style.left = `${mouseX}px`;
                dot.style.top = `${mouseY}px`;
            }

            const el = document.elementFromPoint(mouseX, mouseY);
            if (el) {
                const style = window.getComputedStyle(el);
                const isClickable =
                    el.tagName === 'A' ||
                    el.tagName === 'BUTTON' ||
                    el.closest('a') ||
                    el.closest('button') ||
                    style.cursor === 'pointer';
                setIsPointer(!!isClickable);
            }
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        const animateRing = () => {
            const ease = 0.12;
            ringX += (mouseX - ringX) * ease;
            ringY += (mouseY - ringY) * ease;
            if (ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }
            animFrame = requestAnimationFrame(animateRing);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        animFrame = requestAnimationFrame(animateRing);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${isPointer ? 'cursor-dot--pointer' : ''} ${isHidden ? 'cursor-dot--hidden' : ''}`}
            />
            <div
                ref={cursorRingRef}
                className={`cursor-ring ${isPointer ? 'cursor-ring--pointer' : ''} ${isHidden ? 'cursor-ring--hidden' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
