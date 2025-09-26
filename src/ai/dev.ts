'use server';

import { config } from 'dotenv';
config();

// This file is for the genkit development server.
// We are now importing flows in a separate, server-only index file.
import './flows/diagnose-crowd-flow';
import './flows/diagnose-plant-flow';
