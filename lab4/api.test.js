import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

describe('GET /posts — отримання всіх записів', () => {
  test('повертає статус 200 та масив записів', async () => {
    const response = await api.get('/posts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('кожен перший запис має основні поля з правильними типами', async () => {
    const response = await api.get('/posts');
    const post = response.data[0];

    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(typeof post.userId).toBe('number');
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });
});

describe('GET /posts/1 — отримання конкретного запису', () => {
  test('повертає статус 200 та обʼєкт запису', async () => {
    const response = await api.get('/posts/1');

    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.any(Object));
    expect(Array.isArray(response.data)).toBe(false);
  });

  test('повертає запис з id 1 та основними полями', async () => {
    const response = await api.get('/posts/1');

    expect(response.data.id).toBe(1);
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
    expect(typeof response.data.title).toBe('string');
    expect(typeof response.data.body).toBe('string');
  });
});

describe('POST /posts — створення запису', () => {
  const newPost = {
    title: 'Lab 4 integration test',
    body: 'Testing post creation with Axios and Jest',
    userId: 1
  };

  test('повертає статус 201 та обʼєкт створеного запису', async () => {
    const response = await api.post('/posts', newPost);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(expect.any(Object));
    expect(response.data).toHaveProperty('id');
  });

  test('повертає передані значення створеного запису', async () => {
    const response = await api.post('/posts', newPost);

    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
    expect(typeof response.data.id).toBe('number');
  });
});

describe('PUT /posts/1 — оновлення запису', () => {
  const updatedPost = {
    id: 1,
    title: 'Updated lab 4 post',
    body: 'Testing post update with Axios and Jest',
    userId: 1
  };

  test('повертає статус 200 та обʼєкт оновленого запису', async () => {
    const response = await api.put('/posts/1', updatedPost);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.any(Object));
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
    expect(response.data).toHaveProperty('userId');
  });

  test('повертає передані значення оновленого запису', async () => {
    const response = await api.put('/posts/1', updatedPost);

    expect(response.data.id).toBe(updatedPost.id);
    expect(response.data.title).toBe(updatedPost.title);
    expect(response.data.body).toBe(updatedPost.body);
    expect(response.data.userId).toBe(updatedPost.userId);
  });
});

describe('DELETE /posts/1 — видалення запису', () => {
  test('повертає статус 200 після видалення', async () => {
    const response = await api.delete('/posts/1');

    expect(response.status).toBe(200);
  });

  test('повертає порожній обʼєкт відповіді', async () => {
    const response = await api.delete('/posts/1');

    expect(response.data).toEqual(expect.any(Object));
    expect(Array.isArray(response.data)).toBe(false);
    expect(Object.keys(response.data)).toHaveLength(0);
  });
});
