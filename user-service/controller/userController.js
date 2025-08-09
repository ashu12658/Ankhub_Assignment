const User = require ('../model/user');
const jwt = require ('jsonwebtoken');

exports.registerUser = async (req ,res) =>{
    try{
        const {name,email,phone,city,password} = req.body
    const isUserExisting = await User.findOne({email})
    if(isUserExisting){
        return res.status(400).json('User Already Existing')
    } 
    const user = new User ({
        name,email,password,phone,city
    })
    await user.save();
    res.status(201).json({message:"User Created Succesfully",user})
    }
    catch(error){
        console.log('Error Registering User',error)
        return res.status(500).json({message:"Internal Server Error",error})
    }};

    exports.loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body;

         const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
     const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: 'user' },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
      },
    });
  } catch (error) {
    console.error('Error During Logic:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
    


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "users", users });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error: error.message });
  }
};