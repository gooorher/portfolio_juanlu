"use client"

import { Education } from "@/types"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Calendar } from "lucide-react"

interface EducationCardProps {
    education: Education
    index: number
}

export function EducationCard({ education, index }: EducationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl border border-white/10 hover:border-[var(--primary)]/50 transition-colors duration-300"
        >
            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-lg">
                            <GraduationCap className="text-[var(--primary)]" size={32} />
                        </div>
                        {education.gpa && (
                            <Badge variant="outline" className={`
                    ${parseFloat(education.gpa) > 8 ? "border-green-500 text-green-400" : "border-blue-500 text-blue-400"}
                 `}>
                                GPA: {education.gpa}
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{education.degree}</h3>
                    <p className="text-lg text-gray-300 mb-4">{education.institution}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{education.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{education.location}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {education.thesis && (
                            <div className="bg-white/5 p-3 rounded-md">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Thesis</p>
                                <p className="text-sm text-gray-300 italic">"{education.thesis}"</p>
                            </div>
                        )}

                        {education.specializations && education.specializations.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Areas</p>
                                <div className="flex flex-wrap gap-2">
                                    {education.specializations.slice(0, 4).map((spec, idx) => (
                                        <span key={idx} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">
                                            {spec.split('(')[0].trim()}
                                        </span>
                                    ))}
                                    {education.specializations.length > 4 && (
                                        <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">
                                            +{education.specializations.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
