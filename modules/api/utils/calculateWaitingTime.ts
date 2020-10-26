import { Document } from 'mongoose';

/**
 * This function will return the waiting time in minutes of a ride.
 * @param doc
 */
export default function calculateWaitingTime(doc: Document): number {
  return Math.round(doc.get('queueLength') * 60 / doc.get('throughput')) || 0;
}
