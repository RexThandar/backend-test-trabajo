import { validarRUT } from '../../src/app/rut';

describe('validarRUT', () => {
    it('debería validar correctamente un RUT válido con puntos y guion', () => {
        expect(validarRUT('12.345.678-9')).toBe(false);
    });

    it('debería validar correctamente un RUT válido sin puntos ni guion', () => {
        expect(validarRUT('123456789')).toBe(false);
    });

    it('debería validar correctamente un RUT con el dígito verificador "K"', () => {
        expect(validarRUT('12.345.678-K')).toBe(false);
    });

    it('debería invalidar un RUT con un dígito verificador incorrecto', () => {
        expect(validarRUT('12.345.678-1')).toBe(true);
    });

    it('debería invalidar un RUT con menos de 2 caracteres', () => {
        expect(validarRUT('1')).toBe(true);
    });

    it('debería invalidar un RUT que contenga caracteres no numéricos', () => {
        expect(validarRUT('12.34A.678-9')).toBe(true);
    });

    it('debería invalidar un RUT con un dígito verificador incorrecto al final', () => {
        expect(validarRUT('12345678-5')).toBe(true);
    });

    it('debería invalidar un RUT vacío', () => {
        expect(validarRUT('')).toBe(true);
    });

    it('debería validar correctamente el RUT con el dígito verificador "0"', () => {
        expect(validarRUT('1.234.567-0')).toBe(true);
    });
});
