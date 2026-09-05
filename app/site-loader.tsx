"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function LoaderVisual({ visible = true }: { visible?: boolean }) {
  return (
    <div className="site-loader" data-visible={visible} role="status" aria-live="polite" aria-hidden={!visible}>
      <div className="site-loader__content">
        <div className="site-loader__mark" aria-hidden="true">JL</div>
        <span className="site-loader__brand">JAVIER LÓPEZ</span>
        <span className="site-loader__track" aria-hidden="true"><span /></span>
        <span className="site-loader__label"><span lang="es">Cargando</span> / <span lang="en">Loading</span></span>
      </div>
    </div>
  );
}

function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(true);
  const started = useRef(0);
  const currentRoute = useRef("");
  const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const begin = () => {
      clearTimeout(finishTimer.current);
      clearTimeout(safetyTimer.current);
      started.current = Date.now();
      setVisible(true);
      // A cancelled navigation or network failure must never leave an overlay behind.
      safetyTimer.current = setTimeout(() => setVisible(false), 10000);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== window.location.origin || (target.pathname === window.location.pathname && target.search === window.location.search)) return;
      begin();
    };
    currentRoute.current = window.location.pathname + window.location.search;
    const onPopState = () => {
      const nextRoute = window.location.pathname + window.location.search;
      if (nextRoute !== currentRoute.current) begin();
      currentRoute.current = nextRoute;
    };
    const onPageShow = () => setVisible(false);
    // Capture observes Next Link clicks before its handler prevents the native navigation.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
      clearTimeout(finishTimer.current);
      clearTimeout(safetyTimer.current);
    };
  }, []);

  useEffect(() => {
    currentRoute.current = window.location.pathname + window.location.search;
    const finish = () => {
      const minimum = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
      finishTimer.current = setTimeout(() => {
        setVisible(false);
        clearTimeout(safetyTimer.current);
      }, Math.max(0, minimum - (started.current ? Date.now() - started.current : 0)));
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(finishTimer.current);
    };
  }, [pathname, searchParams]);

  return <LoaderVisual visible={visible} />;
}

export default function SiteLoader() {
  return (
    <>
      <Suspense fallback={<LoaderVisual />}><NavigationLoader /></Suspense>
      <noscript><style>{".site-loader { display: none !important; }"}</style></noscript>
    </>
  );
}
