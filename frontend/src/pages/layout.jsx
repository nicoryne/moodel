import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "../components/Navbar"

export default function Layout() {
  const location = useLocation()

  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <main className="h-full overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}