import { PAGE_SIZE } from '../constants';
import request from '../../../utils/request';

export function get(id) {
  return request(`/api/departments/${id}`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function fetch({ page = 1 }) {
  let start = (page-1)*10;
  return request(`/api/departments?_start=${start}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/departments/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/departments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}

export function post(values) {
  return request('/api/departments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}
