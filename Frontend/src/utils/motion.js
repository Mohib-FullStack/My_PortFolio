import { keyframes } from "@mui/system";

// Keyframe animation for fade-in
const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade-in variant animation using MUI system
export const textVariant = (delay) => ({
  animation: `${fadeInKeyframes} 1.25s ease-out ${delay}s forwards`,
  opacity: 0,
});

// Fade-in animation with direction control
export const fadeIn = (direction, type, delay, duration) => {
  const transformDirection = {
    left: "translateX(100px)",
    right: "translateX(-100px)",
    up: "translateY(100px)",
    down: "translateY(-100px)",
  };

  return {
    animation: `${keyframes`
      from {
        opacity: 0;
        transform: ${transformDirection[direction] || "none"};
      }
      to {
        opacity: 1;
        transform: none;
      }
    `} ${duration}s ${type} ${delay}s forwards`,
    opacity: 0,
  };
};

// Zoom-in animation
export const zoomIn = (delay, duration) => ({
  animation: `${keyframes`
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `} ${duration}s ease-out ${delay}s forwards`,
  opacity: 0,
});

// Slide-in animation with direction control
export const slideIn = (direction, type, delay, duration) => {
  const transformDirection = {
    left: "translateX(-100%)",
    right: "translateX(100%)",
    up: "translateY(100%)",
    down: "translateY(-100%)",
  };

  return {
    animation: `${keyframes`
      from {
        transform: ${transformDirection[direction] || "none"};
      }
      to {
        transform: none;
      }
    `} ${duration}s ${type} ${delay}s forwards`,
  };
};

// Staggered container animation for multiple children
export const staggerContainer = (staggerChildren, delayChildren) => ({
  display: "flex",
  flexDirection: "column",
  "& > *": {
    animationDelay: `${delayChildren || 0}s`,
    animationTimingFunction: "ease-out",
    animationIterationCount: 1,
  },
});
