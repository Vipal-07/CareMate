import { useEffect, useState } from 'react'
import DoctorCard from '../../Doctor/DoctorCard'
import Testimonial from '../../Testimonial/Testimonial'
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";

export default function Doctors() {
  const [query, setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState("")
  // build URL so useFetchData re-fetches when debounceQuery changes
  const searchUrl = `${BASE_URL}/doctors${debounceQuery ? `?query=${encodeURIComponent(debounceQuery)}` : ''}`;
  const { data: doctors, loading, error } = useFetchData(searchUrl);

  const handleSearch = () => {
    // Trim the current input and apply it immediately so the server is queried
    const trimmed = (query || '').trim();
    setQuery(trimmed);
    setDebounceQuery(trimmed);
  }
  useEffect(()=>{

    const timeout = setTimeout(()=>{
      setDebounceQuery(query)}
      ,700)

      return () => clearTimeout(timeout)
  },[query])

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specification"
              value={query}
              onChange={e=> setQuery(e.target.value || '')}
            />
            <button onClick={handleSearch} className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error />}
          {!loading && !error && (
            (() => {
              const list = Array.isArray(doctors) ? doctors : [];
              const q = (debounceQuery || '').toLowerCase().trim();
              // apply client-side fallback filtering so UI works even if server returns unfiltered results
              const filtered = q
                ? list.filter((d) => {
                    const name = (d.name || d.fullName || '').toLowerCase();
                    const spec = (d.specialization || d.speciality || d.special || '').toLowerCase();
                    return name.includes(q) || spec.includes(q);
                  })
                : list;

              if (filtered.length === 0) {
                return (
                  <div className="py-8">
                    <p className="text-center text-textColor">No doctors found matching "{debounceQuery}"</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filtered.map((doctor) => (
                    <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              What Our Patients Say
            </h2>
            <p className='text_para text-center'>
              Hear from our satisfied patients about their experiences at our clinic and the quality of care they received.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  )
}

