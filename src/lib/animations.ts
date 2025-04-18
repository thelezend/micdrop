export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

export const fadeInView = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export const popIn = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
};

export const parentContainerFadeInView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};

export const childFadeInView = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
};
