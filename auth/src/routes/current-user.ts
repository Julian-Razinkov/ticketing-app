import express from 'express';
//fix files path in common package.json
import { currentUser } from '@razinkovtick/common'; 
import { requireAuth } from '@razinkovtick/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
