export const getMatchPercentage = (topicSkills: string[], userSkills?: string[]): number => {
  if (!topicSkills.length || !userSkills) return 0;
  const userSkillsLower = userSkills.map((s) => s.toLowerCase());
  const topicSkillsLower = topicSkills.map((s) => s.toLowerCase());
  const common = topicSkillsLower.filter((skill) => userSkillsLower.includes(skill)).length;
  return Math.round((common / topicSkills.length) * 100);
};
