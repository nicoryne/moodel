import { motion } from "framer-motion"

export const MotionComponent = ({ as: Component = "div", children, ...props }) => {
  const MotionElement = motion.create(Component)

  return <MotionElement {...props}>{children}</MotionElement>
}
