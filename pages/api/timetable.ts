import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from '@idkfelix/compass-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const data = req.body
        const s = new Session('mullauna-vic',data['sessionId'],data['userId'])
        const t = await s.getTimetable('22/05/2023')
        res.status(200).json(t['data']);
    } catch (error) {
      res.status(500).json({ error: 'Request Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}