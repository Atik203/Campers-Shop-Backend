import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: 'some route', // have add route like this like userRoute
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
