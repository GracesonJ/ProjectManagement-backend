// controllers/projectController.js
const Project = require('../model/projectModel');
const User = require('../model/userModel');

exports.addProjectController = async (req, res) => {
  console.log('Inside Add Project Controller');
  
  const {
      projectName,
      clientCompany,
      clientName,
      clientEmail,
      deadline,
      description,
      managerId,
      managerName,
      managerEmail
  } = req.body;
  
  console.log('Received project data:', {
      projectName,
      clientCompany,
      clientName,
      clientEmail,
      deadline,
      description,
      managerId,
      managerName,
      managerEmail
  });

  const userId = req.user.id; // Assuming you have user info in req.user from authentication middleware
  console.log('User ID:', userId);

  try {
      // Check if project with same name already exists
      const existingProject = await Project.findOne({ projectName });
      if (existingProject) {
          console.log('Project already exists');
          return res.status(406).json({ message: 'Project with this name already exists' });
      }

      // Verify manager exists
      const manager = await User.findById(managerId);
      if (!manager) {
          console.log('Manager not found');
          return res.status(404).json({ message: 'Manager not found' });
      }

      // Create new project
      const newProject = new Project({
          projectName,
          clientCompany,
          clientName,
          clientEmail,
          deadline: new Date(deadline),
          description,
          manager: {
              id: managerId,
              name: managerName,
              email: managerEmail
          },
          status: 'Not Started',
          progress: 0,
          createdBy: userId,
          companyId: req.user.companyId // Assuming companyId is available in user object
      });

      await newProject.save();
      console.log('Project created successfully:', newProject);

      // Populate manager details in the response
      const savedProject = await Project.findById(newProject._id)
          .populate('createdBy', 'name email')
          .populate('companyId', 'name');

      res.status(200).json({
          success: true,
          message: 'Project created successfully',
          project: savedProject
      });

  } catch (error) {
      console.error('Error adding project:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to create project',
          error: error.message
      });
  }
};



