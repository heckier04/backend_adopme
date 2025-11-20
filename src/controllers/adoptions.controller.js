import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll();
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    console.error('Error en getAllAdoptions:', error);
    res.status(500).send({ status: "error", error: error.message });
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    
    if (!adoption) {
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    }
    
    res.status(200).send({ status: "success", payload: adoption });
  } catch (error) {
    console.error('Error en getAdoption:', error);
    res.status(500).send({ status: "error", error: error.message });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    // Validar que el usuario existe
    const user = await usersService.getUserById(uid);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }

    // Validar que la mascota existe
    const pet = await petsService.getBy({ _id: pid });
    if (!pet) {
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }

    // Validar que la mascota no está adoptada
    if (pet.adopted) {
      return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    }

    // Actualizar relaciones
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    
    // Actualizar mascota como adoptada con el owner
    await petsService.update(pet._id, { adopted: true, owner: user._id });

    // Crear adopción (usa 'owner' en lugar de 'user')
    const adoption = await adoptionsService.save({ 
      owner: user._id, 
      pet: pet._id 
    });

    res.status(200).send({ status: "success", payload: adoption });
  } catch (error) {
    console.error('Error en createAdoption:', error);
    res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) {
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    }

    await adoptionsService.delete(adoptionId);
    res.status(200).send({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    console.error('Error en deleteAdoption:', error);
    res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
  deleteAdoption
};