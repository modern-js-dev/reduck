import { SubSolutionSchema, SubSolution } from "../../common";
export const MonorepoNewActionSchema = {
  key: 'monorepo_new_action',
  isObject: true,
  items: [SubSolutionSchema]
};
export const MonorepoNewActionConfig = {
  [SubSolution.MWA]: {
    isMonorepoSubProject: true,
    isTest: false
  },
  [SubSolution.MWATest]: {
    isMonorepoSubProject: true,
    isTest: true
  },
  [SubSolution.Module]: {
    isMonorepoSubProject: true,
    isPublic: true
  },
  [SubSolution.InnerModule]: {
    isMonorepoSubProject: true,
    isPublic: false
  }
};