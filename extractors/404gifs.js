import { promises as fs } from 'fs';

const getNotFoundGifs = async () => {
  return await fs.readdir('./public/images/404');
};

export default getNotFoundGifs;
