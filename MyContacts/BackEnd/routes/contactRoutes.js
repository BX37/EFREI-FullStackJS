const express = require('express');
const router = express.Router();
const Contact = require('../Models/contact');
const { authenticate } = require('../middleware');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts de l'utilisateur
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *       401:
 *         description: Accès refusé (JWT manquant ou invalide)
 */
router.get('/', authenticate, async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.userId });
        if (!contacts) {
            return res.status(404).json({ message: 'Aucun contact trouvé' });
        }
        res.json(contacts); // Assure-toi que contacts est un tableau
    } catch (err) {
        console.error('Erreur lors de la récupération des contacts:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/', authenticate, async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;

        const contact = new Contact({
            firstName,
            lastName,
            phone,
            userId: req.userId,
        });

        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contact à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findOneAndUpdate(
            { _id: id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) return res.status(404).json({ message: 'Contact non trouvé' });
        res.json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findOneAndDelete({ _id: id, userId: req.userId });

        if (!contact) return res.status(404).json({ message: 'Contact non trouvé' });
        res.json({ message: 'Contact supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
