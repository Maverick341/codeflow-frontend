import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/20 bg-background/80 backdrop-blur-md shadow-lg"
          : "border-border bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/temp-landing" className="flex items-center space-x-2 group">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-codeflow-purple to-codeflow-blue shadow-lg"
              whileHover={{
                boxShadow: "0 0 20px rgba(108, 92, 231, 0.5)",
                scale: 1.1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-codeflow-purple group-hover:to-codeflow-blue group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
            >
              CodeFlow
            </motion.span>
          </Link>
        </motion.div>

        {/* Center Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:flex"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/5 to-white/10 px-4 py-2 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-codeflow-purple" />
              </motion.div>
              <span className="text-sm font-medium text-white/90">
                Made for Developers
              </span>
            </div>
            
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 blur-sm"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <Link to="/login">
                Login
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-codeflow-purple to-codeflow-blue"
                  whileHover={{ width: "100%", x: "-50%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(108, 92, 231, 0)",
                "0 0 20px rgba(108, 92, 231, 0.3)",
                "0 0 0 rgba(108, 92, 231, 0)",
              ],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 },
              y: { duration: 0.2 },
            }}
          >
            <Button
              asChild
              size="sm"
              className="relative overflow-hidden bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white font-medium shadow-lg"
            >
              <Link to="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign Up
                </motion.span>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 3,
                  }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
