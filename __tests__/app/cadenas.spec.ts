import { contarCoincidenciasEnCadena } from '../../src/app/cadenas';

describe('contarCoincidenciasEnCadena', () => {
    it('debería contar las coincidencias exactas de una subcadena en una cadena', () => {
        expect(contarCoincidenciasEnCadena('hola mundo, hola', 'hola')).toBe(1);
    });

    it('debería devolver 0 si la subcadena no existe en la cadena', () => {
        expect(contarCoincidenciasEnCadena('hola mundo', 'adios')).toBe(0);
    });

    it('debería devolver 0 si la subcadena es más larga que la cadena', () => {
        expect(contarCoincidenciasEnCadena('hola', 'mundo')).toBe(0);
    });

    it('debería contar 1 cuando la subcadena aparece una vez', () => {
        expect(contarCoincidenciasEnCadena('abcdef', 'cd')).toBe(1);
    });

    it('debería devolver 0 si la subcadena es una cadena vacía', () => {
        expect(contarCoincidenciasEnCadena('hola mundo', '')).toBe(0);
    });

    it('debería devolver 0 si la cadena es vacía', () => {
        expect(contarCoincidenciasEnCadena('', 'hola')).toBe(0);
    });

    it('debería contar las coincidencias de la subcadena en una cadena con mayúsculas y minúsculas diferentes', () => {
        expect(contarCoincidenciasEnCadena('Hola Mundo, hola', 'hola')).toBe(2);
    });
});
