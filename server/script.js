/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const rnd = Math.floor(Math.random() * (60000 - 1 + 1)) + 1;
  console.log('OUTSIDE ID', rnd);
  const response = http.get(`http://localhost:3000/products/${rnd}/styles`);
  check(response, {
    'is status 200': (r) => r.status === 200,
    'is id the same we asked': (r) => {
      const id = Number(r.json('product_id'));
      console.log('INSIDE ID', id);
      return id === rnd;
    },
  });
  sleep(1);
}

export const options = {
  vus: 1,
  duration: '5s',
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<300'],
    // http_reqs: ['count>6000'],
  },
};
