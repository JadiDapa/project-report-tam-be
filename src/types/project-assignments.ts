import { Accounts } from './accounts';
import { Projects } from './projects';

export interface ProjectAssignments {
  id: number;
  accountId: number;
  projectId: number;
  account: Accounts;
  project: Projects;
}
