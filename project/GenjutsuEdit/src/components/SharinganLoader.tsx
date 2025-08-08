import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '@/contexts/GlobalContext';
interface SharinganLoaderProps {
size?: number;
className?: string;
onAnimationComplete?: () => void;}
function UchihaText({ children, uchihaText }: { children: React.ReactNode; uchihaText?: string }) {
const { uchihaMode } = useGlobalContext();
if (uchihaMode && uchihaText) {
return <>{uchihaText}</>;}
return <>{children}</>;}
export const SharinganLoader: React.FC<SharinganLoaderProps> = ({ 
size = 120, 
className = "",
onAnimationComplete}) => {
const [isMangekyouActive, setIsMangekyouActive] = React.useState(false);
const { uchihaMode } = useGlobalContext();
React.useEffect(() => {
const mangekyouTimer = setTimeout(() => {
setIsMangekyouActive(true);}, 1000);
if (onAnimationComplete) {
const completeTimer = setTimeout(() => {
onAnimationComplete();}, 2000);
return () => {
clearTimeout(mangekyouTimer);
clearTimeout(completeTimer);
};}
return () => clearTimeout(mangekyouTimer);
}, [onAnimationComplete]);
return (
<div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
<div className="relative">
<motion.div 
className={`sharingan-container ${isMangekyouActive ? 'mangekyou-active' : ''} ${className}`}
style={{ width: size * 2, height: size * 2 }}
animate={{
scale: [1, 1.1, 1],}}
transition={{
scale: { duration: 2, repeat: 0 },}}>
<div className="eye-base">
<div className="iris">
<motion.div 
className="tomoe-sharingan"
animate={!isMangekyouActive ? {
rotate: 360,
} : {
opacity: 0,
scale: 0.5,
rotate: 360,}}
transition={!isMangekyouActive ? {
rotate: { duration: 1, ease: "linear", repeat: 0 },
} : {
duration: 0.5,
ease: "easeInOut"}}>
<div className="pupil"></div>
<motion.div 
className="tomoe tomoe-1"
animate={{
scale: [1, 1.2, 1],}}
transition={{
duration: 1.5,
repeat: 0,
delay: 0,}}/>
<motion.div 
className="tomoe tomoe-2"
animate={{
scale: [1, 1.2, 1],}}
transition={{
duration: 1.5,
repeat: 0,
delay: 0.2,}}/>
<motion.div 
className="tomoe tomoe-3"
animate={{
scale: [1, 1.2, 1],}}
transition={{
duration: 1.5,
repeat: 0,
delay: 0.4,
}}/>
<motion.div 
className="ring ring-inner"
animate={{
scale: [1, 1.2, 1],
opacity: [0.6, 0.3, 0.6],}}
transition={{
duration: 2,
repeat: 0,}}/>
<motion.div 
className="ring ring-outer"
animate={{
scale: [1, 1.1, 1],
opacity: [0.4, 0.2, 0.4],}}
transition={{
duration: 2,
repeat: 0,}}
/></motion.div>
<motion.div 
className="mangekyou-sharingan"
initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
animate={isMangekyouActive ? {
opacity: 1,
scale: 1,
rotate: 0,
} : {}}
transition={{
duration: 0.8,
ease: "easeOut"
}}>
<div className="mangekyou-pupil"></div>
<motion.div 
className="mangekyou-pattern"
animate={isMangekyouActive ? {
rotate: 360,} : {}}
transition={isMangekyouActive ? {
rotate: { duration: 1, ease: "linear", repeat: 0 },
} : {}}>
<div className="blade blade-1"></div>
<div className="blade blade-2"></div>
<div className="blade blade-3"></div>
<div className="blade-center"></div>
</motion.div>
</motion.div>
</div>
</div>
</motion.div>
<motion.div
className="absolute inset-0 rounded-full"
style={{ width: size * 2, height: size * 2 }}
animate={{
boxShadow: [
"0 0 30px #dc2626, 0 0 60px #dc2626",
"0 0 50px #dc2626, 0 0 100px #dc2626",
"0 0 30px #dc2626, 0 0 60px #dc2626",],}}
transition={{
duration: 2,
repeat: 0,}}/>
<motion.div
className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold text-center"
animate={{
opacity: [0.7, 1, 0.7],
}}
transition={{
duration: 1.5,
repeat: 0,}}>
<div className="text-red-400">
{isMangekyouActive ? (
<UchihaText uchihaText="Mangekyou Sharingan Activated">Mangekyou Sharingan</UchihaText>
) : (
<UchihaText uchihaText="Awakening Sharingan">Awakening Sharingan</UchihaText>)}
</div>
<motion.div
className="text-white text-sm mt-2"
animate={{
opacity: [0, 1, 0],}}
transition={{
duration: 2,
repeat: 0,}}>
{isMangekyouActive ? (
<UchihaText uchihaText="Reality Bending in Progress...">Reality Bending...</UchihaText>
) : (
<UchihaText uchihaText="Channeling Chakra...">Channeling Chakra...</UchihaText>)}
</motion.div>
</motion.div></div>
</div>);};
