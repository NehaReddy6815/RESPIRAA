import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const GlassCard = ({ children, className, hoverable, ...props }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={cn(hoverable ? "glass-card-hover cursor-pointer" : "glass-card", className)}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
