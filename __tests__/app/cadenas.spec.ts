import { describe, test } from "@jest/globals";
import { validarRUT } from '../../src/app/rut';

describe('validarRUT', () => {
    test('debería invalidar un RUT con puntos y guion y un dígito verificador incorrecto', () => {
        expect(validarRUT('12.345.678-9')).toBe(false);
    });

    test('debería invalidar un RUT sin puntos ni guion y un dígito verificador incorrecto', () => {
        expect(validarRUT('123456789')).toBe(false);
    });

    test('debería invalidar un RUT con el dígito verificador "K" incorrecto', () => {
        expect(validarRUT('12.345.678-K')).toBe(false);
    });

    test('debería invalidar un RUT con un dígito verificador incorrecto', () => {
        expect(validarRUT('12.345.678-1')).toBe(false);
    });

    test('debería invalidar un RUT con menos de 2 caracteres', () => {
        expect(validarRUT('1')).toBe(false);
    });

    test('debería invalidar un RUT que contenga caracteres no numéricos', () => {
        expect(validarRUT('12.34A.678-9')).toBe(false);
    });

    test('debería validar un RUT sin puntos ni guion con un dígito verificador correcto', () => {
        expect(validarRUT('12345678-5')).toBe(true);
    });

    test('debería invalidar un RUT vacío', () => {
        expect(validarRUT('')).toBe(false);
    });

    test('debería invalidar un RUT con puntos y guion y el dígito verificador "0" incorrecto', () => {
        expect(validarRUT('1.234.567-0')).toBe(false);
    });
});
