const request = require('supertest');

// Mock de dependencias ANTES de importar la app
jest.mock('../models/Category.js', () => ({
  Category: {
    findCategories: jest.fn(),
    saveCategory: jest.fn(),
  },
}));

jest.mock('../middleware/auth.js', () => ({
  validateTokenWithCookie: jest.fn((req, res, next) => next()),
}));

const { Category } = require('../models/Category.js');
const auth = require('../middleware/auth.js');
const app = require('../server.js'); // Importa la app real

describe('Category Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /categories debe devolver todas las categorías', async () => {
    const mockCategories = [
      { name: 'Comida' },
      { name: 'Repostería' },
    ];

    Category.findCategories.mockResolvedValue(mockCategories);

    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(200);
    expect(Category.findCategories).toHaveBeenCalledWith({}, undefined);
    expect(res.body).toEqual(mockCategories);
  });

  test('POST /categories debe crear una nueva categoría', async () => {
    const newCategory = { name: 'Bebidas' };
    Category.saveCategory.mockResolvedValue(newCategory);

    const res = await request(app)
      .post('/api/categories')
      .send(newCategory);

    expect(auth.validateTokenWithCookie).toHaveBeenCalled();
    expect(Category.saveCategory).toHaveBeenCalledWith(newCategory);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(newCategory);
  });

  test('POST /categories debe manejar errores al guardar la categoría', async () => {
    const newCategory = { name: 'Postres' };
    Category.saveCategory.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .post('/api/categories')
      .send(newCategory);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Error saving category' });
  });
});