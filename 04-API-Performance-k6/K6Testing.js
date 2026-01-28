import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://dummyjson.com';
const CATEGORY = __ENV.CATEGORY || 'smartphones';

// ---------- Shared metric
const totalRequests = new Counter('total_requests');

// ---------- Endpoint 1: /products/categories
const categoriesDetailsDuration = new Trend('categories_details_duration', true);
const categoriesDetailsSuccess = new Counter('categories_details_success');
const categoriesDetailsFailed = new Counter('categories_details_failed');

// ---------- Endpoint 2: /products/category-list
const categoryNamesDuration = new Trend('category_names_duration', true);
const categoryNamesSuccess = new Counter('category_names_success');
const categoryNamesFailed = new Counter('category_names_failed');

// ---------- Endpoint 3: /products/category/{CATEGORY}
const productsByCategoryDuration = new Trend('products_by_category_duration', true);
const productsByCategorySuccess = new Counter('products_by_category_success');
const productsByCategoryFailed = new Counter('products_by_category_failed');

export const options = {
  scenarios: {
    // Endpoint 1
    categories_details_5vus: {
      executor: 'constant-vus',
      vus: 5,
      duration: '10s',
      exec: 'categoriesDetails',
    },
    categories_details_25vus: {
      executor: 'constant-vus',
      vus: 25,
      duration: '45s',     // heavier
      exec: 'categoriesDetails',
      startTime: '15s',
    },

    // Endpoint 2
    category_names_5vus: {
      executor: 'constant-vus',
      vus: 5,
      duration: '10s',
      exec: 'categoryNames',
      startTime: '65s',
    },
    category_names_25vus: {
      executor: 'constant-vus',
      vus: 25,
      duration: '45s',     // heavier
      exec: 'categoryNames',
      startTime: '80s',
    },

    // Endpoint 3
    products_by_category_5vus: {
      executor: 'constant-vus',
      vus: 5,
      duration: '10s',
      exec: 'productsByCategory',
      startTime: '130s',
    },
    products_by_category_25vus: {
      executor: 'constant-vus',
      vus: 25,
      duration: '45s',     // heavier
      exec: 'productsByCategory',
      startTime: '145s',
    },
  },

    thresholds: {
    // Much stricter error budget
    http_req_failed: ['rate<0.005'], // <0.5% failures [web:40]

    // Much stricter latency SLOs
    http_req_duration: [
        'p(90)<500',
        'p(95)<800',
        'p(99)<1200',
        'p(99.9)<1800',
        'max<2500',
    ], // percentile + max are valid aggregations [web:40][web:52]

    // Stricter per-endpoint custom Trend thresholds
    categories_details_duration: [
        'p(95)<800',
        'p(99)<1200',
        'p(99.9)<1800',
        'max<2500',
    ],
    category_names_duration: [
        'p(95)<800',
        'p(99)<1200',
        'p(99.9)<1800',
        'max<2500',
    ],
    products_by_category_duration: [
        'p(95)<900',   // (optional) slightly higher if this endpoint is heavier
        'p(99)<1400',
        'p(99.9)<2000',
        'max<3000',
    ],

    total_requests: ['count>0'],
  },
};


// ---------------- Endpoint functions (same style as your 1st script)

export function categoriesDetails() {
  const url = `${BASE_URL}/products/categories`;

  group('Products - Categories Details', () => {
    const res = http.get(url);
    const duration = res.timings.duration;
    categoriesDetailsDuration.add(duration);

    let body = null;
    try { body = res.json(); } catch (_) {}

    const passed = check(res, {
      'status is 2xx': (r) => r.status >= 200 && r.status < 300,
      'response time < 1500ms': () => duration < 1500,
      'response is json': () => body !== null,
      'response is array': () => Array.isArray(body),
      'array not empty': () => Array.isArray(body) && body.length > 0,
      'categories have slug/name/url': () =>
        Array.isArray(body) &&
        body.every(c =>
          typeof c.slug === 'string' &&
          typeof c.name === 'string' &&
          typeof c.url === 'string'
        ),
    });

    totalRequests.add(1);
    if (passed) categoriesDetailsSuccess.add(1);
    else categoriesDetailsFailed.add(1);
  });

  sleep(1); // per VU [web:3]
}

export function categoryNames() {
  const url = `${BASE_URL}/products/category-list`;

  group('Products - Category Names', () => {
    const res = http.get(url);
    const duration = res.timings.duration;
    categoryNamesDuration.add(duration);

    let body = null;
    try { body = res.json(); } catch (_) {}

    const passed = check(res, {
      'status is 2xx': (r) => r.status >= 200 && r.status < 300,
      'response time < 1500ms': () => duration < 1500,
      'response is json': () => body !== null,
      'response is array': () => Array.isArray(body),
      'array not empty': () => Array.isArray(body) && body.length > 0,
      'array contains strings only': () =>
        Array.isArray(body) && body.every(c => typeof c === 'string'),
    });

    totalRequests.add(1);
    if (passed) categoryNamesSuccess.add(1);
    else categoryNamesFailed.add(1);
  });

  sleep(1); // per VU [web:3]
}

export function productsByCategory() {
  const url = `${BASE_URL}/products/category/${CATEGORY}`;

  group('Products - By Category', () => {
    const res = http.get(url);
    const duration = res.timings.duration;
    productsByCategoryDuration.add(duration);

    let body = null;
    try { body = res.json(); } catch (_) {}

    const passed = check(res, {
      'status is 2xx': (r) => r.status >= 200 && r.status < 300,
      'response time < 1500ms': () => duration < 1500,
      'response is json': () => body !== null,
      'products array exists': () => Array.isArray(body?.products),
      'products not empty': () => (body?.products?.length || 0) > 0,
      'all products match category': () =>
        Array.isArray(body?.products) &&
        body.products.every(p => p.category === CATEGORY),
    });

    totalRequests.add(1);
    if (passed) productsByCategorySuccess.add(1);
    else productsByCategoryFailed.add(1);
  });

  sleep(1); // per VU [web:3]
}
