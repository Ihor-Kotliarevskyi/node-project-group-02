import { Region } from '../models/region.js';
import { LocationType } from '../models/locationType.js';

export const getAllRegions = () => Region.find().sort({ name: 1 });

export const getAllTypes = () => LocationType.find().sort({ name: 1 });
