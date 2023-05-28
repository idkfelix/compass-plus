import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from '@idkfelix/compass-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const data = req.body
        const s = new Session('mullauna-vic')
        await s.auth(data['username'], data['password'])
        res.status(200).json({'sessionId':s.sessionId,'userId':s.userId});
    } catch (error) {
      res.status(500).json({ error: 'Auth Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
