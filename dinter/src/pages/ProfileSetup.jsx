import React, { useState,useEffect} from 'react';
import './style/ProfileSetup.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const ProfileSetup = () => {
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'interests') {
      const selectedInterests = [...interests];
      if (event.target.checked) {
        selectedInterests.push(value);
      } else {
        const index = selectedInterests.indexOf(value);
        if (index !== -1) {
          selectedInterests.splice(index, 1);
        }
      }
      setInterests(selectedInterests);
    } else {
      switch (name) {
        case 'avatar':
          setAvatar(value);
          break;
        case 'dob':
          setDob(value);
          break;
        case 'gender':
          setGender(value);
          break;
        case 'bio':
          setBio(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or validation here
    console.log({
      avatar,
      dob,
      gender,
      interests,
      bio,
    });
  };
  
  return (
    <div  className="profile-setup" style={{background: `url("https://media.dolenglish.vn/PUBLIC/MEDIA/a1633f21-a888-489a-bf5b-dae982f515cc.jpg")`}}>
     <div style={{textAlign: "center"}}  className='header-logo poin pointer'>
                    <img src='images/common/dinter-logo.png' alt='logo' width={"50px"}/>
                    <strong style={{marginLeft: "5px"}}>DINTER</strong>
                </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar"><h5>Avatar:</h5></label>
          {/* <SunEditor
    id="avatar"
    name="avatar"
    defaultValue={avatar}
    onChange={content => setAvatar(content)}
    setOptions={{
      buttonList: [
        ['image'], // Thêm nút image và video để tải ảnh và video
       
        // Các tùy chọn khác theo ý của bạn
      ],
    }}
  /> */}
  <div className="avatar-input"
        style={{ border: "1px solid yellowgreen",borderRadius : "100%",width: "300px",height: "300px",marginLeft:"30%"}}
      >
        <input type="file" onChange={handlePreviewAvatar} />

        {avatar && (
          <img
            style={{ borderRadius : "100%",textAlign: "center",width: "300px",height: "300px"}}
            src={avatar.preview}
            alt=""
            width="100%"
          />
        )}
      </div>
        </div>
        <div className="form-group">
  <label htmlFor="dob"><h5>Date of Birth:</h5></label>
  <DatePicker
    id="dob"
    name="dob"
    selected={dob}
    onChange={(date) => setDob(date)}
    dateFormat="dd/MM/yyyy"
    placeholderText="Select date"
  />
</div>
        <div className="form-group">
          <label htmlFor="gender"><h5>Gender:</h5></label>
          <select id="gender" name="gender" value={gender} onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">LGBT</option>
          </select>
        </div>
        <div className="form-group">
  <label><h5>Interests:</h5></label>
  <div className="interests-container">
    <div>
      <label>
        <input type="checkbox" name="interests" value="reading" onChange={handleInputChange} /> Reading
      </label> 
    </div>
    <div>
      <label>
        <input type="checkbox" name="interests" value="music" onChange={handleInputChange} /> Music
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" name="interests" value="sports" onChange={handleInputChange} /> Sports
      </label>
    </div>
    <div> 
      <label>
        <input type="checkbox" name="interests" value="new-interest" onChange={handleInputChange} /> Animal
      </label>
    </div>
    <div> 
      <label>
        <input type="checkbox" name="interests" value="new-interest" onChange={handleInputChange} /> Tourism
      </label>
    </div>
    <div> 
      <label>
        <input type="checkbox" name="interests" value="new-interest" onChange={handleInputChange} /> Sleep
      </label>
    </div>
    <div> 
      <label>
        <input type="checkbox" name="interests" value="new-interest" onChange={handleInputChange} /> Beautify
      </label>
    </div>
    <div> 
      <label>
        <input type="checkbox" name="interests" value="new-interest" onChange={handleInputChange} /> Fashion
      </label>
    </div>
  </div>
</div>
        <div className="form-group">
          <label htmlFor="bio"><h5>Bio:</h5></label>
          <textarea id="bio" name="bio" value={bio} onChange={handleInputChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileSetup;