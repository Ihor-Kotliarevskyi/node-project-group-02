import { getAllRegions, getAllTypes } from '../services/categoriesService.js';

export const getRegions = async (req, res) => {
  const data = await getAllRegions();
  res.status(200).json({ data });
};

export const getTypes = async (req, res) => {
  const data = await getAllTypes();
  res.status(200).json({ data });
};
