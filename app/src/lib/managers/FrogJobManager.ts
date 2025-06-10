import type { Frog } from '$lib/core/Frogs';
import type { FrogJob, FrogJobData } from '$lib/types';
import { get, writable } from 'svelte/store';
import { frogJobs } from '../data/FrogJobData';
import { resources, buildings } from '$lib/stores';
import { stats } from '$lib/stores/statsStores/gameStats';

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

}
