import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'unofficial-compassedu-api';
import moment from 'moment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const d = moment().format("DD/MM/YYYY")
        const data = req.body
        const s = new Session(`${process.env.NEXT_PUBLIC_PREFIX}`,data['sessionId'],data['userId'])
        const t = await s.getTimetable(d)
        res.status(200).json(t['data']);
    } catch (error) {
      res.status(500).json({ error: 'Request Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
