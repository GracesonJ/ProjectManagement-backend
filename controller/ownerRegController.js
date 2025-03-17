// import user
const owners = require('../model/ownerModel')

// register
exports.ownerRegister = async (req, res)=>{
    console.log(`inside Owner register function`);
    const {companyName, workspaceName, workspaceDescription,  industryType, ownerName, email, password, phone} = req.body
    console.log(companyName, workspaceName, workspaceDescription, industryType, ownerName, email, password, phone);

    try {
        const existingOwner =  await owners.findOne({email})
        if(existingOwner){
            res.status(406).json("User already Exists")
        }else{
            const newOwner = new owners({
                companyName,
                workspaceName,
                industryType,
                ownerName,
                email,
                password,
                phone,
                workspaceDescription,
                profileImage: "",
                dateOfBirth: ""

            })
            await newOwner.save()
            res.status(200).json(newOwner)
        }
        
    } catch (error) {
        res.status(401).json(error)
    } 
}