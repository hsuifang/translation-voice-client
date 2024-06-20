import { render, screen, userEvent, cleanup } from '@/lib/test-utils';
import { vi } from 'vitest';
import AudioController from './AudioController';

describe('AudioController', () => {
  beforeAll(() => {
    HTMLMediaElement.prototype.play = vi.fn();
    HTMLMediaElement.prototype.pause = vi.fn();
  });
});
