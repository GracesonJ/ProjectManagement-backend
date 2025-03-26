const companies = require('../model/companyModel');

// Company Registration
exports.companyRegister = async (req, res) => {
    console.log(`Inside Company register function`);
    const { companyName, workspaceName, workspaceDescription, industryType, email, password } = req.body;
    console.log(companyName, workspaceName, workspaceDescription, industryType, email, password);

    try {
        const existingCompany = await companies.findOne({ email });
        if (existingCompany) {
            res.status(406).json("Company already exists");
        } else {
            const newCompany = new companies({
                companyName,
                workspaceName,
                industryType,
                email,
                password,
                workspaceDescription,
                profileImage: "",
            });
            await newCompany.save();
            res.status(200).json(newCompany);
        }
    } catch (error) {
        res.status(401).json(error);
    }
};