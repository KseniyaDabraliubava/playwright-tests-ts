import { test, expect } from '@playwright/test';
import { URL } from './const';

test.describe.serial('REST API Tests', () => {
    let createdObjectId: string;

    // 1. GET /objects - List of all objects
    test('GET: Return list of all objects', async ({ request }) => {
        const response = await request.get(`${URL}/objects`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('id');
    });

    // 2. GET: List of objects by ids
    test('GET: Return list of objects by ids', async ({ request }) => {
        const response = await request.get(`${URL}/objects?id=3&id=5&id=10`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test('GET: Return specific objects by ids', async ({ request }) => {
        const response = await request.get(`${URL}/objects?id=1&id=2`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);

        if (body.length > 0) {
            body.forEach((obj: any) => {
                expect(['1', '2']).toContain(obj.id);
            });
        }
    });

    // 3. GET: Single object
    test('GET: Return single object by id', async ({ request }) => {
        const response = await request.get(`${URL}/objects/7`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('id', '7');
        expect(body).toHaveProperty('name');
    });

    // 4. POST: Add object
    test('POST: Create new object with full data', async ({ request }) => {
        const newObject = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2019,
                price: 1849.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB'
            }
        };

        const response = await request.post(`${URL}/objects`, {
            data: newObject
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.name).toBe(newObject.name);
        expect(body.data).toMatchObject(newObject.data);

        // Сохраняем ID для использования в PUT, PATCH, DELETE
        createdObjectId = body.id;
    });

    test('POST: Create object with minimal data', async ({ request }) => {
        const newObject = {
            name: 'Apple AirPods',
            data: {
                generation: '3rd',
                price: 199.99
            }
        };

        const response = await request.post(`${URL}/objects`, {
            data: newObject
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.name).toBe(newObject.name);
    });

    // 5. PUT: Update object
    test('PUT: Fully update created object', async ({ request }) => {
        const updatedObject = {
            name: 'Apple MacBook Pro 16 (Updated)',
            data: {
                year: 2020,
                price: 2049.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '2 TB',
                color: 'silver'
            }
        };

        const response = await request.put(`${URL}/objects/${createdObjectId}`, {
            data: updatedObject
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBe(createdObjectId);
        expect(body.name).toBe(updatedObject.name);
        expect(body.data).toMatchObject(updatedObject.data);
    });

    // 6. PATCH: Partially update object
    test('PATCH: Partially update object name', async ({ request }) => {
        const patchData = {
            name: 'Apple MacBook Pro 16 (Patched Name)'
        };

        const response = await request.patch(`${URL}/objects/${createdObjectId}`, {
            data: patchData
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBe(createdObjectId);
        expect(body.name).toBe(patchData.name);
    });

    test('PATCH: Partially update data', async ({ request }) => {
        const patchData = {
            data: {
                color: 'Space Gray',
                price: 2500
            }
        };

        const response = await request.patch(`${URL}/objects/${createdObjectId}`, {
            data: patchData
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.color).toBe('Space Gray');
        expect(body.data.price).toBe(2500);
    });

    // 7. DELETE: Delete object
    test('DELETE: Should delete created object', async ({ request }) => {
        const response = await request.delete(`${URL}/objects/${createdObjectId}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('message');
    });

    test('DELETE: Should return 404 after deleting object', async ({ request }) => {
        const response = await request.get(`${URL}/objects/${createdObjectId}`);
        
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.error).toContain(`Oject with id=${createdObjectId} was not found`);
    });
});