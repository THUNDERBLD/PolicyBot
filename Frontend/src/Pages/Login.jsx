// import { useState, useContext, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { Camera, Eye, EyeOff } from 'lucide-react';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [formType, setFormType] = useState("login");
//   const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     avatar: null
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);


//   const validateForm = () => {
//     const newErrors = {};
    
//     if (formType === "signup") {
//       if (!formData.username.trim()) {
//         newErrors.username = 'Username is required';
//       } else if (formData.username.length < 3) {
//         newErrors.username = 'Username must be at least 3 characters';
//       }
      
//       if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = 'Please enter a valid email';
//       }

//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       } else if (formData.password.length < 8) {
//         // Changed from 6 to 8 characters minimum
//         newErrors.password = 'Password must be at least 8 characters';
//       }
//     } else {
//       // Login validation
//       if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//       }
//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setFormData(prev => ({
//         ...prev,
//         avatar: file
//       }));
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check password length again before submission
//     if (formType === "signup" && formData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }
    
//     if (!validateForm()) {
//       const firstError = Object.values(errors)[0];
//       toast.error(firstError);
//       return;
//     }
//     setLoading(true);
  
//     try {
//       let response;
      
//       if (formType === "signup") {
//         const formPayload = new FormData();
//         Object.keys(formData).forEach(key => {
//           if (formData[key]) {
//             formPayload.append(key, formData[key]);
//           }
//         });
        
//         response = await axios.post(
//           `${backendUrl}/users/register`,
//           formPayload,
//           {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           }
//         );
        
//         // Check if response contains the token
//         if (response.data.success && response.data.data && response.data.data.accessToken) {
//           const accessToken = response.data.data.accessToken;
          
//           // Store token and update context
//           localStorage.setItem('token', accessToken);
//           setToken(accessToken);
          
//           toast.success('Account created successfully! You are now logged in.');
//           navigate('/');
//         } else {
//           // If no token is returned, inform the user they need to log in
//           toast.success('Account created successfully! Please log in.');
//           setFormType("login");
//         }
//       } else {
//         // Login flow...
//         response = await axios.post(
//           `${backendUrl}/users/login`,
//           {
//             email: formData.email,
//             password: formData.password
//           }
//         );
        
//         if (response.data.success && response.data.data && response.data.data.accessToken) {
//           const accessToken = response.data.data.accessToken;
          
//           // Store token and update context
//           localStorage.setItem('token', accessToken);
//           setToken(accessToken);
          
//           toast.success('Successfully signed in!');
//           navigate('/');
//         } else {
//           toast.error(response.data.message || 'Something went wrong');
//         }
//       }
//     } catch (err) {
//       // Error handling remains the same
//       toast.error(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   return (
//     <div className="w-[90%] max-w-md mx-auto mt-12 bg-white p-6 shadow-md">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="prata-regular text-3xl text-gray-800">
//           {formType === "login" ? "Login" : "Sign Up"}
//         </h1>
//         <div className="h-1.5 w-8 bg-gray-800" />
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {formType === "signup" && (
//           <>
//             <div className="flex flex-col items-center gap-2 mb-4">
//               <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
//                 {avatarPreview ? (
//                   <img 
//                     src={avatarPreview} 
//                     alt="Avatar preview" 
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <Camera className="w-8 h-8 text-gray-400" />
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               </div>
//               <span className="text-sm text-gray-500">Click to upload avatar</span>
//             </div>

//             <div className="space-y-1">
//               <input
//                 type="text"
//                 name="username"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
//                   errors.username ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Username"
//                 onChange={handleInputChange}
//                 value={formData.username.toLowerCase()}
//                 required
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-xs">{errors.username}</p>
//               )}
//             </div>
//           </>
//         )}

//         <div className="space-y-1">
//           <input
//             type="email"
//             name="email"
//             className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
//               errors.email ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="Email"
//             onChange={handleInputChange}
//             value={formData.email}
//             required
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs">{errors.email}</p>
//           )}
//         </div>

//         <div className="space-y-1">
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Password"
//               onChange={handleInputChange}
//               value={formData.password}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-5 h-5" />
//               ) : (
//                 <Eye className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-xs">{errors.password}</p>
//           )}
//         </div>

//         <div className="flex justify-between text-sm">
//           {formType === "login" ? (
//             <>
//               <button type="button" className="text-gray-600 hover:text-gray-800">
//                 Forgot Password?
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormType("signup");
//                   setErrors({});
//                 }}
//                 className="text-gray-600 hover:text-gray-800"
//               >
//                 Create account
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               onClick={() => {
//                 setFormType("login");
//                 setErrors({});
//               }}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               Already have an account? Login
//             </button>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//         >
//           {loading ? 'Processing...' : formType === "login" ? 'Sign in' : 'Sign up'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;