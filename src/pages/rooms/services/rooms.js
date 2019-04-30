import { PAGE_SIZE } from '../constants';
import request from '../../../utils/request';

export function get(id) {
  return request(`/api/rooms/${id}`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export function fetch({ page = 1 }) {
  let start = (page-1)*10;
  return request(`/api/rooms?_start=${start}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/rooms/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/rooms/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}

export function post(values) {
  return request('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}
