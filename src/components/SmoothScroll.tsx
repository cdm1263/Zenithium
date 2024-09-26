"use client";

import { useEffect } from "react";

export const scrollSmooth = () => {
  document.querySelectorAll(".anchor").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute("href");
      const targetElement = document.getElementById(targetId!.replace("#", ""));

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

const SmoothScroll = () => {
  useEffect(() => {
    scrollSmooth();
  }, []);

  return null;
};

export default SmoothScroll;
