import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface JudgmentDisplayProps {
  canReach: boolean;
  destination: string;
}

export default function JudgmentDisplay({ canReach, destination }: JudgmentDisplayProps) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="flex flex-col items-center justify-center py-8"
    >
      {canReach ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-success/20 rounded-full blur-3xl scale-150" />
          <CheckCircle 
            className="h-48 w-48 text-success relative z-10" 
            strokeWidth={1.5}
            data-testid="icon-success"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-3xl scale-150" />
          <XCircle 
            className="h-48 w-48 text-destructive relative z-10" 
            strokeWidth={1.5}
            data-testid="icon-failure"
          />
        </motion.div>
      )}
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <p className="text-3xl font-bold mb-2" data-testid="text-destination">
          {destination}
        </p>
        <p 
          className={`text-xl font-medium ${canReach ? 'text-success' : 'text-destructive'}`}
          data-testid="text-judgment"
        >
          {canReach ? 'このバスに乗れます' : 'このバスには乗れません'}
        </p>
      </motion.div>
    </motion.div>
  );
}
