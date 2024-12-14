import { describe, test } from "@jest/globals";
import { validarRUT } from '../../src/app/rut';

describe('validarRUT', () => {
    test('Validaciones de rut', () => {
        expect(validarRUT('12.345.678-9')).toBe(false);
        // expect(validarRUT('123456789')).toBe(false);
        // expect(validarRUT('12.345.678-K')).toBe(false);
        // expect(validarRUT('12.345.678-1')).toBe(false);
        // expect(validarRUT('1')).toBe(false);
        // expect(validarRUT('12.34A.678-9')).toBe(false);
        // expect(validarRUT('12345678-5')).toBe(false);
        // expect(validarRUT('')).toBe(false);
        // expect(validarRUT('1.234.567-0')).toBe(false);
    });
});
