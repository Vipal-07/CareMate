import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BASE_URL} from '../../config'
import { toast } from 'react-toastify'
import { authContext } from '../context/AuthContext.jsx'
import HashLoader from 'react-spinners/HashLoader.js'

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
  const {dispatch} = useContext(authContext)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.message)
      }
      dispatch({
        type:"LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.data?.role || null,
          token: null,
        },
      })
      setLoading(false);
      toast.success(result.message)
  navigate('/')
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 👋
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
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
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className='mt-7'>
            <button type="submit" className="w-full py-3 px-4 text-[18px] leading-[30px] bg-primaryColor text-white rounded-lg">
              ' {loading ? <HashLoader size={25} color="#ffffff" /> : 'Login'}
            </button>
          </div>
          <p className='mt-5 text-center text-textColor'>
            Don't have an account? <Link to="/register" className='text-primaryColor'>Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
