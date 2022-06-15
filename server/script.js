/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const rnd = Math.floor(Math.random() * (60000 - 1 + 1)) + 1;
  // const rnd = 27961;

  // console.log('OUTSIDE ID', rnd);
  const response = http.get(`http://localhost:3000/products/${rnd}/styles`);
  check(response, {
    'is status 200': (r) => r.status === 200,
    'is id the same we asked': (r) => {
      const id = Number(r.json('product_id'));
      // console.log('OUTSIDE ID', rnd);
      return id === rnd;
    },
  });
  sleep(1);
}

export const options = {
  // vus: 1,
  // vus: 10,
  vus: 135,
  // vus: 150,
  duration: '1s',
  // duration: '5s',
  // duration: '10s',
  // thresholds: {
  //   http_req_failed: ['rate<0.02'],
  //   http_req_duration: ['p(95)<50'],
  //   http_req_duration: ['p(95)<100'],
  //   http_req_duration: ['p(95)<150'],
  //   http_req_duration: ['p(95)<400'],

  // http_reqs: ['count>6000'],
  // },
};
