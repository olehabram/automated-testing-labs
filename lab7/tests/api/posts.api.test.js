import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

describe('JSONPlaceholder posts API', () => {
  test('GET /posts returns status 200 and an array', async () => {
    const response = await axios.get(API_URL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 returns post with id 1', async () => {
    const response = await axios.get(`${API_URL}/1`);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST /posts creates a post and returns status 201', async () => {
    const payload = {
      title: 'Lab 7 post',
      body: 'Automation API test',
      userId: 1
    };

    const response = await axios.post(API_URL, payload);

    expect(response.status).toBe(201);
    expect(response.data).toMatchObject(payload);
    expect(response.data.id).toBeDefined();
  });

  test('PUT /posts/1 updates a post and returns status 200', async () => {
    const payload = {
      id: 1,
      title: 'Updated Lab 7 post',
      body: 'Updated by API test',
      userId: 1
    };

    const response = await axios.put(`${API_URL}/1`, payload);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(payload);
  });

  test('DELETE /posts/1 returns status 200', async () => {
    const response = await axios.delete(`${API_URL}/1`);

    expect(response.status).toBe(200);
  });
});
