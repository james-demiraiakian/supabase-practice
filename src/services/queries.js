import { checkError, client } from './client.js';
export async function getMovies() {
  let movies = await client.from('movies').select('id');
  return checkError(movies);
}

export async function getMoviesWithDirector() {
  let movies = await client.from('movies').select(`*, directors (name)`);
  return checkError(movies);
}

export async function getDirectorNames() {
  let response = await client.from('directors').select('name');
  return checkError(response);
}

export async function getMovieById(id) {
  let response = await client.from('movies').select('*').match({ id }).single();
  return checkError(response);
}

export async function getMovieByTitle(title) {
  let response = await client.from('movies').select('*').match({ title }).single();
  return checkError(response);
}

export async function getOldestMovie() {
  let response = await client
    .from('movies')
    .select('*')
    .order('year', { ascending: true })
    .limit(1)
    .single();
  return checkError(response);
}

export async function getMoviesAfter(year) {
  let response = await client.from('movies').select('*').gt('year', year);
  return checkError(response);
}

export async function getHighestGrossingMovie() {
  let resp = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    .limit(1)
    .single();
  return checkError(resp);
}
