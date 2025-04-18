export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    delay,
  },
});

export const fadeInFromLeft = (delay: number = 0) => ({
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.5,
    delay,
  },
});

export const fadeInFromRight = (delay: number = 0) => ({
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.5,
    delay,
  },
});

export const fadeInView = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.3,
    delay,
  },
});

export const fadeInViewWithScale = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    duration: 0.8,
    delay,
  },
});

export const popIn = (delay: number = 0) => ({
  initial: { scale: 0.8, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    delay,
  },
});

export const popFromLeft = (delay: number = 0) => ({
  initial: { x: -20, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    delay,
  },
});

export const popFromRight = (delay: number = 0) => ({
  initial: { x: 20, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    delay,
  },
});

export const popFromTop = (delay: number = 0) => ({
  initial: { y: -20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
    delay,
  },
});

export const parentContainerFadeInView = (staggerChildren: number = 0.2) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren,
      },
    },
  },
});

export const childFadeInView = {
  variants: {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
};
