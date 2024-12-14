import { describe, test } from "@jest/globals";
import request from "supertest";
import express from "express";
import mainRouter from "../../src/routes/main-route";

const app = express();
app.use(mainRouter);

describe("Pruebas para mainRouter", () => {

    test("GET / - Mensaje de bienvenida", async () => {
        return await request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain("Hola mundo al usuario");
            });
    });

    test("GET /api-key - Mensaje de apikey", async () => {
        return await request(app)
            .get("/api-key")
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain("la apikey de mi aplicacion es:");
            });
    });

    test("GET /validar-rut - RUT válido", async () => {
        const validRUT = '12.345.678-9'; // Ejemplo de un RUT válido
        return await request(app)
            .get(`/validar-rut?rut=${validRUT}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain(`El rut suministrado (${validRUT}) es : valido`);
            });
    });

    test("GET /validar-rut - RUT inválido", async () => {
        const invalidRUT = '12.345.678-1'; // Ejemplo de un RUT inválido
        return await request(app)
            .get(`/validar-rut?rut=${invalidRUT}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain(`El rut suministrado (${invalidRUT}) es : invalido`);
            });
    });

    test("GET /buscar-subcadena - Coincidencias en la cadena", async () => {
        const cadena = 'hola mundo, hola';
        const subcadena = 'hola';
        return await request(app)
            .get(`/buscar-subcadena?cadena=${cadena}&subcadena=${subcadena}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain(`La cadeja "${cadena}" tiene 2 repeticiones de la subcadena "${subcadena}"`);
            });
    });

    test("GET /buscar-subcadena - Sin coincidencias en la cadena", async () => {
        const cadena = 'hola mundo';
        const subcadena = 'adios';
        return await request(app)
            .get(`/buscar-subcadena?cadena=${cadena}&subcadena=${subcadena}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                expect(res.text).toContain(`La cadeja "${cadena}" tiene 0 repeticiones de la subcadena "${subcadena}"`);
            });
    });
});

