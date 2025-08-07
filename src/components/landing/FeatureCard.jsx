import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-codeflow-purple/10 to-codeflow-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-codeflow-purple to-codeflow-blue shadow-lg"
          >
            <Icon className="h-7 w-7 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
            {description}
          </p>
        </div>

        {/* Subtle border highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-codeflow-purple/20 via-transparent to-codeflow-blue/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ padding: '1px' }}>
          <div className="h-full w-full rounded-2xl bg-background" />
        </div>
      </div>
    </motion.div>
  );
}
