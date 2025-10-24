import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/database.js';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT id, organization_id, username, email, role, status FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, organization_id, username, email, role, status FROM users WHERE id = ?',
            [req.params.id]
        );
        if ((rows as any[]).length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { organization_id, username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            'INSERT INTO users (organization_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [organization_id, username, email, hashedPassword, role]
        );
        
        const userData = {
            id: (result as any).insertId,
            organization_id,
            username,
            email,
            role
        };
        
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, role, status } = req.body;
        let password = req.body.password;
        
        if (password) {
            password = await bcrypt.hash(password, 10);
        }
        
        const updateData = password
            ? [username, email, password, role, status, req.params.id]
            : [username, email, role, status, req.params.id];
            
        const query = password
            ? 'UPDATE users SET username = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?'
            : 'UPDATE users SET username = ?, email = ?, role = ?, status = ? WHERE id = ?';
            
        await pool.query(query, updateData);
        
        res.json({
            id: req.params.id,
            username,
            email,
            role,
            status
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};