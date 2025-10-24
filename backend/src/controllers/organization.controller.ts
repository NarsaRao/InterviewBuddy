import { Request, Response } from 'express';
import pool from '../config/database.js';

export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM organizations');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching organizations', error });
    }
};

export const getOrganizationById = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM organizations WHERE id = ?', [req.params.id]);
        if ((rows as any[]).length === 0) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching organization', error });
    }
};

export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, website } = req.body;
        const [result] = await pool.query(
            'INSERT INTO organizations (name, email, phone, website) VALUES (?, ?, ?, ?)',
            [name, email, phone, website]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating organization', error });
    }
};

export const updateOrganization = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, website, status } = req.body;
        await pool.query(
            'UPDATE organizations SET name = ?, email = ?, phone = ?, website = ?, status = ? WHERE id = ?',
            [name, email, phone, website, status, req.params.id]
        );
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error updating organization', error });
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        await pool.query('DELETE FROM organizations WHERE id = ?', [req.params.id]);
        res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting organization', error });
    }
};