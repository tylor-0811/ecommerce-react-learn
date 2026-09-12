import { it, expect, describe } from 'vitest';
import { formatPriceCents } from './util.js';

describe('formatPriceCents() testing', () => {
    it('Formats 1999 cents ad $19.99', () => {
        expect(formatPriceCents(1999))
            .toBe('$19.99');
    });

    it('Displays 2 decimals', () => {
        expect(formatPriceCents(1090))
            .toBe('$10.90');

        expect(formatPriceCents(100))
            .toBe('$1.00');
    });
});