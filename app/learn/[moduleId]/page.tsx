import { coursesData } from '@/lib/courseData';
import LearningModuleClient from './LearningModuleClient';

export function generateStaticParams() {
  const params: { moduleId: string }[] = [];
  for (const course of coursesData) {
    for (const mod of course.modules) {
      params.push({ moduleId: mod.id });
    }
  }
  return params;
}

export default function LearningModulePage() {
  return <LearningModuleClient />;
}
