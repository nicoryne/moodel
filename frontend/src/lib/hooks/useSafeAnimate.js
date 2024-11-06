import { useAnimate } from "framer-motion"

export default function useSafeAnimate() {
  const [scope, animate] = useAnimate()

  const safeAnimate = (...args) => {
    if (!scope.current) {
      return
    }
    return animate(...args)
  }

  return [scope, safeAnimate]
}
