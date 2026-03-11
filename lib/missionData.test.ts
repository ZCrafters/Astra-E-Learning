import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getMissionById } from './missionData.ts';

describe('getMissionById', () => {
  test('should return the correct mission when a valid ID is provided', () => {
    const missionId = 'tugas-01';
    const mission = getMissionById(missionId);

    assert.notStrictEqual(mission, undefined);
    assert.strictEqual(mission?.id, missionId);
    assert.strictEqual(mission?.title, 'Kenalan Sama 3 Orang di Sekitar');
  });

  test('should return the correct mission for another valid ID', () => {
    const missionId = 'tugas-05';
    const mission = getMissionById(missionId);

    assert.notStrictEqual(mission, undefined);
    assert.strictEqual(mission?.id, missionId);
    assert.strictEqual(mission?.category, 'kenali-orang');
  });

  test('should return undefined when a non-existent ID is provided', () => {
    const mission = getMissionById('non-existent-id');
    assert.strictEqual(mission, undefined);
  });

  test('should return undefined when an empty string is provided as ID', () => {
    const mission = getMissionById('');
    assert.strictEqual(mission, undefined);
  });
});
