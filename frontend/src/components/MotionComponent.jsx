import { motion } from "framer-motion"

export const MotionComponent = ({ as, children, ...props }) => {
  const ChildrenComponent = motion.create(as, {
    forwardMotionProps: true,
  })

  return <ChildrenComponent {...props}>{children}</ChildrenComponent>
}
