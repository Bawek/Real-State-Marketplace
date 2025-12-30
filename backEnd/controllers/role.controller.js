import createError from "../middleware/create.error.js";
import { roleModel } from "../model/role.model.js";

/* ===============================
   CREATE ROLE
================================ */
export const createRole = async (req, res, next) => {
    try {
        const { name, privilege } = req.body;

        if (!name) {
            return next(createError(400, "Role name is required"));
        }

        const existingRole = await roleModel.findOne({ name });
        if (existingRole) {
            return res.status(409).json({ message: "Role already exists" });
        }

        const role = await roleModel.create({
            name,
            privilege,
        });

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            role,
        });
    } catch (error) {
        console.error("❌ Create role error:", error);
        next(error)
    }
};

/* ===============================
   GET ALL ROLES
================================ */
export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await roleModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: roles.length,
            roles,
        });
    } catch (error) {
        console.error("❌ Get roles error:", error);
        next(error);
    }
};

/* ===============================
   GET ROLE BY ID
================================ */
export const getRoleById = async (req, res, next) => {
    try {
        const role = await roleModel.findById(req.params.id);

        if (!role) {
            return next(createError(404, "Role not found"));
        }

        res.status(200).json({
            success: true,
            role,
        });
    } catch (error) {
        console.error("❌ Get role error:", error);
        next(error);
    }
};

/* ===============================
   UPDATE ROLE
================================ */
export const updateRole = async (req, res, next) => {
    try {
        const { name, privilege } = req.body;

        const role = await roleModel.findById(req.params.id);

        if (!role) {
            return next(createError(404, "Role not found"));
        }

        if (name) role.name = name;
        if (privilege) role.privilege = privilege;

        await role.save();

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            role,
        });
    } catch (error) {
        console.error("❌ Update role error:", error);
        next(error);
    }
};

/* ===============================
   DELETE ROLE
================================ */
export const deleteRole = async (req, res, next) => {
    try {
        const role = await roleModel.findByIdAndDelete(req.params.id);

        if (!role) {
            return next(createError(404, "Role not found"));
        }

        res.status(200).json({
            success: true,
            message: "Role deleted successfully",
        });
    } catch (error) {
        console.error("❌ Delete role error:", error);
        next(error);
    }
};
