import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from "../../../config";
import { toast } from 'react-toastify';

export default function Profile({doctorData}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
    qualification: [],
        experiences: [],
        timeSlots: [{ day: '', startingTime: '', endingTime: '' }],
        about: '',
        photo: null,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(()=>{
        if(doctorData){
            setFormData({
                name: doctorData.name,
                email: doctorData.email,
                phone: doctorData.phone,
                bio: doctorData.bio,
                gender: doctorData.gender,
                specialization: doctorData.specialization,
                ticketPrice: doctorData.ticketPrice,
                qualification: doctorData.qualification || [],
                experiences: doctorData.experiences,
                timeSlots: doctorData.timeSlots,
                about: doctorData.about,
                photo: doctorData.photo,
            });
        }
    },[doctorData])
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImageToCloudinary(file);
            setFormData({
                ...formData,
                photo: imageUrl.url
            });
            setSelectedFile(file);
            setPreviewUrl(imageUrl.url);
        }
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (!response.ok) {
               throw Error(result.message || 'Failed to update profile');
            }
            toast.success(result.message || 'Profile updated successfully');
            // trigger a reload so dashboard shows updated data (or you could re-fetch)
            window.location.reload();
        } catch (error) {
            toast.error(error.message || 'An error occurred while updating the profile');
        }
    };

    const addItem = (key, item) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: [...(Array.isArray(prevFormData[key]) ? prevFormData[key] : []), item]
        }))
    }

    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            const current = Array.isArray(prevFormData[key]) ? prevFormData[key] : [];
            const updateItems = [...current];
            updateItems[index] = { ...updateItems[index], [name]: value };
            return {
                ...prevFormData,
                [key]: updateItems
            }
        })
    }

    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: (Array.isArray(prevFormData[key]) ? prevFormData[key].filter((_, i) => i !== index) : [])
        }))
    }

    const addExperiences = (e) => {
        e.preventDefault();
        addItem("experiences", { startingDate: '', endingDate: '', position: 'Senior Surgeon', hospital: 'Dhaka Medical Collage' })
    }
    const handleExperiencesChange = (event, index) => {

        handleReusableInputChangeFunc('experiences', index, event)
    }
    const deleteExperiences = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index)
    }

    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem("timeSlots", { day: 'Sunday', startingTime: '10:00', endingTime: '04:30' })
    }
    const handleTimeSlotChange = (event, index) => {

        handleReusableInputChangeFunc('timeSlots', index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index)
    }

    const addQualification = (e) => {
        e.preventDefault();
        addItem("qualification", { startingDate: '', endingDate: '', degree: 'PHD', university: '' })
    }
    const handleQualificationChange = (event, index) => {

        handleReusableInputChangeFunc('qualification', index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualification', index)
    }
    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form_label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form_input"
                        readOnly
                        aria-readonly
                        disabled="true"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form_input"
                    />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form_label">Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form_input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form_label">Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form_input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className='from_label'>
                                Ticket. Price*
                            </p>
                            <input
                                type="number"
                                placeholder='100'
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                className='form_input'
                                onChange={handleInputChange}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Qualifications*</p>
                    {formData.qualification?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date*</p>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date*</p>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <p className="form_label">Degree*</p>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            className="form_input"
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">University*</p>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            className="form_input"
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteQualification(e, index)} className='bg-red-700  p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Qualification</button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date*</p>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e => handleExperiencesChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date*</p>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.startingDate}
                                            className="form_input"
                                            onChange={e => handleExperiencesChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <p className="form_label">Position*</p>
                                        <input
                                            type="text"
                                            name="position"
                                            value={item.position}
                                            className="form_input"
                                            onChange={e => handleExperiencesChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Hospital*</p>
                                        <input
                                            type="text"
                                            name="hospital"
                                            value={item.hospital}
                                            className="form_input"
                                            onChange={e => handleExperiencesChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <button className='bg-red-700  p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'
                                    onClick={e => deleteExperiences(e, index)}
                                ><AiOutlineDelete /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addExperiences} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Experience</button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                    <div>
                                        <p className="form_label">Day*</p>
                                        <select
                                            name="day" value={item.day} className='form_input py-3.5'
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        >
                                            <option value="">Select</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sun">Sunday</option>
                                            <option value="mon">Monday</option>
                                            <option value="tue">Tuesday</option>
                                            <option value="wed">Wednesday</option>
                                            <option value="thu">Thursday</option>
                                            <option value="fri">Friday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="form_label">Starting Time*</p>
                                        <input
                                            type="time"
                                            name="startingTime"
                                            value={item.startingTime}
                                            className="form_input"
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Time*</p>
                                        <input
                                            type="time"
                                            name="endingTime"
                                            value={item.endingTime}
                                            className="form_input"
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div className='flex items-center'
                                        onClick={e => deleteTimeSlot(e, index)}
                                    >
                                        <button className='bg-red-700  p-2 rounded-full text-white text-[18px] mt-6 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                    <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add TimeSlot</button>
                </div>
                <div className="mb-5">
                    <p className='form_label'>About*</p>
                    <textarea name="about" rows={5} value={formData.about} onChange={handleInputChange} placeholder='Write about yourself' className='form_input'></textarea>
                </div>
                <div className='mb-5 flex items-center gap-3'>
                    {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor p-1 flex items-center justify-center'>
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
                    <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>Update Profile</button>
                </div>
            </form>
        </div>
    )
}
