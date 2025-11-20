// src/routes/mocks.router.js
import express from 'express';
import { generateUser, generatePet } from '../utils/mocking.js';
import UsersDao from '../dao/Users.dao.js';
import PetsDao from '../dao/Pets.dao.js';

const router = express.Router();
const usersDao = new UsersDao();
const petsDao = new PetsDao();

router.get('/mockingpets', async (req, res) => {
  try {
    const pets = Array.from({ length: 100 }, generatePet);
    res.json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/mockingusers', async (req, res) => {
  try {
    const users = Array.from({ length: 50 }, generateUser);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const generatedUsers = Array.from({ length: users }, generateUser);
    const generatedPets = Array.from({ length: pets }, generatePet);

    const usersResult = await usersDao.createMany(generatedUsers);
    const petsResult = await petsDao.createMany(generatedPets);

    res.json({
      status: 'success',
      inserted: {
        users: usersResult.length,
        pets: petsResult.length,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
