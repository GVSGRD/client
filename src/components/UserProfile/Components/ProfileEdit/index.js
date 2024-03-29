import React, { useState } from 'react'
import './profileEdit.css'
import TextInput from '../../../CommonComponents/TextInput'
import SelectInputType from '../../../CommonComponents/SelectInput'
import ButtonComp from '../../../../Utils/Components/ButtonComp';
import DateSelector from '../../../CommonComponents/DateSelector';
import userRoles from '../../../../Utils/DataJson/userRoles';
import collegeDegrees from '../../../../Utils/DataJson/collegeDegrees';
import NumberInput from '../../../CommonComponents/NumberInput';
import dayjs from 'dayjs';
import Axios from '../../../../Api';
function ProfileEdit() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [role, setRole] = useState("")
  const [bio, setBio] = useState("")
  const [personalWebsite, setPersonalWebsite] = useState("")
  const [linkedInProfile, setLinkedInProfile] = useState("")
  const [githubProfile, setGithubProfile] = useState("")
  const [mobileNo,setMobileNo] = useState("")
  const [profilePicURL,setProfilePicURL] = useState("")
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])

  const handleFirstNameChange = (index, name, value) => { setFirstName(value) }
  const handleLastNameChange = (index, name, value) => { setLastName(value) }
  const handleEmailChange = (index, name, value) => { setEmail(value) }
  const handleBioChange = (index, name, value) => { setBio(value) }
  const handlePersonalWebsiteChange = (index, name, value) => { setPersonalWebsite(value) }
  const handleLinkedInProfileChange = (index, name, value) => { setLinkedInProfile(value) }
  const handleGithubProfileChange = (index, name, value) => { setGithubProfile(value) }
  const handleRoleChange = (index, name, value) => { setRole(value) }
  const handleMobileNoChange = (index, name, value) => { setMobileNo(value) }
  const handleProfilePicURLChange = (index,name,value) => {setProfilePicURL(value)}


  const getUserData = async () => {
    try {
      Axios.get('/user/203')
        .then(response => {
        //  setUserData(response.data);
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
          setRole(response.data.designation)
          setBio(response.data.bio)
          setProfilePicURL(response.data.profileImageUrl)
          setGithubProfile(response.data.github)
          setLinkedInProfile(response.data.linkedin)

        })
    } catch (error) {
      console.error(error);
    }
  }

  const getUserExperience = async () => {
    try {
      Axios.get('http://localhost:8081/experience/user/203')
        .then(response => {
          setExperiences(response.data);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getUserEducation = async () => {
    try {
      Axios.get('http://localhost:8081/education/user/203')
        .then(response => {
          setEducation(response.data);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getUserSkills = async () => {
    try {
      Axios.get('http://localhost:8081/skill/user/203')
        .then(response => {
        //  setSkillsData(response.data);
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
    getUserExperience()
    getUserEducation()
    getUserSkills()
  }, []);

  const handleExperienceChange = (index, name, value) => {
    let currentExperiences = [...experiences]
    currentExperiences[index] = {
      ...currentExperiences[index],
      [name]:value
    }
    setExperiences(currentExperiences)
  }

  const handleEducationChange = (index, name, value) => {
    let currentEducation = [...education]
    currentEducation[index]= {
      ...currentEducation[index],
    [name]:value
    }
    setEducation(currentEducation)
  }

  const addNewEducation = () => {
    let currentEducation = [...education]
    currentEducation.push({
      college: "",
      degree: "",
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date())
    })
    setEducation(currentEducation)
  }

  const removeEducation = (index) => {
    let currentEducation = [...education]
    currentEducation.splice(index, 1)
    setEducation(currentEducation)
  }

  const addNewExperience = () => {
    let currentExperience = [...experiences]
    currentExperience.push({
      role: "",
      company: "",
      description: ""
    })
    setExperiences(currentExperience)
  }

  const removeExperience = (index) => {
    let currentExperience = [...experiences]
    currentExperience.splice(index, 1)
    setExperiences(currentExperience)
  }

  const updateProfileData = async () =>{
    try {
      const response = await Axios.get(
        `/updateUserProfile`,{
          firstName,lastName,role,bio,personalWebsite,linkedInProfile,
          githubProfile,mobileNo,profilePicURL,experiences,
          setEducation
        }
      );
      if (response.data.success) {
        console.log("data has been set")
      } 
    } catch (err) {
      console.log("error while updating data")
    }
  }
  return (
    <div className="profileEdit-container border-ef br-10px pl-30 pt-30 pr-30 pb-30 mt-30 mb-30">

      <div >
        <div className="profileEdit-question-section-container">
          <div className="profileEdit-left-inner-container pr-20">
            <p className="font_16_600">About</p>
            <p className="font_14_400 mt-10">Tell us about yourself so that students and startups know who you are </p>
          </div>

          <div className="profileEdit-right-inner-container">

            <div>
              <p className="font_14_600">First Name</p>
              <div className="mt-10">
                <TextInput
                  value={firstName}
                  handleInputChange={handleFirstNameChange}
                />
              </div>
            </div>

            <div className="mt-30">
              <p className="font_14_600">Last Name</p>
              <div className="mt-10">
                <TextInput
                  value={lastName}
                  handleInputChange={handleLastNameChange}
                />
              </div>
            </div>

            <div className="mt-30">
              <p className="font_14_600">Mobile Number</p>
              <div className="mt-10">
                
                <NumberInput
                  value={mobileNo}
                  handleInputChange={handleMobileNoChange}
                />
              </div>
            </div>

            <div className="mt-30">
              <p className="font_14_600">Email</p>
              <div className="mt-10">
                <TextInput
                  value={email}
                  handleInputChange={handleEmailChange}
                />
              </div>
            </div>


            <div className="mt-30">
              <p className="font_14_600">Profile Picture URL</p>
              <div className="mt-10">
                <TextInput
                  value={profilePicURL}
                  handleInputChange={handleProfilePicURLChange}
                />
              </div>
            </div>

            <div className="mt-30">
              <p className="font_14_600">Select your role</p>

              <div className="mt-10">
                <SelectInputType
                  value={role}
                  options={userRoles}
                  handleInputChange={handleRoleChange}
                />
              </div>
            </div>

            <div className="mt-30">
              <p className="font_14_600">Bio</p>

              <div className="mt-10">
                <textarea
                  onChange={(event) => {
                    handleBioChange(event.target.value)
                  }}
                  className="profileEdit-textarea"
                  rows="4" cols="10">

                </textarea>
              </div>
            </div>
          </div>

        </div>


        <hr className="mt-30" />

        <div className="d-flex w-100 mt-20">
          <div className="profileEdit-left-inner-container">
            <p className="font_14_600">Social Profiles</p>
          </div>


          <div className="profileEdit-right-inner-container">

            <div>
              <p className="font_14_600">Website </p>

              <div className="mt-10">
                <TextInput
                  value={personalWebsite}
                  handleInputChange={handlePersonalWebsiteChange}
                />
              </div>
            </div>

            <div className="mt-20">
              <p className="font_14_600">LinkedIn </p>

              <div className="mt-10">
                <TextInput
                  value={linkedInProfile}
                  handleInputChange={handleLinkedInProfileChange}
                />
              </div>
            </div>


            <div className="mt-20">
              <p className="font_14_600">Github</p>

              <div className="mt-10">
                <TextInput
                  value={githubProfile}
                  handleInputChange={handleGithubProfileChange}
                />
              </div>
            </div>

          </div>

        </div>

        <hr className="mt-30" />

        <div className="d-flex w-100 mt-20">
          <div className="profileEdit-left-inner-container">
            <p className="font_14_600">Experience</p>
          </div>

          <div className="profileEdit-right-inner-container">

            <div>
              {experiences.map((currentExperience, index) => {
                return (
                  <div
                    key={index}
                    className="mt-30">

                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="font_14_600">Role</p>

                        <div onClick={() => {
                          removeExperience(index)
                        }}>
                          <ButtonComp
                            color={3} >
                            Remove
                          </ButtonComp>
                        </div>
                      </div>

                      <div className="mt-10">
                        <TextInput
                          value={experiences[index].designation}
                          handleInputChange={handleExperienceChange}
                          name={"designation"}
                          index={index}
                        />
                      </div>
                    </div>

                    <div className="mt-10">
                      <p className="font_14_600">Company Name</p>

                      <div className="mt-10">
                        <TextInput
                          value={currentExperience.company}
                          handleInputChange={handleExperienceChange}
                          name={"company"}
                          index={index}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-20">
                      <div>
                        <p className="font_14_600">Start Date</p>
                        <div>
                          <DateSelector
                          value={currentExperience.fromDate}
                          handleInputChange={handleEducationChange}
                          name="fromDate"
                          index={index}
                          />
                        </div>
                      </div>


                      <div>
                        <p className="font_14_600">End Date</p>
                        <div>
                          <DateSelector
                          value={currentExperience.toDate}
                          handleInputChange={handleEducationChange}
                          name="toDate"
                          index={index}
                          />
                        </div>
                      </div>

                    </div>

                    <div className="mt-10">
                      <p className="font_14_600">Company Logo</p>

                      <div className="mt-10">
                        <TextInput
                          value={currentExperience.companyLogo}
                          handleInputChange={handleExperienceChange}
                          name={"companyLogo"}
                          index={index}
                        />
                      </div>
                    </div>

                    <div className="mt-10">
                      <p className="font_14_600">Description</p>

                      <div className="mt-10">
                        <textarea
                        value={currentExperience.description}
                        className="profileEdit-textarea"
                          onChange={event => {
                            handleExperienceChange(index, "description", event.target.value)
                          }}
                          rows="4" cols="40"></textarea>
                      </div>
                    </div>


                  </div>
                )
              })}
            </div>

            <p className="link-color pointer-arrow mt-20" onClick={addNewExperience}>+ add new Experience</p>

          </div>
        </div>



        <hr className="mt-30" />


        <div className="d-flex w-100 mt-20">
          <div className="profileEdit-left-inner-container">
            <p className="font_14_600">Education</p>
          </div>

          <div className="profileEdit-right-inner-container">

            <div>
              {education.map((currentEducation, index) => {
                return (
                  <div
                    key={index}
                    className="mt-50">

                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="font_14_600">College</p>

                        <div onClick={() => {
                          removeEducation(index)
                        }}>
                          <ButtonComp
                            color={3}>
                            Remove
                          </ButtonComp>
                        </div>
                      </div>

                      <div className="mt-10">
                        <TextInput
                          value={currentEducation.universityName}
                          handleInputChange={handleEducationChange}
                          name={"universityName"}
                          index={index}
                        />
                      </div>
                    </div>

                    <div className="mt-10">
                      <p className="font_14_600">Degree</p>

                      <div className="mt-10">
                        <SelectInputType 
                        value={currentEducation.degree}
                        name={"degree"}
                        options={collegeDegrees}
                        handleInputChange={handleEducationChange}
                        index={index}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-20">
                      <div>
                        <p className="font_14_600">Start Date</p>
                        <div>
                          <DateSelector
                          value={currentEducation.fromDate}
                          handleInputChange={handleEducationChange}
                          name="fromDate"
                          index={index}
                          />
                        </div>
                      </div>


                      <div>
                        <p className="font_14_600">End Date</p>
                        <div>
                          <DateSelector
                          value={currentEducation.toDate}
                          handleInputChange={handleEducationChange}
                          name="toDate"
                          index={index}
                          />
                        </div>
                      </div>

                    </div>

                    <div className="mt-10">
                      <p className="font_14_600">College Logo</p>

                      <div className="mt-10">
                        <TextInput
                          value={currentEducation.universityLogo}
                          handleInputChange={handleExperienceChange}
                          name={"universityLogo"}
                          index={index}
                        />
                      </div>
                    </div>


                  </div>
                )
              })}
            </div>

            <p className="link-color pointer-arrow mt-20" onClick={addNewEducation}>+ add new Education</p>

          </div>
        </div>

        <div className="d-flex justify-content-end mt-20">
              <ButtonComp 
              color={1}
              size={3}
              className="pl-40 pr-40"
              onClick={() =>{
                updateProfileData()
              }}
              >
                Save
              </ButtonComp>
        </div>

      </div>

    </div>
  )
}

export default ProfileEdit