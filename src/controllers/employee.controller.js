const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const toDto = (doc) => ({
  employee_id: String(doc._id),
  first_name: doc.first_name,
  last_name: doc.last_name,
  email: doc.email,
  position: doc.position,
  salary: doc.salary,
  date_of_joining: doc.date_of_joining,
  department: doc.department
});

exports.list = async (_req, res, next) => {
  try { const all = await Employee.find().sort({ created_at: -1 }); res.status(200).json(all.map(toDto)); }
  catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { const emp = await Employee.create(req.body); res.status(201).json({ message:'Employee created successfully.', employee_id: String(emp._id) }); }
  catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const { eid } = req.params;
    if (!mongoose.isValidObjectId(eid)) return res.status(404).json({ status:false, message:'Employee not found' });
    const emp = await Employee.findById(eid);
    if (!emp) return res.status(404).json({ status:false, message:'Employee not found' });
    res.status(200).json(toDto(emp));
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const { eid } = req.params;
    if (!mongoose.isValidObjectId(eid)) return res.status(404).json({ status:false, message:'Employee not found' });
    const emp = await Employee.findByIdAndUpdate(eid, req.body, { new:true, runValidators:true });
    if (!emp) return res.status(404).json({ status:false, message:'Employee not found' });
    res.status(200).json({ message:'Employee details updated successfully.' });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const { eid } = req.query;
    if (!eid || !mongoose.isValidObjectId(eid)) return res.status(400).json({ status:false, message:'Valid eid query param required' });
    const del = await Employee.findByIdAndDelete(eid);
    if (!del) return res.status(404).json({ status:false, message:'Employee not found' });
    res.status(204).send();   // No Content (per rubric)
  } catch (e) { next(e); }
};

