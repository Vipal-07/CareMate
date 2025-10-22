import React from 'react'
import signupImg from '../assets/images/signup.gif'
import { Link, useNavigate } from 'react-router-dom'
import {BASE_URL} from '../../config'
import { toast } from 'react-toastify'
import HashLoader from "react-spinners/HashLoader";
import  uploadImageToCloudinary  from '../utils/uploadCloudinary';

export default function Signup() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);


  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    photo: '',
    gender: '',
    role: 'patient'
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data.url });
    setSelectedFile(data.url);
    setPreviewUrl(data.url);
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
          credentials: 'include',
        body: JSON.stringify(formData)
        })
        const {message} = await res.json()
        if(!res.ok) {
          throw new Error(message)
        }
        setLoading(false);
        toast.success(message)
        navigate('/home')
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ----------- img box ---------- */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          {/* ------- sign up form -------- */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className='mb-5 flex items-center justify-between'>
                <label htmlFor=''
                  className='text-textColor text-[16px] leading-7 font-bold'
                >
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label htmlFor=''
                  className='text-textColor text-[16px] leading-7 font-bold'
                >
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className='mb-5 flex items-center gap-3'>
               { selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor p-1 flex items-center justify-center'>
                  <img src={previewUrl} alt="User Avatar" className='w-full rounded-full' />
                </figure>}
                <div className='relative w-[130px] h-[50px]'>
                  <input type="file" name="photo" id="customFile"
                  onChange={handleFileInputChange}
                  accept=".jpg, .png"
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] cursor-pointer text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate'>
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className='mt-7'>
                <button
                  disabled={loading && true}
                 type="submit" className="w-full py-3 px-4 text-[18px] leading-[30px] bg-primaryColor text-white rounded-lg">
                  {loading ? <HashLoader size={35} color ="#ffffff"/> : 'Sign Up'}
                </button>
              </div>
              <p className='mt-5 text-center text-textColor'>
                Already have an account? <Link to="/login" className='text-primaryColor'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}
