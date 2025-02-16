"use client";
import React, { useRef, useEffect } from "react";
import { loadFull } from "tsparticles";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  className,
}) => {
  const particlesRef = useRef(null);

  useEffect(() => {
    loadParticles();
  }, []);

  const loadParticles = async () => {
    await loadFull(window.tsParticles);
    await window.tsParticles.load(id, {
      background: {
        color: background,
      },
      particles: {
        number: {
          value: particleDensity,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: particleColor,
        },
        size: {
          value: { min: minSize, max: maxSize },
        },
        move: {
          enable: true,
          speed: 1,
          random: true,
          straight: false,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
      },
    });
  };

  return (
    <div className={className}>
      <div id={id} ref={particlesRef} className="w-full h-full" />
    </div>
  );
};
