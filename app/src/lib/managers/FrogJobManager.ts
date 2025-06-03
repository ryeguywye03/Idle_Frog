import type { Frog } from '$lib/core/Frogs';
import type { FrogJob, FrogJobData } from '../data/types';
import { get, writable } from 'svelte/store';
import { frogJobs } from '../data/FrogJobData';
import { resources, buildings, stats } from '../state';

export class FrogJobManager {
  static getJobs(): FrogJobData[] {
    return get(frogJobs);
  }

  static getUnlockedJobs(): FrogJobData[] {
    return this.getJobs().filter(j => j.unlocked);
  }

  static isJobUnlocked(jobId: FrogJob): boolean {
    return this.getJobs().some(j => j.id === jobId && j.unlocked);
  }

  static assignJobToFrog(frog: Frog, jobId: FrogJob): boolean {
    const jobs = this.getJobs();
    const jobData = jobs.find(j => j.id === jobId);
    if (!jobData || !jobData.unlocked) return false;

    frog.job = jobId;
    return true;
  }

  static updateUnlocks(): void {
    const current = get(frogJobs);
    const resMap = new Map(get(resources).map(r => [r.id, r]));
    const bldgMap = new Map(get(buildings).map(b => [b.id, b]));
    const stat = get(stats);

    let changed = false;

    for (const job of current) {
      if (job.unlocked) continue;

      const unlocked = (job.unlockConditions ?? []).every(cond => {
        switch (cond.type) {
          case 'resource': return resMap.get(cond.id)?.amount >= cond.amount;
          case 'building': return bldgMap.get(cond.id)?.count >= cond.amount;
          case 'stat': return stat[cond.key] >= cond.value;
          case 'upgrade': return false; // Add upgrade logic later
        }
      });

      if (unlocked) {
        job.unlocked = true;
        changed = true;
      }
    }

    if (changed) {
      frogJobs.set([...current]); // ✅ trigger reactivity
    }
  }
}
